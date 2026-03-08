/* ============================================================
   CORE.JS - BỘ NÃO ĐIỀU PHỐI TRUNG TÂM (PHIÊN BẢN V6.1 - STABLE)
   Cập nhật: Tự động làm sạch rác dữ liệu & Đồng bộ hiển thị điểm
   ============================================================ */

const CoreSystem = {
    // 1. PHÒNG XÁC THỰC (ĐĂNG NHẬP)
    async login(studentId, securityAnswer) {
        const db = firebase.firestore();
        
        if (studentId === "GV01") {
            if (securityAnswer === "123456") { 
                sessionStorage.setItem("LMS_User", "Giáo Viên Test");
                return { success: true, name: "Giáo Viên Test", role: "admin" };
            }
            return { success: false, msg: "Sai mật khẩu kiểm thử!" };
        }

        try {
            const doc = await db.collection("DANH_SACH_LOP").doc(studentId).get();
            if (!doc.exists) return { success: false, msg: "Không tìm thấy mã học sinh!" };
            
            const studentData = doc.data();
            if (studentData.secret_a === securityAnswer) {
                sessionStorage.setItem("LMS_User", studentData.name);
                return { success: true, name: studentData.name, role: "student" };
            }
            return { success: false, msg: "Câu trả lời bảo mật không chính xác!" };
        } catch (error) {
            return { success: false, msg: "Lỗi kết nối CSDL: " + error.message };
        }
    },

    // 2. PHÒNG TRỢ GIẢNG AI (XIN GỢI Ý)
    async getAIHint(subject, question, currentAnswer) {
        try {
            const payload = { 
                action: "GET_AI_HINT", 
                subject: subject, 
                question: question, 
                current_text: currentAnswer 
            };
            const response = await fetch(GLOBAL_CONFIG.WEB_API_URL, { 
                method: 'POST', 
                body: JSON.stringify(payload) 
            });
            const result = await response.json();
            return result.status === "success" ? result.hint : "❌ Lỗi máy chủ AI.";
        } catch (error) {
            return "❌ Mạng chậm, em hãy tự suy nghĩ một chút nhé.";
        }
    },

    // 3. PHÒNG XỬ LÝ NỘP BÀI (GHI ĐÈ HOÀN TOÀN)
    async submitExam(payload) {
        const studentName = sessionStorage.getItem("LMS_User");
        if (!studentName) throw new Error("Hết phiên làm việc, vui lòng đăng nhập lại!");

        try {
            // A. TỰ ĐỘNG CHẤM ĐIỂM HỆ THỐNG (SYSTEM)
            let score_sys = 0;
            let total_sys_max = 0;
            const systemResults = {};
            
            if (typeof EXAM_STRUCTURE !== 'undefined') {
                EXAM_STRUCTURE.forEach(q => {
                    if (q.type === "system") {
                        total_sys_max += (q.max_score || 0);
                        let studentAns = (payload.answers.system[q.id] || "").toString().trim();
                        let correctAns = (q.answer || "").toString().trim();
                        
                        let isCorrect = (studentAns.toLowerCase() === correctAns.toLowerCase());
                        if (isCorrect) score_sys += (q.max_score || 0);
                        systemResults[q.id] = { answer: studentAns, isCorrect: isCorrect };
                    }
                });
            }

            // B. GỬI DỮ LIỆU QUA GOOGLE APPS SCRIPT (XỬ LÝ ẢNH & AI CHẤM)
            const apiPayload = {
                action: "SUBMIT_EXAM", 
                student_name: studentName,
                subject: payload.subject,
                ai_data: payload.answers.ai || {}, 
                multimedia_data: payload.answers.multimedia || {} 
            };
            
            const response = await fetch(GLOBAL_CONFIG.WEB_API_URL, { 
                method: 'POST', 
                body: JSON.stringify(apiPayload) 
            });
            const result = await response.json();
            if (result.status !== "success") throw new Error(result.message);

            // C. LƯU FIREBASE (DÙNG MERGE: FALSE ĐỂ LÀM SẠCH BÀI CŨ)
            const db = firebase.firestore();
            const docId = studentName + "_" + payload.subject; 

            const finalDoc = {
                student_name: studentName,
                subject: payload.subject,
                answers: { 
                    system: systemResults, 
                    ai: payload.answers.ai || {}, 
                    multimedia_keys: Object.keys(payload.answers.multimedia || {}) 
                },
                multimedia_urls: result.multimedia_urls || {}, 
                scores: { 
                    sys: Number(score_sys.toFixed(2)), 
                    sys_max: Number(total_sys_max.toFixed(2)), 
                    ai_draft: Number((result.ai_total_score || 0).toFixed(2)), 
                    teacher_final: null // Để null thay vì "" để tránh lỗi undefinedđ
                },
                feedback: { 
                    ai_details: result.ai_details || {}, 
                    teacher_final: "" 
                },
                status: "pending",
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            };

            await db.collection("KET_QUA").doc(docId).set(finalDoc, { merge: false });
            
            // Xóa cache bài làm cũ cục bộ sau khi nộp thành công
            localStorage.removeItem(`temp_answers_${payload.subject}`);
            
            return { success: true };
        } catch (error) {
            console.error("Lỗi nộp bài:", error);
            throw error; 
        }
    }
};
