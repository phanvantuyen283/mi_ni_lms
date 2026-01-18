/* core.js - PHIÊN BẢN CHẨN ĐOÁN LỖI (DEBUG) */

// 1. Cấu hình
const firebaseConfig = { apiKey: "AIzaSyA77lLi_JCLIdR535KEfg3S0_Ge2EorPMo", authDomain: "baikiemtracuoiki.firebaseapp.com", projectId: "baikiemtracuoiki", storageBucket: "baikiemtracuoiki.firebasestorage.app", messagingSenderId: "953819948776", appId: "1:953819948776:web:4e9a017a6c5fc10ed28b5d" };

// 2. Kết nối (Có kiểm tra kỹ)
let db;
if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    console.log("✅ Core: Đã tìm thấy Firebase");
} else {
    console.error("❌ Core: KHÔNG THẤY FIREBASE!");
}

// 3. Pháo hoa
if (typeof confetti === 'undefined') {
    const s = document.createElement('script'); s.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"; document.head.appendChild(s);
}

// 4. Các biến toàn cục
const THOI_DIEM_MO_DE = new Date().getTime();
const studentName = localStorage.getItem("hocSinhLop4A");
const display = document.getElementById("student-display");
if(display) display.innerText = studentName ? studentName : "Khách";

// 5. Đồng hồ
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

// --- 6. HÀM NỘP BÀI (CÓ BÁO LỖI) ---
window.nopBai = async function() {
    // A. KIỂM TRA KẾT NỐI TRƯỚC KHI CHẤM
    if (typeof firebase === 'undefined') {
        alert("⛔ LỖI NGHIÊM TRỌNG: Trình duyệt không tải được Thư viện Firebase!\n\nNguyên nhân: Thiếu 2 dòng script ở đầu file HTML hoặc mạng chặn.\nHãy kiểm tra lại phần <head> của file bài tập.");
        return;
    }
    if (!db) {
        alert("⛔ LỖI KẾT NỐI: Biến 'db' chưa được khởi tạo.\n\nHãy thử tải lại trang (F5) và nộp lại.");
        return;
    }
    if (!studentName) {
        alert("⚠️ Bạn chưa đăng nhập! Hãy quay lại trang chủ.");
        return;
    }

    const btn = document.getElementById("btn-nop");
    btn.disabled = true; btn.innerText = "ĐANG GỬI...";

    // B. CHẤM ĐIỂM
    let correct = 0;
    const allBlocks = document.querySelectorAll(".question-block");
    const contentBlocks = Array.from(allBlocks).filter(b => !b.classList.contains('security-quest'));
    contentBlocks.forEach(b => {
        const sel = b.querySelector("input:checked");
        if (sel && sel.getAttribute("data-correct") === "true") correct++;
    });
    const diem = contentBlocks.length > 0 ? (correct / contentBlocks.length) * 10 : 0;
    const diemTron = Number(diem.toFixed(1));
    
    // Lấy tiêu đề chuẩn (Sửa lỗi mất ID)
    const h2 = document.getElementById("ten-bai-tap");
    const tieuDe = h2 ? h2.innerText : "BÀI TẬP KHÔNG TÊN (Mất ID h2)";

    // C. GỬI ĐIỂM (CÓ BÁO LỖI CHI TIẾT)
    try {
        await db.collection("KET_QUA_TONG_HOP").add({
            hoc_sinh: studentName, 
            bai_tap: tieuDe, 
            diem: diemTron, 
            so_cau_dung: correct, 
            tong_so_cau: contentBlocks.length,
            thoi_gian_lam: seconds, 
            ngay_nop: firebase.firestore.FieldValue.serverTimestamp(),
            bat_dau_luc: THOI_DIEM_MO_DE,
            ket_thuc_luc: new Date().getTime(),
            chi_tiet_ngay: new Date().toLocaleDateString('vi-VN')
        });

        // Chỉ khi gửi thành công mới hiện Popup này
        hienThiKetQua(diemTron, correct, contentBlocks.length);
        if(diemTron >= 5 && typeof confetti !== 'undefined') confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        btn.innerText = "ĐÃ NỘP XONG";
        
    } catch(e) { 
        alert("🔥 LỖI GỬI ĐIỂM VỀ KHO:\n" + e.message + "\n\n(Hãy chụp ảnh lỗi này gửi cho kỹ thuật)");
        btn.disabled = false; 
        btn.innerText = "NỘP LẠI";
    }
};

// ... Các hàm hiển thị Popup giữ nguyên ...
async function hienThiKetQua(diem, dung, tong) {
    let allow = true;
    try {
        const cfg = await db.collection("CAU_HINH").doc("trang_thai_mon").get();
        if(cfg.exists) allow = cfg.data().xem_dap_an !== false;
    } catch(e){}

    let btnHtml = allow 
        ? `<button class="btn-review" style="background:#f59e0b; color:white; padding:10px 20px; border:none; border-radius:8px; cursor:pointer; font-weight:bold" onclick="xemLaiBai()">🔍 XEM LẠI BÀI</button>` 
        : `<button style="background:#ccc; color:white; padding:10px; border:none; border-radius:5px" disabled>🚫 Đã ẩn đáp án</button>`;

    const div = document.createElement("div");
    div.id = "result-popup";
    div.className = "result-overlay"; 
    div.style.display = "flex";
    div.innerHTML = `
        <div class="result-box">
            <h3>✅ NỘP THÀNH CÔNG!</h3>
            <div class="result-score">${diem.toFixed(1)}</div>
            <p>Đúng ${dung}/${tong} câu</p>
            <div class="btn-group-result">
                ${btnHtml}
                <button class="btn-finish" style="background:#0284c7; color:white; padding:10px 20px; border:none; border-radius:8px; cursor:pointer" onclick="window.location.href='Menu.html'">🏠 VỀ MENU</button>
            </div>
        </div>`;
    document.body.appendChild(div);
}

window.xemLaiBai = function() {
    document.getElementById("result-popup").style.display = "none";
    document.getElementById("btn-nop").style.display = "none";
    document.querySelectorAll(".question-block").forEach(b => {
        const inputs = b.querySelectorAll("input");
        inputs.forEach(i => {
            i.disabled = true;
            if(i.getAttribute("data-correct") === "true") i.parentElement.classList.add("res-correct");
            if(i.checked && i.getAttribute("data-correct") !== "true") i.parentElement.classList.add("res-wrong");
        });
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
