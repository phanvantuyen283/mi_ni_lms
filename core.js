/* core.js - PHIÊN BẢN FINAL (KHÔNG DÙNG IMPORT - FIX LỖI LIỆT NÚT) */

// 1. Cấu hình
const firebaseConfig = { apiKey: "AIzaSyA77lLi_JCLIdR535KEfg3S0_Ge2EorPMo", authDomain: "baikiemtracuoiki.firebaseapp.com", projectId: "baikiemtracuoiki", storageBucket: "baikiemtracuoiki.firebasestorage.app", messagingSenderId: "953819948776", appId: "1:953819948776:web:4e9a017a6c5fc10ed28b5d" };

// 2. Kết nối Firebase (Dùng thư viện toàn cục từ HTML)
let db;
if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    console.log("✅ Core.js: Kết nối thành công!");
} else {
    alert("Lỗi: Không tìm thấy thư viện Firebase. Hãy kiểm tra file HTML!");
}

// 3. Tự động thêm Pháo hoa nếu thiếu
if (typeof confetti === 'undefined') {
    const s = document.createElement('script');
    s.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
    document.head.appendChild(s);
}

// 4. Kiểm tra đăng nhập
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

// --- 6. AUTO LOAD BẢO MẬT ---
async function loadSecurityQuestion() {
    const qBlock = document.querySelector(".security-quest");
    if (!qBlock || !db) return;
    try {
        const doc = await db.collection("CAU_HINH").doc("cau_hoi_bao_mat").get();
        if (doc.exists) {
            const d = doc.data();
            let h = `<div class="question-text" style="color:#c2410c">🔒 CÂU HỎI BẢO MẬT: ${d.question}</div><div class="options">`;
            ["A","B","C","D"].forEach((lbl, i) => {
                let id = lbl === d.correct ? 'id="security-correct"' : '';
                h += `<label style="background:#fff1f2"><input type="radio" name="sec" value="${lbl}" ${id}> ${lbl}. ${d.options[i]}</label>`;
            });
            qBlock.innerHTML = h + `</div>`;
        }
    } catch(e) { console.log(e); }
}
loadSecurityQuestion();

// --- 7. HÀM NỘP BÀI (GẮN VÀO WINDOW ĐỂ HTML GỌI ĐƯỢC) ---
window.nopBai = async function() {
    const btn = document.getElementById("btn-nop");
    
    // Check bảo mật
    const sec = document.getElementById("security-correct");
    if (document.querySelector(".security-quest") && (!sec || !sec.checked)) {
        alert("⛔ Sai câu hỏi bảo mật! Vui lòng chọn đúng để nộp bài.");
        return;
    }

    btn.disabled = true; btn.innerText = "ĐANG CHẤM..."; btn.style.opacity = "0.7";

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
    const tieuDe = document.getElementById("ten-bai-tap").innerText;

    // Lưu Firebase
    try {
        if(db && studentName) {
            await db.collection("KET_QUA_TONG_HOP").add({
                hoc_sinh: studentName, bai_tap: tieuDe, diem: diemTron, 
                so_cau_dung: correct, tong_so_cau: contentBlocks.length,
                thoi_gian_lam: seconds, ngay_nop: firebase.firestore.FieldValue.serverTimestamp()
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
        ? `<button style="background:#f59e0b; color:white; padding:10px; border:none; border-radius:5px; cursor:pointer" onclick="xemLaiBai()">🔍 Xem lại</button>` 
        : `<button style="background:#ccc; color:white; padding:10px; border:none; border-radius:5px" disabled>🚫 Đã ẩn đáp án</button>`;

    const div = document.createElement("div");
    div.id = "result-popup";
    div.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); display:flex; justify-content:center; align-items:center; z-index:9999";
    div.innerHTML = `
        <div style="background:white; padding:30px; border-radius:15px; text-align:center; width:300px; border-top:5px solid #0284c7">
            <h2 style="color:#0284c7; margin:0">${diem.toFixed(1)}</h2>
            <p>Đúng ${dung}/${tong} câu</p>
            <div style="display:flex; gap:10px; justify-content:center; margin-top:15px">
                ${btnHtml}
                <button style="background:#0284c7; color:white; padding:10px; border:none; border-radius:5px; cursor:pointer" onclick="window.location.href='Menu.html'">➜ Về Menu</button>
            </div>
        </div>`;
    document.body.appendChild(div);
}

window.xemLaiBai = function() {
    document.getElementById("result-popup").style.display = "none";
    document.getElementById("btn-nop").style.display = "none";
    document.querySelectorAll(".question-block").forEach(b => {
        if(b.classList.contains("security-quest")) return;
        const inputs = b.querySelectorAll("input");
        let exp = "";
        inputs.forEach(i => {
            i.disabled = true;
            if(i.getAttribute("data-correct") === "true") {
                i.parentElement.style.background = "#dcfce7";
                exp = i.getAttribute("data-explain");
            }
            if(i.checked && i.getAttribute("data-correct") !== "true") i.parentElement.style.background = "#fee2e2";
        });
        if(exp) {
            const d = document.createElement("div");
            d.innerHTML = `💡 ${exp}`; d.style.cssText = "margin-top:10px; padding:10px; background:#fff7ed; color:#c2410c; font-size:0.9em; border-radius:5px";
            b.appendChild(d);
        }
    });
    window.scrollTo(0,0);
}
/* ============================================================
   6. TÍNH NĂNG CHẶN LÀM LẠI (Anti-Cheat Mode)
   Tự động kiểm tra xem học sinh đã có điểm chưa ngay khi vào trang
   ============================================================ */
async function kiemTraQuyenLamBai() {
    const studentName = localStorage.getItem("hocSinhLop4A");
    const titleEl = document.getElementById("ten-bai-tap");
    
    // Nếu chưa đăng nhập hoặc không tìm thấy tên bài thì bỏ qua
    if (!studentName || !titleEl) return;
    
    const tieuDe = titleEl.innerText;

    try {
        // 1. Lấy cấu hình từ Admin xem có bật chặn không
        const configDoc = await db.collection("CAU_HINH").doc("trang_thai_mon").get();
        
        // Nếu Admin ĐANG BẬT chế độ chặn (chan_lam_lai = true)
        if (configDoc.exists && configDoc.data().chan_lam_lai === true) {
            
            // 2. Kiểm tra trên Database xem học sinh này đã có điểm bài này chưa
            const scoreSnap = await db.collection("KET_QUA_TONG_HOP")
                .where("hoc_sinh", "==", studentName)
                .where("bai_tap", "==", tieuDe)
                .get();

            // 3. Nếu tìm thấy kết quả cũ -> Chặn ngay lập tức
            if (!scoreSnap.empty) {
                // Ẩn nội dung đề thi để không nhìn trộm được
                document.querySelector(".quiz-container").style.display = "none";
                
                alert("⛔ BẠN ĐÃ LÀM BÀI NÀY RỒI!\n(Hệ thống đang bật chế độ chỉ được làm 1 lần)");
                window.location.href = "Menu.html"; // Đẩy về Menu
            }
        }
    } catch (e) {
        console.error("Lỗi kiểm tra quyền làm bài:", e);
    }
}

// Gọi hàm này chạy ngay lập tức khi tải trang
kiemTraQuyenLamBai();
