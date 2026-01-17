/* core.js - PHIÊN BẢN GIÁM SÁT THỜI GIAN THỰC (ANTI-GAMING) */

// 1. Cấu hình Firebase
const firebaseConfig = { apiKey: "AIzaSyA77lLi_JCLIdR535KEfg3S0_Ge2EorPMo", authDomain: "baikiemtracuoiki.firebaseapp.com", projectId: "baikiemtracuoiki", storageBucket: "baikiemtracuoiki.firebasestorage.app", messagingSenderId: "953819948776", appId: "1:953819948776:web:4e9a017a6c5fc10ed28b5d" };

// 2. Kết nối Firebase
let db;
if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
} else { console.error("Lỗi: Chưa có thư viện Firebase"); }

// 3. Tự động thêm Pháo hoa
if (typeof confetti === 'undefined') {
    const s = document.createElement('script');
    s.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
    document.head.appendChild(s);
}

// --- QUAN TRỌNG: GHI LẠI GIỜ BẮT ĐẦU NGAY KHI MỞ TRANG ---
const THOI_DIEM_MO_DE = new Date().getTime(); // Lưu dạng số (Timestamp)
console.log("🕒 Đã ghi nhận thời điểm mở đề:", new Date(THOI_DIEM_MO_DE).toLocaleTimeString());

// 4. Hiển thị tên
const studentName = localStorage.getItem("hocSinhLop4A");
const display = document.getElementById("student-display");
if(display) display.innerText = studentName ? studentName : "Khách";

// 5. Đồng hồ đếm giờ (Chỉ để hiển thị cho HS vui)
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

// --- 6. HÀM NỘP BÀI (GỬI DỮ LIỆU THỜI GIAN CHI TIẾT) ---
window.nopBai = async function() {
    const btn = document.getElementById("btn-nop");
    btn.disabled = true; btn.innerText = "ĐANG LƯU..."; btn.style.opacity = "0.7";

    // Lấy thời điểm kết thúc thực tế
    const THOI_DIEM_NOP = new Date().getTime();

    // Chấm điểm
    let correct = 0;
    const allBlocks = document.querySelectorAll(".question-block");
    const contentBlocks = Array.from(allBlocks).filter(b => !b.classList.contains('security-quest'));
    
    contentBlocks.forEach(b => {
        const sel = b.querySelector("input:checked");
        if (sel && sel.getAttribute("data-correct") === "true") correct++;
    });

    const diem = contentBlocks.length > 0 ? (correct / contentBlocks.length) * 10 : 0;
    const diemTron = Number(diem.toFixed(1));
    const tieuDe = document.getElementById("ten-bai-tap") ? document.getElementById("ten-bai-tap").innerText : "Bài tập";

    // Lưu Firebase (THÊM TRƯỜNG CHI TIẾT GIỜ GIẤC)
    try {
        if(db && studentName) {
            await db.collection("KET_QUA_TONG_HOP").add({
                hoc_sinh: studentName, 
                bai_tap: tieuDe, 
                diem: diemTron, 
                so_cau_dung: correct, 
                tong_so_cau: contentBlocks.length,
                
                // DỮ LIỆU CŨ (Vẫn giữ để tương thích code cũ)
                thoi_gian_lam: seconds, 
                ngay_nop: firebase.firestore.FieldValue.serverTimestamp(),
                
                // DỮ LIỆU MỚI (Dùng để bắt lỗi chơi game)
                bat_dau_luc: THOI_DIEM_MO_DE,
                ket_thuc_luc: THOI_DIEM_NOP,
                chi_tiet_ngay: new Date().toLocaleDateString('vi-VN')
            });
        }
    } catch(e) { console.error(e); }

    // Hiện kết quả
    hienThiKetQua(diemTron, correct, contentBlocks.length);
    if(diemTron >= 5 && typeof confetti !== 'undefined') confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    if ('speechSynthesis' in window) {
        let msg = new SpeechSynthesisUtterance(`Bạn ${studentName} được ${diemTron} điểm`);
        msg.lang = 'vi-VN'; window.speechSynthesis.speak(msg);
    }
};

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
    div.innerHTML = `
        <div class="result-box">
            <h3>KẾT QUẢ</h3>
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
        let exp = "";
        inputs.forEach(i => {
            i.disabled = true;
            if(i.getAttribute("data-correct") === "true") { i.parentElement.classList.add("res-correct"); exp = i.getAttribute("data-explain"); }
            if(i.checked && i.getAttribute("data-correct") !== "true") i.parentElement.classList.add("res-wrong");
        });
        if(exp) {
            const d = document.createElement("div");
            d.innerHTML = `💡 ${exp}`; d.style.cssText = "margin-top:10px; padding:10px; background:#fff7ed; color:#c2410c; border-radius:8px";
            b.appendChild(d);
        }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Chặn làm lại (Giữ nguyên)
async function kiemTraQuyenLamBai() {
    const studentName = localStorage.getItem("hocSinhLop4A");
    const titleEl = document.getElementById("ten-bai-tap");
    if (!studentName || !titleEl) return;
    try {
        if (!db) return;
        const configDoc = await db.collection("CAU_HINH").doc("trang_thai_mon").get();
        if (!configDoc.exists || configDoc.data().chan_lam_lai !== true) return;
        const scoreSnap = await db.collection("KET_QUA_TONG_HOP").where("hoc_sinh", "==", studentName).where("bai_tap", "==", titleEl.innerText).limit(1).get();
        if (!scoreSnap.empty) {
            document.querySelector(".quiz-container").style.display = "none"; 
            alert(`⛔ BẠN ĐÃ LÀM BÀI NÀY RỒI!`);
            window.location.href = "Menu.html"; 
        }
    } catch (e) {}
}
setTimeout(kiemTraQuyenLamBai, 1500);
