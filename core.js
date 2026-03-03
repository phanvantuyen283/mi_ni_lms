/* ============================================================
   CORE.JS - TRÁI TIM HỆ THỐNG MINI LMS V4.0 (BẢN CHUẨN 2026)
   Nhiệm vụ: Điều phối AI, Chấm điểm, Đếm giờ, Bảo mật, Chặn làm lại
   ============================================================ */

// --- 1. CẤU HÌNH BIẾN TOÀN CỤC ---
let db = null; 
let studentName = localStorage.getItem("hocSinhLop4A") || "Khách";
let timerInterval;
let isSubmitted = false;
let totalSeconds = 0;
let securityCorrectAnswer = null;

// URL Web App kết nối Gemini 2.0 Flash-Lite (Tài khoản 2TB)
const URL_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbwCjihLUyII_kTCkbIlbiQAUb8qDo6UUQbooJb2vn01-VvPuZgqunPyyy_ZpUO9Eqs_/exec"; 

// --- 2. KẾT NỐI FIREBASE AN TOÀN ---
try {
    if (typeof CONFIG !== 'undefined' && typeof firebase !== 'undefined') {
        if (!firebase.apps.length) {
            firebase.initializeApp(CONFIG.firebase);
        }
        db = firebase.firestore();
        console.log("✅ Core V4: Hệ thống Database đã sẵn sàng.");
    }
} catch (e) {
    console.error("⚠️ Lỗi kết nối Firebase:", e);
}

// --- 3. LOGIC KHI TRANG TẢI XONG ---
document.addEventListener("DOMContentLoaded", async () => {
    // 3.1. Hiển thị tên học sinh lên giao diện
    const display = document.getElementById("student-display");
    if (display) display.innerText = studentName;

    const titleElement = document.getElementById("ten-bai-tap");
    const currentFileName = window.location.pathname.split('/').pop();
    const title = titleElement ? titleElement.innerText : currentFileName;

    if (db && studentName !== "Khách") {
        try {
            // 3.2. Kiểm tra chế độ Chặn làm lại bài
            const configDoc = await db.collection("CAU_HINH").doc("cau_hinh_chung").get();
            const allowRetake = configDoc.exists ? configDoc.data().cho_phep_lam_lai : true;

            if (allowRetake === false) {
                const checkSnap = await db.collection("KET_QUA_TONG_HOP")
                    .where("hoc_sinh", "==", studentName)
                    .where("bai_tap", "==", title)
                    .limit(1).get();

                if (!checkSnap.empty) {
                    alert(`⛔ THÔNG BÁO: Con đã nộp bài "${title}" rồi. Không thể làm lại!`);
                    window.location.href = "Menu.html";
                    return;
                }
            }

            // 3.3. Đồng bộ Trạm điều phối (Ẩn/Hiện nút Gợi ý AI)
            const dieuPhoiDoc = await db.collection("DIEU_PHOI_BAI_TAP").doc(currentFileName).get();
            if (dieuPhoiDoc.exists) {
                const cauHinhAI = dieuPhoiDoc.data().cau_hinh;
                Object.keys(cauHinhAI).forEach(id => {
                    const btnHint = document.querySelector(`#cau-hoi-${id} .btn-ai-hint`);
                    if (btnHint && cauHinhAI[id].allowHint === false) {
                        btnHint.style.display = "none"; // Ẩn nút nếu thầy không cho phép
                    }
                });
            }
        } catch (e) { console.log("Lỗi đồng bộ cấu hình:", e); }
    }

    await loadSecurityQuestion();
    startTimer();
});

// --- 4. CÂU HỎI BẢO MẬT ---
async function loadSecurityQuestion() {
    const container = document.querySelector(".security-quest");
    if (!container || !db) return;
    try {
        const doc = await db.collection("BAO_MAT").doc("cau_hoi_ngay").get();
        if (doc.exists && doc.data().question) {
            securityCorrectAnswer = doc.data().answer.trim().toLowerCase();
            container.innerHTML = `
                <div class="question-text" style="color:#be123c">🔒 <b>XÁC MINH LỚP 4A:</b> ${doc.data().question}</div>
                <input type="text" id="sec-answer-input" placeholder="Nhập câu trả lời..." class="security-input" style="width:100%; padding:10px; margin-top:10px; border-radius:8px; border:1px solid #fda4af;">
            `;
            container.style.display = "block";
        }
    } catch (e) { container.style.display = "none"; }
}

