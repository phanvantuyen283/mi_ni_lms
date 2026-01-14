// core.js - v7.0 (AUTO LOAD SECURITY QUESTION)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// Auto Confetti
const confettiScript = document.createElement("script");
confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
document.head.appendChild(confettiScript);

const firebaseConfig = { apiKey: "AIzaSyA77lLi_JCLIdR535KEfg3S0_Ge2EorPMo", authDomain: "baikiemtracuoiki.firebaseapp.com", projectId: "baikiemtracuoiki", storageBucket: "baikiemtracuoiki.firebasestorage.app", messagingSenderId: "953819948776", appId: "1:953819948776:web:4e9a017a6c5fc10ed28b5d" };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Check Login
const studentName = localStorage.getItem("hocSinhLop4A");
if (!studentName) { alert("Chưa đăng nhập!"); window.location.href = "index.html"; }
else { const d = document.getElementById("student-display"); if(d) d.innerText = studentName; }

// Timer
let seconds = 0;
setInterval(() => { seconds++; let m=Math.floor(seconds/60).toString().padStart(2,'0'); let s=(seconds%60).toString().padStart(2,'0'); const t=document.getElementById("timer"); if(t) t.innerText=`${m}:${s}`; }, 1000);

// --- TỰ ĐỘNG TẢI CÂU HỎI BẢO MẬT ---
async function loadSecurityQuestion() {
    const qBlock = document.querySelector(".security-quest");
    if (!qBlock) return; // Nếu bài tập không có bảo mật thì bỏ qua

    try {
        const docSnap = await getDoc(doc(db, "CAU_HINH", "cau_hoi_bao_mat"));
        if (docSnap.exists()) {
            const data = docSnap.data();
            // Render HTML mới đè lên cái cũ
            let html = `<div class="question-text" style="color:#c2410c">🔒 CÂU HỎI BẢO MẬT: ${data.question}</div><div class="options">`;
            
            const labels = ["A", "B", "C", "D"];
            data.options.forEach((opt, idx) => {
                const label = labels[idx];
                // Nếu là đáp án đúng thì gán id="security-correct"
                const idAttr = label === data.correct ? 'id="security-correct"' : '';
                html += `<label><input type="radio" name="sec-q" value="${label}" ${idAttr}> ${label}. ${opt}</label>`;
            });
            html += `</div>`;
            
            qBlock.innerHTML = html;
        }
    } catch (e) {
        console.error("Lỗi tải câu hỏi bảo mật:", e);
    }
}
loadSecurityQuestion(); // Chạy ngay khi mở trang

// --- LOGIC NỘP BÀI ---
window.nopBai = async function() {
    const btn = document.getElementById("btn-nop");
    
    // Check bảo mật (Dựa trên ID dynamic vừa tạo)
    const secCheck = document.getElementById("security-correct");
    if (secCheck && !secCheck.checked) {
        alert("⛔ SAI CÂU HỎI BẢO MẬT!\nBạn không phải thành viên lớp 4A hoặc chưa cập nhật thông tin hôm nay.");
        window.location.href = "index.html";
        return;
    }

    btn.disabled = true; btn.innerText = "Đang chấm..."; btn.style.opacity = "0.7";

    const tieuDe = document.getElementById("ten-bai-tap").innerText;
    let correctCount = 0;
    
    // Chỉ chấm các câu hỏi nội dung (không phải security)
    const allBlocks = document.querySelectorAll(".question-block");
    const contentBlocks = Array.from(allBlocks).filter(b => !b.classList.contains('security-quest'));
    
    contentBlocks.forEach(b => {
        const sel = b.querySelector("input:checked");
        if (sel && sel.getAttribute("data-correct") === "true") correctCount++;
    });

    const diem = contentBlocks.length > 0 ? (correctCount / contentBlocks.length) * 10 : 0;
    const diemLamTron = Number(diem.toFixed(1));

    try {
        await addDoc(collection(db, "KET_QUA_TONG_HOP"), {
            hoc_sinh: studentName, bai_tap: tieuDe, diem: diemLamTron, 
            so_cau_dung: correctCount, tong_so_cau: contentBlocks.length,
            thoi_gian_lam: seconds, ngay_nop: serverTimestamp()
        });

        hienThiKetQua(diemLamTron, correctCount, contentBlocks.length);
        if(diemLamTron >= 5) banPhaoGiay(diemLamTron);
        docLoiChuc(studentName, diemLamTron);

    } catch (e) {
        alert("Lỗi mạng: " + e.message);
        btn.disabled = false; btn.innerText = "NỘP LẠI";
    }
};

async function hienThiKetQua(diem, dung, tong) {
    let allowReview = true;
    try {
        const cfg = await getDoc(doc(db, "CAU_HINH", "trang_thai_mon"));
        if (cfg.exists()) allowReview = cfg.data().xem_dap_an !== false;
    } catch(e) {}

    let btnHtml = allowReview 
        ? `<button class="btn-review" onclick="xemLaiBai()">🔍 Xem lại bài</button>` 
        : `<button class="btn-finish" style="background:#94a3b8; cursor:not-allowed">🚫 Đã ẩn đáp án</button>`;

    const div = document.createElement("div");
    div.id = "result-popup";
    div.className = "result-overlay";
    div.innerHTML = `
        <div class="result-box">
            <h3>KẾT QUẢ</h3>
            <div class="result-score">${diem.toFixed(1)}</div>
            <p>Đúng <b>${dung}/${tong}</b> câu.</p>
            <div class="btn-group-result">
                ${btnHtml}
                <button class="btn-continue" onclick="window.location.href='Menu.html'">➜ Về Menu</button>
            </div>
        </div>`;
    document.body.appendChild(div);
}

window.xemLaiBai = function() {
    document.getElementById("result-popup").style.display = "none";
    document.getElementById("btn-nop").style.display = "none";
    
    document.querySelectorAll(".question-block").forEach(b => {
        if(b.classList.contains("security-quest")) return; // Bỏ qua câu bảo mật
        
        const inputs = b.querySelectorAll("input");
        let explain = "";
        inputs.forEach(i => {
            i.disabled = true;
            if(i.getAttribute("data-correct") === "true") {
                i.parentElement.classList.add("res-correct");
                explain = i.getAttribute("data-explain");
            }
            if(i.checked && i.getAttribute("data-correct") !== "true") i.parentElement.classList.add("res-wrong");
        });

        if(explain) {
            const d = document.createElement("div");
            d.className = "explain-box"; d.innerHTML = `<strong>💡 GIẢI THÍCH:</strong> ${explain}`; d.style.display="block";
            b.appendChild(d);
        }
    });
    window.scrollTo(0,0);
}

function banPhaoGiay(diem) { if (diem < 5) return; var end = Date.now() + 2000; (function frame() { confetti({ particleCount: 5, spread: 55, origin: { x: 0 } }); confetti({ particleCount: 5, spread: 55, origin: { x: 1 } }); if (Date.now() < end) requestAnimationFrame(frame); }()); }
function docLoiChuc(ten, diem) { if ('speechSynthesis' in window) { let msg = `Chúc mừng ${ten} đạt ${diem} điểm`; let ut = new SpeechSynthesisUtterance(msg); ut.lang = 'vi-VN'; window.speechSynthesis.speak(ut); } }
