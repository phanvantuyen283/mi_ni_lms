/* ============================================================
   AI_CONFIG.JS - PHIÊN BẢN ĐỒNG BỘ HOÀN HẢO
   Nhiệm vụ: Cung cấp bộ não cho hàm goiAI() trong core.js
   ============================================================ */

const AI_SETTING = {
    // 1. URL Apps Script của thầy
    url: "https://script.google.com/macros/s/AKfycbwFAIB2YTOT_AzwXDpGqg68w2Jkd8_Ku5sbl_pyB3Bj6uImgmuew1m2RvTjMAZj6TGR/exec",
    
    // 2. Prompt chuyên biệt cho từng môn
    subjects: {
        "Tiếng Việt": "Bạn là giáo viên Tiếng Việt nhân hậu. Hãy gợi ý nhẹ nhàng cho học sinh lớp 4 về bài 'Bà Triệu'. Không cho đáp án trực tiếp.",
        "Toán": "Bạn là giáo viên Toán. Hãy gợi ý bước làm, không cho kết quả."
    }
};

// ĐÈ LÊN HÀM CŨ ĐỂ SỬ DỤNG HỆ THỐNG MỚI
async function goiAI(index, loaiHanhDong) {
    const vungPhanHoi = document.getElementById(`phan-hoi-ai-${index}`);
    
    // Hiệu ứng đang chờ
    vungPhanHoi.innerHTML = "<span style='color:#64748b'>🔄 Trợ lý AI đang đọc đề bài...</span>";
    vungPhanHoi.style.display = "block";
    vungPhanHoi.className = "ai-response-box box-goi-y"; // Áp dụng đúng CSS của thầy

    // Lấy nội dung câu hỏi từ lớp "noi-dung" mà thầy đã đặt
    const cauHoi = document.querySelector(`#cau-hoi-${index} .noi-dung`).innerText;

    try {
        const response = await fetch(AI_SETTING.url, {
            method: "POST",
            body: JSON.stringify({
                action: loaiHanhDong,
                question: cauHoi,
                subject: "Tiếng Việt" 
            })
        });
        
        const result = await response.json();
        
        if (result.candidates && result.candidates[0].content.parts[0].text) {
            const textResponse = result.candidates[0].content.parts[0].text;
            // Hiển thị kết quả với chữ "💡 Gợi ý AI" đúng phong cách của thầy
            vungPhanHoi.innerHTML = `💡 <b>Gợi ý AI:</b><br>${textResponse}`;
        } else {
            vungPhanHoi.innerHTML = "⚠️ AI đang bận. Con nhấn lại nhé!";
        }
    } catch (error) {
        vungPhanHoi.innerHTML = "❌ Lỗi kết nối. Thầy hãy kiểm tra Web App URL.";
        console.error("Lỗi gọi AI:", error);
    }
}
