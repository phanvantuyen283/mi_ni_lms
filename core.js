/* core.js - BỘ NÃO XỬ LÝ TRUNG TÂM (Đã nâng cấp) */

// --- 1. CHỐNG GIAN LẬN THỜI GIAN (ANTI-GAMING) ---
const THOI_DIEM_MO_DE = new Date().getTime(); // Ghi lại ngay khi file JS chạy
console.log("🕒 Bắt đầu tính giờ:", new Date(THOI_DIEM_MO_DE).toLocaleTimeString());

// --- 2. HIỂN THỊ THÔNG TIN HỌC SINH ---
const studentName = localStorage.getItem("hocSinhLop4A");
const displayEl = document.getElementById("student-display");
if(displayEl) displayEl.innerText = studentName ? studentName : "Khách (Chưa đăng nhập)";

// --- 3. ĐỒNG HỒ ĐẾM GIỜ ---
let seconds = 0;
setInterval(() => {
    seconds++;
    const t = document.getElementById("timer");
    if(t) {
        let m = Math.floor(seconds/60).toString().padStart(2,'0');
        let s = (seconds%60).toString().padStart(2,'0');
        t.innerText = `${m}:${s}`;
    }
}, 1000);

// --- 4. HÀM NỘP BÀI (GỌI TỪ NÚT BẤM HTML) ---
window.nopBai = async function() {
    if(!studentName) { alert("⚠️ Bạn chưa đăng nhập từ trang chủ!"); return; }

    const btn = document.getElementById("btn-nop");
    btn.disabled = true; 
    btn.innerText = "ĐANG CHẤM..."; 
    btn.style.opacity = "0.7";

    // a. Tính điểm
    let correct = 0;
    const allBlocks = document.querySelectorAll(".question-block");
    // Lọc bỏ các câu hỏi bảo mật (nếu có)
    const contentBlocks = Array.from(allBlocks).filter(b => !b.classList.contains('security-quest'));
    
    contentBlocks.forEach(b => {
        const sel = b.querySelector("input:checked");
        if (sel && sel.getAttribute("data-correct") === "true") correct++;
    });

    const diem = contentBlocks.length > 0 ? (correct / contentBlocks.length) * 10 : 0;
    const diemTron = Number(diem.toFixed(1));
    const tieuDe = document.getElementById("ten-bai-tap") ? document.getElementById("ten-bai-tap").innerText : "Bài tập không tên";

    // b. Gửi dữ liệu về Firebase
    const THOI_DIEM_NOP = new Date().getTime();
    try {
        if(db) {
            // Kiểm tra xem đã làm bài chưa (Nếu chế độ chỉ cho làm 1 lần)
            // (Code kiểm tra chặn làm lại có thể thêm ở đây nếu cần thiết)
            
            await db.collection("KET_QUA_TONG_HOP").add({
                hoc_sinh: studentName, 
                bai_tap: tieuDe, 
                diem: diemTron, 
                so_cau_dung: correct, 
                tong_so_cau: contentBlocks.length,
                thoi_gian_lam: seconds, // Số giây hiển thị đồng hồ
                ngay_nop: firebase.firestore.FieldValue.serverTimestamp(),
                
                // DỮ LIỆU CHỐNG GIAN LẬN
                bat_dau_luc: THOI_DIEM_MO_DE,
                ket_thuc_luc: THOI_DIEM_NOP,
                chi_tiet_ngay: new Date().toLocaleDateString('vi-VN')
            });
        }
    } catch(e) { 
    console.error("Lỗi gửi điểm:", e); 
    alert("LỖI CHI TIẾT:\n" + e.message); // Hiện rõ lỗi gì
}


    // c. Hiển thị Popup kết quả
    hienThiPopup(diemTron, correct, contentBlocks.length);
    
    // d. Hiệu ứng & Âm thanh
    if(diemTron >= 5 && typeof confetti !== 'undefined') confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    if ('speechSynthesis' in window) {
        let msg = new SpeechSynthesisUtterance(`Bạn ${studentName} được ${diemTron} điểm`);
        msg.lang = 'vi-VN'; 
        window.speechSynthesis.speak(msg);
    }
};

// --- 5. HÀM HIỂN THỊ POPUP ---
async function hienThiPopup(diem, dung, tong) {
    // Mặc định cho xem đáp án, trừ khi cấu hình cấm
    let allow = true;
    try {
        if(db) {
            const cfg = await db.collection("CAU_HINH").doc("trang_thai_mon").get();
            if(cfg.exists && cfg.data().xem_dap_an === false) allow = false;
        }
    } catch(e){}

    let btnHtml = allow 
        ? `<button class="btn-review" style="background:#f59e0b;" onclick="xemLaiBai()">🔍 XEM LẠI BÀI (Biết đúng/sai)</button>` 
        : `<button style="background:#94a3b8; cursor:not-allowed" disabled>🚫 Giáo viên đã ẩn đáp án</button>`;

    const div = document.createElement("div");
    div.id = "result-popup";
    div.className = "result-overlay"; 
    div.style.display = "flex"; // Hiện flex để căn giữa
    div.innerHTML = `
        <div class="result-box">
            <h3>KẾT QUẢ</h3>
            <div class="result-score">${diem.toFixed(1)}</div>
            <p>Đúng <strong>${dung}/${tong}</strong> câu</p>
            <div class="btn-group-result">
                ${btnHtml}
                <button class="btn-finish" style="background:#0284c7;" onclick="window.location.href='Menu.html'">🏠 VỀ MENU CHÍNH</button>
            </div>
        </div>`;
    document.body.appendChild(div);
}

// --- 6. HÀM XEM LẠI BÀI ---
window.xemLaiBai = function() {
    document.getElementById("result-popup").style.display = "none";
    const btnNop = document.getElementById("btn-nop");
    if(btnNop) btnNop.style.display = "none";

    document.querySelectorAll(".question-block").forEach(b => {
        const inputs = b.querySelectorAll("input");
        inputs.forEach(i => {
            i.disabled = true; // Khóa không cho chọn lại
            // Tô màu đáp án đúng
            if(i.getAttribute("data-correct") === "true") { 
                i.parentElement.classList.add("res-correct"); 
            }
            // Tô màu đáp án sai (nếu HS chọn)
            if(i.checked && i.getAttribute("data-correct") !== "true") {
                i.parentElement.classList.add("res-wrong");
            }
        });
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 7. TỰ ĐỘNG THÊM PHÁO HOA NẾU THIẾU ---
if (typeof confetti === 'undefined') {
    const s = document.createElement('script');
    s.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
    document.head.appendChild(s);
}
