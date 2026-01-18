/* core.js - PHIÊN BẢN "BẤT TỬ" (Đã tích hợp Config để tránh lỗi) */

// 1. CẤU HÌNH TRỰC TIẾP (Để đảm bảo chạy 100%)
const _config = { apiKey: "AIzaSyA77lLi_JCLIdR535KEfg3S0_Ge2EorPMo", authDomain: "baikiemtracuoiki.firebaseapp.com", projectId: "baikiemtracuoiki", storageBucket: "baikiemtracuoiki.firebasestorage.app", messagingSenderId: "953819948776", appId: "1:953819948776:web:4e9a017a6c5fc10ed28b5d" };

// 2. KHỞI TẠO KẾT NỐI AN TOÀN
if (typeof firebase === 'undefined') {
    alert("❌ LỖI: Chưa nhúng thư viện Firebase ở đầu file HTML!");
} else {
    if (!firebase.apps.length) firebase.initializeApp(_config);
    window.db = firebase.firestore(); 
    console.log("✅ Core sẵn sàng");
}

// 3. CÁC BIẾN CƠ BẢN
const studentName = localStorage.getItem("hocSinhLop4A");
if(document.getElementById("student-display")) {
    document.getElementById("student-display").innerText = studentName || "Khách";
}

// 4. ĐỒNG HỒ
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

// --- 5. HÀM NỘP BÀI (Định nghĩa toàn cục) ---
window.nopBai = async function() {
    // Kiểm tra nhanh
    if (!window.db) { alert("⚠️ Mất kết nối Database! Hãy F5 tải lại trang."); return; }
    if (!studentName) { alert("⚠️ Chưa đăng nhập! Vui lòng quay lại Menu."); return; }

    const btn = document.getElementById("btn-nop");
    btn.disabled = true; 
    btn.innerText = "ĐANG CHẤM...";

    try {
        // A. Chấm điểm
        let correct = 0;
        const blocks = document.querySelectorAll(".question-block");
        // Lọc bỏ câu hỏi bảo mật (nếu có)
        const contentBlocks = Array.from(blocks).filter(b => !b.classList.contains('security-quest'));
        
        contentBlocks.forEach(b => {
            const i = b.querySelector("input:checked");
            if(i && i.getAttribute("data-correct") === "true") correct++;
        });

        const tongCau = contentBlocks.length;
        const diem = tongCau > 0 ? (correct / tongCau) * 10 : 0;
        const diemTron = Number(diem.toFixed(1));
        
        // Lấy tên bài an toàn
        let tieuDe = "Bài Tập";
        if(document.getElementById("ten-bai-tap")) tieuDe = document.getElementById("ten-bai-tap").innerText;

        // B. Gửi điểm
        await window.db.collection("KET_QUA_TONG_HOP").add({
            hoc_sinh: studentName,
            bai_tap: tieuDe,
            diem: diemTron,
            so_cau_dung: correct,
            tong_so_cau: tongCau,
            thoi_gian_lam: seconds,
            ngay_nop: firebase.firestore.FieldValue.serverTimestamp(),
            bat_dau_luc: new Date().getTime()
        });

        // C. Thông báo & Pháo hoa
        btn.innerText = "ĐÃ NỘP XONG";
        hienThiKetQua(diemTron, correct, tongCau);
        
        // Pháo hoa (nếu có thư viện)
        if(typeof confetti !== 'undefined' && diemTron >= 5) {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        }

    } catch(e) {
        alert("🔥 Lỗi: " + e.message);
        btn.disabled = false; 
        btn.innerText = "NỘP LẠI";
    }
};

// Hàm hiển thị Popup
async function hienThiKetQua(diem, dung, tong) {
    let allow = true;
    try {
        const cfg = await window.db.collection("CAU_HINH").doc("trang_thai_mon").get();
        if(cfg.exists) allow = cfg.data().xem_dap_an !== false;
    } catch(e){}

    let btnHtml = allow 
        ? `<button onclick="xemLaiBai()" style="background:#f59e0b;color:white;padding:10px;border:none;border-radius:5px;cursor:pointer;margin-top:10px;width:100%">🔍 XEM LẠI BÀI</button>` 
        : `<button disabled style="background:#ccc;color:white;padding:10px;border:none;border-radius:5px;margin-top:10px;width:100%">🚫 Đã ẩn đáp án</button>`;

    const div = document.createElement("div");
    div.id = "result-popup"; 
    div.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;justify-content:center;align-items:center;z-index:9999";
    div.innerHTML = `
        <div style="background:white;padding:30px;border-radius:15px;text-align:center;width:300px;border-top:5px solid #0284c7">
            <h2 style="margin:0;color:#0284c7">KẾT QUẢ</h2>
            <div style="font-size:3rem;font-weight:bold;color:#ea580c;margin:10px 0">${diem}</div>
            <p>Đúng ${dung}/${tong} câu</p>
            ${btnHtml}
            <button onclick="window.location.href='Menu.html'" style="background:#0284c7;color:white;padding:10px;border:none;border-radius:5px;cursor:pointer;margin-top:10px;width:100%">🏠 VỀ MENU</button>
        </div>`;
    document.body.appendChild(div);
}

window.xemLaiBai = function() {
    document.getElementById("result-popup").style.display = "none";
    document.getElementById("btn-nop").style.display = "none";
    document.querySelectorAll(".question-block input").forEach(i => {
        i.disabled = true;
        if(i.getAttribute("data-correct") === "true") i.parentElement.style.background = "#dcfce7";
        if(i.checked && i.getAttribute("data-correct") !== "true") i.parentElement.style.background = "#fee2e2";
    });
    window.scrollTo(0,0);
}
