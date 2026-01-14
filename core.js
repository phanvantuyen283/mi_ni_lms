/* ============================================================
   CORE.JS - PHIÊN BẢN TOÀN NĂNG v8.0 (FIX DỨT ĐIỂM LỖI LIỆT NÚT)
   Tự động tương thích với mọi file bài tập HTML
   ============================================================ */

// 1. CẤU HÌNH & KẾT NỐI FIREBASE
const firebaseConfig = { apiKey: "AIzaSyA77lLi_JCLIdR535KEfg3S0_Ge2EorPMo", authDomain: "baikiemtracuoiki.firebaseapp.com", projectId: "baikiemtracuoiki", storageBucket: "baikiemtracuoiki.firebasestorage.app", messagingSenderId: "953819948776", appId: "1:953819948776:web:4e9a017a6c5fc10ed28b5d" };

// Kiểm tra xem thư viện Firebase trong HTML đã tải chưa
let db;
if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    db = firebase.firestore();
    console.log("✅ Core.js: Đã kết nối Firebase thành công!");
} else {
    console.error("❌ LỖI: Không tìm thấy thư viện Firebase trong file HTML.");
    alert("Lỗi hệ thống: Chưa tải được thư viện Firebase. Vui lòng kiểm tra kết nối mạng!");
}

// 2. TỰ ĐỘNG NẠP CÁC TIỆN ÍCH (Pháo hoa, Giọng nói)
if (typeof confetti === 'undefined') {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
    document.head.appendChild(script);
}

// 3. KIỂM TRA ĐĂNG NHẬP & ĐỒNG HỒ
const studentName = localStorage.getItem("hocSinhLop4A");
const display = document.getElementById("student-display");
if(display) {
    display.innerText = studentName ? studentName : "Khách (Chưa đăng nhập)";
}

let seconds = 0;
setInterval(() => {
    seconds++;
    const timer = document.getElementById("timer");
    if(timer) {
        let m = Math.floor(seconds / 60).toString().padStart(2, '0');
        let s = (seconds % 60).toString().padStart(2, '0');
        timer.innerText = `${m}:${s}`;
    }
}, 1000);

// 4. TỰ ĐỘNG TẢI CÂU HỎI BẢO MẬT TỪ ADMIN
async function loadSecurityQuestion() {
    const qBlock = document.querySelector(".security-quest");
    if (!qBlock || !db) return;

    try {
        const docSnap = await db.collection("CAU_HINH").doc("cau_hoi_bao_mat").get();
        if (docSnap.exists) {
            const data = docSnap.data();
            let html = `<div class="question-text" style="color:#c2410c; border-bottom:1px dashed #fca5a5; padding-bottom:5px; margin-bottom:10px;">🔒 CÂU HỎI BẢO MẬT: ${data.question}</div><div class="options">`;
            const labels = ["A", "B", "C", "D"];
            data.options.forEach((opt, idx) => {
                const label = labels[idx];
                // Gán ID đặc biệt cho đáp án đúng để code kiểm tra
                const idAttr = label === data.correct ? 'id="security-correct"' : '';
                html += `<label style="background:#fff1f2"><input type="radio" name="sec-q" value="${label}" ${idAttr}> <b>${label}.</b> ${opt}</label>`;
            });
            html += `</div>`;
            qBlock.innerHTML = html;
        }
    } catch (e) { console.log("Lỗi tải câu hỏi bảo mật:", e); }
}
// Chạy ngay khi file được tải
loadSecurityQuestion();

// ============================================================
// 5. HÀM XỬ LÝ CHÍNH (Gán vào window để HTML gọi được)
// ============================================================

