/* ============================================================
   AI_CONFIG.JS - BỘ NÃO TÙY BIẾN CHO MINI LMS
   Nhiệm vụ: Định hình phong cách AI, Quản lý Prompt môn học
   ============================================================ */

const AI_SETTING = {
    // 1. CHỈNH SỬA URL TẠI ĐÂY (Khi thầy triển khai bản Apps Script mới)
    url: "https://script.google.com/macros/s/AKfycbwFAIB2YTOT_AzwXDpGqg68w2Jkd8_Ku5sbl_pyB3Bj6uImgmuew1m2RvTjMAZj6TGR/exec",
    
    // 2. PHONG CÁCH AI CHO TỪNG MÔN HỌC (Thầy có thể thêm môn tùy ý)
    subjects: {
        "Toán": {
            systemPrompt: "Bạn là giáo viên Toán lớp 4. Hãy gợi ý phương pháp giải toán (ví dụ: vẽ sơ đồ, tính giá trị một phần) nhưng KHÔNG được cho biết kết quả cuối cùng.",
            loadingText: "🔄 Trợ lý Toán học đang giải mã con số..."
        },
        "Tiếng Việt": {
            systemPrompt: "Bạn là giáo viên Tiếng Việt. Hãy gợi ý về dàn ý, từ vựng hoặc biện pháp nghệ thuật. Khuyến khích học sinh tự suy nghĩ.",
            loadingText: "🔄 Trợ lý Tiếng Việt đang tìm từ ngữ hay..."
        },
        "Lịch sử": {
            systemPrompt: "Bạn là nhà sử học kể chuyện. Hãy nhắc lại mốc thời gian hoặc ý nghĩa sự kiện để học sinh nhớ bài.",
            loadingText: "🔄 Trợ lý Lịch sử đang lần lại dòng thời gian..."
        }
    },

    // 3. CÀI ĐẶT HIỂN THỊ
    tag: " [Hệ thống Groq 3.3 - Đã Thông Suốt]"
};

/**
 * HÀM GỌI AI THÔNG MINH (Dùng cho mọi bài tập)
 * @param {number} index - Số thứ tự câu hỏi
 * @param {string} monHoc - Tên môn (Toán, Tiếng Việt...)
 */
async function goiY_AI_V4(index, monHoc = "Toán") {
    const config = AI_SETTING.subjects[monHoc] || AI_SETTING.subjects["Toán"];
    const displayBox = document.getElementById(`phan-hoi-ai-${index}`);
    
    // Hiển thị trạng thái đang nghĩ (theo môn học)
    displayBox.innerHTML = `<span style='color:#64748b'>${config.loadingText}</span>`;
    displayBox.style.display = "block";

    // Lấy dữ liệu bài tập (Giữ nguyên cấu trúc của core.js để tương thích)
    const cauHoi = document.querySelector(`#cau-hoi-${index} .noi-dung`).innerText;
    const radioChecked = document.querySelector(`input[name="q${index}"]:checked`);
    const baiLam = radioChecked ? "Đáp án con đang chọn: " + radioChecked.value : "Con chưa chọn đáp án";

    const payload = {
        action: "goi_y",
        question: cauHoi,
        studentAnswer: baiLam,
        systemInstruction: config.systemPrompt // Gửi thêm chỉ dẫn chuyên sâu cho AI
    };

    try {
        const response = await fetch(AI_SETTING.url, {
            method: "POST",
            body: JSON.stringify(payload)
        });
        
        const result = await response.json();
        
        if (result.candidates && result.candidates[0].content.parts[0].text) {
            const textResponse = result.candidates[0].content.parts[0].text;
            displayBox.innerHTML = `💡 <b>Gợi ý từ Trợ lý ${monHoc}:</b><br>${textResponse}${AI_SETTING.tag}`;
            displayBox.style.background = "#f0fdf4";
            displayBox.style.borderLeft = "4px solid #22c55e";
        } else {
            displayBox.innerHTML = "⚠️ AI đang bận soạn bài. Con thử lại sau nhé!";
        }
    } catch (error) {
        displayBox.innerHTML = "❌ Lỗi kết nối AI. Thầy hãy kiểm tra Web App URL.";
        console.error("Lỗi:", error);
    }
}