// --- 5. ĐỒNG HỒ TÍNH GIỜ ---
function startTimer() {
    timerInterval = setInterval(() => {
        totalSeconds++;
        const timerEl = document.getElementById("timer");
        if(timerEl) {
            const min = Math.floor(totalSeconds / 60);
            const sec = totalSeconds % 60;
            timerEl.innerText = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

// --- 6. HÀM NỘP BÀI & CHẤM ĐIỂM ---
window.nopBai = async function() {
    if (isSubmitted) return;

    if (securityCorrectAnswer) {
        const userAns = document.getElementById("sec-answer-input").value.trim().toLowerCase();
        if (userAns !== securityCorrectAnswer) {
            alert("⛔ Sai câu hỏi bảo mật! Con không thể nộp bài.");
            return;
        }
    }

    if (!confirm("Con chắc chắn muốn nộp bài chứ?")) return;

    isSubmitted = true;
    clearInterval(timerInterval);
    
    // Logic chấm trắc nghiệm
    let correctCount = 0;
    const blocks = document.querySelectorAll(".question-block:not(.security-quest)");
    blocks.forEach(block => {
        const checked = block.querySelector("input:checked");
        if (checked && checked.getAttribute("data-correct") === "true") correctCount++;
    });

    const score = blocks.length === 0 ? 0 : Number(((correctCount / blocks.length) * 10).toFixed(1));
    const title = document.getElementById("ten-bai-tap")?.innerText || "Bài Tập";

    if (db) {
        await db.collection("KET_QUA_TONG_HOP").add({
            hoc_sinh: studentName,
            bai_tap: title,
            diem: score,
            thoi_gian_lam: totalSeconds,
            ngay_nop: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    hienThiPopup(score, correctCount, blocks.length);
    if (score >= 5 && typeof confetti !== 'undefined') confetti();
};

// --- 7. GIAO DIỆN PHẢN HỒI AI & KẾT QUẢ ---
function hienThiPopup(diem, dung, tong) {
    const div = document.createElement("div");
    div.className = "result-overlay";
    div.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999; display:flex; justify-content:center; align-items:center;";
    div.innerHTML = `
        <div style="background:white; padding:30px; border-radius:20px; text-align:center; max-width:400px; width:90%;">
            <h2 style="color:#0284c7">KẾT QUẢ: ${diem}/10</h2>
            <p>Con đã đúng ${dung}/${tong} câu hỏi.</p>
            <button onclick="window.location.href='Menu.html'" style="padding:10px 20px; background:#0284c7; color:white; border:none; border-radius:8px; cursor:pointer;">Quay về Menu</button>
        </div>
    `;
    document.body.appendChild(div);
}

// --- 8. KẾT NỐI GEMINI 2.0 FLASH-LITE (AI LOGIC) ---
async function goiAI(index, loaiHanhDong) {
    const vungPhanHoi = document.getElementById(`phan-hoi-ai-${index}`);
    vungPhanHoi.innerHTML = "<span style='color:#64748b'>🔄 Trợ lý Gemini đang suy nghĩ...</span>";
    vungPhanHoi.style.display = "block";

    // Lấy nội dung câu hỏi
    const cauHoi = document.querySelector(`#cau-hoi-${index} .noi-dung`).innerText;
    
    // Lấy bài làm (Hỗ trợ cả trắc nghiệm và tự luận)
    const radioChecked = document.querySelector(`input[name="q${index}"]:checked`);
    const baiLam = radioChecked ? "Đáp án chọn: " + radioChecked.value : (document.getElementById(`input-${index}`)?.value || "Chưa có câu trả lời");

    const payload = {
        action: loaiHanhDong,
        question: cauHoi,
        studentAnswer: baiLam,
        correctAnswer: typeof danhSachDapAn !== 'undefined' ? danhSachDapAn[index] : ""
    };

    try {
        const response = await fetch(URL_APPS_SCRIPT, {
            method: "POST",
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        const textResponse = result.candidates[0].content.parts[0].text;

        if (loaiHanhDong === "goi_y") {
            vungPhanHoi.innerHTML = `💡 <b>Gợi ý sư phạm:</b><br>${textResponse}`;
            vungPhanHoi.style.background = "#f0fdf4";
            vungPhanHoi.style.borderLeft = "4px solid #22c55e";
        } else {
            vungPhanHoi.innerHTML = `🤖 <b>AI Nhận xét:</b><br>${textResponse}`;
        }
    } catch (error) {
        vungPhanHoi.innerHTML = "⚠️ Trợ lý đang bận. Con hãy thử lại sau nhé!";
    }
}
