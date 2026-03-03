/* ============================================================
   CORE.JS - TRÁI TIM HỆ THỐNG MINI LMS V4.0 (BẢN CHUẨN)
   Nhiệm vụ: Điều phối AI, Chấm điểm, Bảo mật
   ============================================================ */

// 1. CẤU HÌNH URL AI (Lấy từ ảnh triển khai Vswl/exec của thầy)
const URL_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbzh1wTR9MaiIVszkhoojknrBaV2rCMzpJ667B75kX72YsSwgNDVtVPOiOz0drjzVswl/exec";

let db = null; 
let studentName = localStorage.getItem("hocSinhLop4A") || "Khách";
let isSubmitted = false;

// --- 2. KẾT NỐI FIREBASE ---
try {
    if (typeof CONFIG !== 'undefined' && typeof firebase !== 'undefined') {
        if (!firebase.apps.length) firebase.initializeApp(CONFIG.firebase);
        db = firebase.firestore();
        console.log("✅ Core V4: Hệ thống Database đã sẵn sàng.");
    }
} catch (e) { console.error("⚠️ Lỗi kết nối Firebase:", e); }

// --- 3. HIỂN THỊ THÔNG TIN KHI TẢI TRANG ---
document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("student-display");
    if (display) display.innerText = studentName;
    console.log("🚀 Hệ thống đã sẵn sàng cho học sinh: " + studentName);
});

// --- 4. KẾT NỐI GEMINI 2.0 FLASH-LITE (Xử lý Gợi ý AI) ---
async function goiAI(index, loaiHanhDong) {
    const vungPhanHoi = document.getElementById(`phan-hoi-ai-${index}`);
    vungPhanHoi.innerHTML = "<span style='color:#64748b'>🔄 Trợ lý Gemini đang suy nghĩ...</span>";
    vungPhanHoi.style.display = "block";

    // Lấy nội dung câu hỏi và bài làm
    const cauHoi = document.querySelector(`#cau-hoi-${index} .noi-dung`).innerText;
    const radioChecked = document.querySelector(`input[name="q${index}"]:checked`);
    const baiLam = radioChecked ? "Đáp án chọn: " + radioChecked.value : "Chưa chọn đáp án";

    const payload = {
        action: loaiHanhDong,
        question: cauHoi,
        studentAnswer: baiLam
    };

    try {
        const response = await fetch(URL_APPS_SCRIPT, {
            method: "POST",
            body: JSON.stringify(payload)
        });
        
        const result = await response.json();
        
        // Trích xuất văn bản từ cấu trúc phản hồi của Gemini
        if (result.candidates && result.candidates[0].content.parts[0].text) {
            const textResponse = result.candidates[0].content.parts[0].text;
            vungPhanHoi.innerHTML = `💡 <b>Gợi ý sư phạm:</b><br>${textResponse}`;
            vungPhanHoi.style.background = "#f0fdf4";
            vungPhanHoi.style.borderLeft = "4px solid #22c55e";
        } else {
            vungPhanHoi.innerHTML = "⚠️ AI trả về dữ liệu trống. Thầy hãy kiểm tra API Key.";
        }
    } catch (error) {
        vungPhanHoi.innerHTML = "⚠️ Trợ lý đang bận. Con hãy thử lại sau nhé!";
        console.error("Lỗi gọi AI:", error);
    }
}

// --- 5. HÀM NỘP BÀI ĐƠN GIẢN ---
window.nopBai = function() {
    if (isSubmitted) return;
    if (!confirm("Con chắc chắn muốn nộp bài chứ?")) return;

    isSubmitted = true;
    alert("Chúc mừng con đã hoàn thành bài tập!");
    window.location.href = "Menu.html";
};