window.nopBai = async function() {
    const btn = document.getElementById("btn-nop");
    
    // --- BƯỚC 1: KIỂM TRA BẢO MẬT ---
    const secCheck = document.getElementById("security-correct");
    // Nếu có câu hỏi bảo mật mà chưa chọn hoặc chọn sai
    if (document.querySelector(".security-quest") && (!secCheck || !secCheck.checked)) {
        alert("⛔ CẢNH BÁO BẢO MẬT!\n\nBạn chưa trả lời đúng 'Câu hỏi bảo mật' ở đầu trang.\nHãy chọn đúng để xác nhận là thành viên lớp 4A nhé!");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return; // Dừng lại ngay
    }

    // --- BƯỚC 2: CHẤM ĐIỂM ---
    btn.disabled = true; 
    btn.innerText = "ĐANG CHẤM ĐIỂM..."; 
    btn.style.opacity = "0.7";

    let correctCount = 0;
    const allBlocks = document.querySelectorAll(".question-block");
    // Lọc bỏ câu bảo mật ra khỏi phần tính điểm
    const contentBlocks = Array.from(allBlocks).filter(b => !b.classList.contains('security-quest'));
    
    contentBlocks.forEach(b => {
        const sel = b.querySelector("input:checked");
        // Kiểm tra thuộc tính data-correct="true"
        if (sel && sel.getAttribute("data-correct") === "true") correctCount++;
    });

    const total = contentBlocks.length;
    const diem = total > 0 ? (correctCount / total) * 10 : 0;
    const diemLamTron = Number(diem.toFixed(1));
    const tieuDe = document.getElementById("ten-bai-tap") ? document.getElementById("ten-bai-tap").innerText : "Bài Tập Không Tên";

    // --- BƯỚC 3: LƯU VÀO FIREBASE ---
    try {
        if(db && studentName) {
            await db.collection("KET_QUA_TONG_HOP").add({
                hoc_sinh: studentName, 
                bai_tap: tieuDe, 
                diem: diemLamTron, 
                so_cau_dung: correctCount, 
                tong_so_cau: total,
                thoi_gian_lam: seconds, 
                ngay_nop: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
    } catch (e) {
        console.error("Lỗi lưu điểm (có thể do mạng):", e);
    }

    // --- BƯỚC 4: HIỂN THỊ KẾT QUẢ ---
    hienThiKetQua(diemLamTron, correctCount, total);
    
    // Hiệu ứng
    if(diemLamTron >= 5 && typeof confetti !== 'undefined') {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
    
    // Giọng nói
    if ('speechSynthesis' in window) {
        let loiChuc = diemLamTron >= 8 ? "Xuất sắc!" : (diemLamTron >= 5 ? "Làm tốt lắm!" : "Cố gắng hơn nhé!");
        let msg = new SpeechSynthesisUtterance(`${loiChuc} Bạn ${studentName || 'nhỏ'} được ${diemLamTron} điểm.`);
        msg.lang = 'vi-VN'; 
        window.speechSynthesis.speak(msg);
    }
};

// Hàm hiện Popup & Check quyền xem đáp án từ Admin
async function hienThiKetQua(diem, dung, tong) {
    let allowReview = true; // Mặc định cho xem
    if(db) {
        try {
            const cfg = await db.collection("CAU_HINH").doc("trang_thai_mon").get();
            if (cfg.exists) allowReview = cfg.data().xem_dap_an !== false;
        } catch(e) {}
    }

    let btnHtml = allowReview 
        ? `<button style="background:#f59e0b; color:white; border:none; padding:10px 20px; border-radius:8px; cursor:pointer; font-weight:bold" onclick="xemLaiBai()">🔍 Xem lại bài & Đáp án</button>` 
        : `<button style="background:#94a3b8; color:white; border:none; padding:10px 20px; border-radius:8px; cursor:not-allowed" disabled>🚫 Đã ẩn đáp án</button>`;

    const div = document.createElement("div");
    div.id = "result-popup";
    div.style.position = "fixed"; div.style.top="0"; div.style.left="0"; div.style.width="100%"; div.style.height="100%";
    div.style.background = "rgba(0,0,0,0.9)"; div.style.display="flex"; div.style.justifyContent="center"; div.style.alignItems="center"; div.style.zIndex="9999";
    
    div.innerHTML = `
        <div style="background:white; padding:30px; width:90%; max-width:450px; border-radius:15px; text-align:center; border-top:8px solid #0284c7; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
            <h3 style="margin:0 0 10px 0; color:#0284c7; text-transform:uppercase">KẾT QUẢ BÀI LÀM</h3>
            <div style="font-size:5rem; font-weight:900; color:#ea580c; margin:10px 0">${diem.toFixed(1)}</div>
            <p style="font-size:1.1rem; color:#334155;">Đúng <b>${dung}/${tong}</b> câu.</p>
            <div style="display:flex; gap:10px; justify-content:center; margin-top:20px; flex-direction:column">
                ${btnHtml}
                <button style="background:#0284c7; color:white; border:none; padding:10px 20px; border-radius:8px; cursor:pointer; font-weight:bold" onclick="window.location.href='Menu.html'">➜ Quay về Menu</button>
            </div>
        </div>`;
    document.body.appendChild(div);
}

// Hàm xem lại bài (Hiện màu xanh/đỏ và Lời giải)
window.xemLaiBai = function() {
    const popup = document.getElementById("result-popup");
    if(popup) popup.style.display = "none";
    document.getElementById("btn-nop").style.display = "none"; // Ẩn nút nộp đi
    
    document.querySelectorAll(".question-block").forEach(b => {
        if(b.classList.contains("security-quest")) return; // Bỏ qua câu bảo mật
        
        const inputs = b.querySelectorAll("input");
        let explain = "";
        
        inputs.forEach(i => {
            i.disabled = true; // Khóa không cho chọn lại
            
            // Tô màu đáp án đúng
            if(i.getAttribute("data-correct") === "true") {
                i.parentElement.style.background = "#dcfce7"; 
                i.parentElement.style.border = "2px solid #22c55e";
                i.parentElement.style.color = "#15803d";
                explain = i.getAttribute("data-explain"); // Lấy lời giải
            }
            // Tô màu đáp án sai (nếu học sinh chọn)
            if(i.checked && i.getAttribute("data-correct") !== "true") {
                i.parentElement.style.background = "#fee2e2";
                i.parentElement.style.border = "2px solid #ef4444";
                i.parentElement.style.color = "#b91c1c";
            }
        });

        // Hiện khung lời giải (nếu có)
        if(explain) {
            const d = document.createElement("div");
            d.innerHTML = `<strong>💡 GIẢI THÍCH CHI TIẾT:</strong><br>${explain}`;
            d.style.marginTop="15px"; d.style.padding="15px"; d.style.background="#fff7ed"; 
            d.style.color="#c2410c"; d.style.borderRadius="8px"; d.style.fontSize="0.95rem"; d.style.borderLeft="4px solid #ea580c";
            d.style.lineHeight="1.5";
            b.appendChild(d);
        }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
