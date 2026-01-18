/* core.js - PHIÊN BẢN CHUẨN (ĐÃ FIX LỖI NGOẶC) */

// 1. Cấu hình & Kết nối
const firebaseConfig = { apiKey: "AIzaSyA77lLi_JCLIdR535KEfg3S0_Ge2EorPMo", authDomain: "baikiemtracuoiki.firebaseapp.com", projectId: "baikiemtracuoiki", storageBucket: "baikiemtracuoiki.firebasestorage.app", messagingSenderId: "953819948776", appId: "1:953819948776:web:4e9a017a6c5fc10ed28b5d" };

// Tự động kết nối nếu config.js chưa chạy
if (typeof firebase !== 'undefined' && !window.db) {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    window.db = firebase.firestore();
    console.log("✅ Core: Đã tự kết nối Firebase");
}

// 2. Biến toàn cục
const THOI_DIEM_MO_DE = new Date().getTime();
const studentName = localStorage.getItem("hocSinhLop4A");
const display = document.getElementById("student-display");
if(display) display.innerText = studentName ? studentName : "Khách";

// 3. Pháo hoa
if (typeof confetti === 'undefined') {
    const s = document.createElement('script'); s.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"; document.head.appendChild(s);
}

// 4. Đồng hồ
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

// --- 5. HÀM NỘP BÀI ---
window.nopBai = async function() {
    // Kiểm tra an toàn
    if (!window.db && typeof db !== 'undefined') window.db = db;
    if (!window.db) { alert("⛔ LỖI MẤT KẾT NỐI!\nBiến 'db' chưa được khởi tạo. Hãy tải lại trang (F5)."); return; }
    if (!studentName) { alert("⚠️ Chưa đăng nhập!"); return; }

    const btn = document.getElementById("btn-nop");
    btn.disabled = true; btn.innerText = "ĐANG CHẤM...";

    // Chấm điểm
    let correct = 0;
    const allBlocks = document.querySelectorAll(".question-block");
    const contentBlocks = Array.from(allBlocks).filter(b => !b.classList.contains('security-quest'));
    contentBlocks.forEach(b => {
        const sel = b.querySelector("input:checked");
        if (sel && sel.getAttribute("data-correct") === "true") correct++;
    });
    const diem = contentBlocks.length > 0 ? (correct / contentBlocks.length) * 10 : 0;
    const tieuDe = document.getElementById("ten-bai-tap") ? document.getElementById("ten-bai-tap").innerText : "Bài tập";

    // Gửi về Firebase
    try {
        await window.db.collection("KET_QUA_TONG_HOP").add({
            hoc_sinh: studentName, bai_tap: tieuDe, diem: Number(diem.toFixed(1)), 
            so_cau_dung: correct, tong_so_cau: contentBlocks.length,
            thoi_gian_lam: seconds, ngay_nop: firebase.firestore.FieldValue.serverTimestamp(),
            bat_dau_luc: THOI_DIEM_MO_DE, ket_thuc_luc: new Date().getTime()
        });
        
        // Thành công
        hienThiKetQua(diem, correct, contentBlocks.length);
        if(diem >= 5 && typeof confetti !== 'undefined') confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        btn.innerText = "ĐÃ NỘP XONG";
        
    } catch(e) {
        alert("🔥 Lỗi gửi điểm: " + e.message);
        btn.disabled = false; btn.innerText = "NỘP LẠI";
    }
};

// --- 6. HIỂN THỊ KẾT QUẢ ---
async function hienThiKetQua(diem, dung, tong) {
    let allow = true;
    try {
        const cfg = await window.db.collection("CAU_HINH").doc("trang_thai_mon").get();
        if(cfg.exists) allow = cfg.data().xem_dap_an !== false;
    } catch(e){}

    let btnHtml = allow 
        ? `<button class="btn-review" style="background:#f59e0b; color:white; padding:10px 20px; border:none; border-radius:8px; cursor:pointer; font-weight:bold" onclick="xemLaiBai()">🔍 XEM LẠI BÀI</button>` 
        : `<button style="background:#ccc; color:white; padding:10px; border:none; border-radius:5px" disabled>🚫 Đã ẩn đáp án</button>`;

    const div = document.createElement("div");
    div.id = "result-popup"; div.className = "result-overlay"; div.style.display = "flex";
    div.innerHTML = `<div class="result-box"><h3>KẾT QUẢ</h3><div class="result-score">${diem.toFixed(1)}</div><p>Đúng ${dung}/${tong} câu</p><div class="btn-group-result">${btnHtml}<button class="btn-finish" style="background:#0284c7; color:white; padding:10px 20px; border:none; border-radius:8px; cursor:pointer" onclick="window.location.href='Menu.html'">🏠 VỀ MENU</button></div></div>`;
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

// --- 7. CHỐNG GIAN LẬN ---
async function kiemTraQuyenLamBai() {
    const hs = localStorage.getItem("hocSinhLop4A");
    const titleEl = document.getElementById("ten-bai-tap");
    if (!hs || !titleEl || !window.db) return;
    try {
        const cfg = await window.db.collection("CAU_HINH").doc("trang_thai_mon").get();
        if (!cfg.exists || cfg.data().chan_lam_lai !== true) return;
        
        const snap = await window.db.collection("KET_QUA_TONG_HOP").where("hoc_sinh", "==", hs).where("bai_tap", "==", titleEl.innerText).limit(1).get();
        if (!snap.empty) {
            document.querySelector(".quiz-container").innerHTML = "<h2 style='text-align:center;color:red'>⛔ BẠN ĐÃ LÀM BÀI NÀY RỒI!</h2><button onclick=\"location.href='Menu.html'\" style='width:100%;padding:15px;background:#0284c7;color:white;border:none;border-radius:10px'>VỀ MENU</button>";
        }
    } catch (e) {}
}
// Chạy kiểm tra sau 1.5 giây
setTimeout(kiemTraQuyenLamBai, 1500);
