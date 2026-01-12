// core.js - PHIÊN BẢN v5 (TOP FEATURE: PHÁO HOA & GIỌNG NÓI)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// --- 1. TỰ ĐỘNG CÀI ĐẶT PHÁO GIẤY ---
// (Tự chèn thư viện vào trang web mà không cần sửa file HTML)
const confettiScript = document.createElement("script");
confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
document.head.appendChild(confettiScript);

const firebaseConfig = { apiKey: "AIzaSyA77lLi_JCLIdR535KEfg3S0_Ge2EorPMo", authDomain: "baikiemtracuoiki.firebaseapp.com", projectId: "baikiemtracuoiki", storageBucket: "baikiemtracuoiki.firebasestorage.app", messagingSenderId: "953819948776", appId: "1:953819948776:web:4e9a017a6c5fc10ed28b5d" };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Kiểm tra đăng nhập
const studentName = localStorage.getItem("hocSinhLop4A");
if (!studentName) {
    alert("Hệ thống chưa nhận diện được học sinh! Vui lòng quay lại điểm danh.");
    window.location.href = "index.html";
} else {
    const display = document.getElementById("student-display");
    if(display) display.innerText = studentName;
}

// Xử lý đồng hồ
let seconds = 0;
let timerInterval = setInterval(() => {
    seconds++;
    let m = Math.floor(seconds / 60).toString().padStart(2, '0');
    let s = (seconds % 60).toString().padStart(2, '0');
    const timer = document.getElementById("timer");
    if(timer) timer.innerText = `${m}:${s}`;
}, 1000);

// --- HÀM NỘP BÀI ---
window.nopBai = async function() {
    clearInterval(timerInterval); 
    const btn = document.getElementById("btn-nop");
    btn.disabled = true;
    btn.innerText = "Đang chấm điểm...";
    btn.style.opacity = "0.7";

    const tieuDe = document.getElementById("ten-bai-tap").innerText;
    const questionBlocks = document.querySelectorAll(".question-block");
    let score = 0;
    let total = questionBlocks.length;

    questionBlocks.forEach(block => {
        const inputs = block.querySelectorAll("input[type='radio']");
        let isCorrect = false;
        inputs.forEach(input => {
            if (input.checked && input.getAttribute("data-correct") === "true") isCorrect = true;
        });
        if (isCorrect) score++;
    });

    const diemSo = (score / total) * 10;

    try {
        // Kiểm tra và lưu điểm (Logic v4)
        const q = query(collection(db, "KET_QUA_TONG_HOP"), where("hoc_sinh", "==", studentName), where("bai_tap", "==", tieuDe));
        const querySnapshot = await getDocs(q);
        let isNewRecord = false; 
        let oldScore = -1;

        if (!querySnapshot.empty) {
            const oldDoc = querySnapshot.docs[0];
            oldScore = oldDoc.data().diem;
            if (diemSo > oldScore) {
                await setDoc(doc(db, "KET_QUA_TONG_HOP", oldDoc.id), {
                    hoc_sinh: studentName, bai_tap: tieuDe, diem: diemSo, so_cau_dung: score, tong_so_cau: total, thoi_gian_lam: seconds, ngay_nop: serverTimestamp()
                });
                isNewRecord = true;
            }
        } else {
            await addDoc(collection(db, "KET_QUA_TONG_HOP"), {
                hoc_sinh: studentName, bai_tap: tieuDe, diem: diemSo, so_cau_dung: score, tong_so_cau: total, thoi_gian_lam: seconds, ngay_nop: serverTimestamp()
            });
            isNewRecord = true;
        }

        // --- KÍCH HOẠT HIỆU ỨNG (MỚI) ---
        hienThiKetQua(diemSo, score, total, isNewRecord, oldScore);
        
        // 1. Bắn pháo giấy
        banPhaoGiay(diemSo);
        
        // 2. Đọc tên và điểm
        docLoiChuc(studentName, diemSo);

    } catch (e) {
        alert("Lỗi mạng: " + e.message);
        btn.disabled = false;
        btn.innerText = "NỘP BÀI LẠI";
        timerInterval = setInterval(() => { seconds++; }, 1000); 
    }
};

function hienThiKetQua(diem, dung, tong, isNewRecord, oldScore) {
    let msgTitle = "", msgColor = "";
    if (oldScore === -1) { msgTitle = "✅ ĐÃ NỘP BÀI THÀNH CÔNG!"; msgColor = "#16a34a"; }
    else if (isNewRecord) { msgTitle = "🏆 TUYỆT VỜI! KỶ LỤC MỚI!"; msgColor = "#ea580c"; }
    else { msgTitle = `⚠️ CHƯA VƯỢT QUA KỶ LỤC CŨ (${oldScore.toFixed(1)})`; msgColor = "#64748b"; }

    const div = document.createElement("div");
    div.id = "result-popup";
    div.className = "result-overlay";
    div.innerHTML = `
        <div class="result-box">
            <h3 style="color:${msgColor}">${msgTitle}</h3>
            <div class="result-score">${diem.toFixed(1)}</div>
            <div class="result-info">
                Bạn làm đúng <strong>${dung}/${tong}</strong> câu.<br>
                Thời gian: <strong>${formatTime(seconds)}</strong>
            </div>
            ${!isNewRecord && oldScore !== -1 ? "<p style='color:red; font-size:13px; font-style:italic'>(Kết quả này sẽ không được lưu)</p>" : ""}
            <div class="btn-group-result">
                <button class="btn-review" onclick="xemLaiBai()">🔍 Xem lại bài & Đáp án</button>
                <button class="btn-continue" onclick="window.location.href='Menu.html'">➜ Làm môn khác</button>
                <button class="btn-finish" onclick="window.location.href='index.html'">✘ Thoát</button>
            </div>
        </div>
    `;
    document.body.appendChild(div);
}

// --- HÀM BẮN PHÁO GIẤY ---
function banPhaoGiay(diem) {
    // Chỉ bắn nếu điểm >= 5
    if (diem < 5) return;

    // Thời gian bắn (Điểm càng cao bắn càng lâu)
    var duration = (diem >= 9) ? 3000 : 1500; 
    var end = Date.now() + duration;

    (function frame() {
        // Hai bên bắn vào giữa
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// --- HÀM ĐỌC GIỌNG NÓI ---
function docLoiChuc(ten, diem) {
    if ('speechSynthesis' in window) {
        // Tạo câu nói
        let loiNoi = "";
        if (diem >= 9) loiNoi = `Xuất sắc! Chúc mừng bạn ${ten}, bạn đã đạt ${diem} điểm.`;
        else if (diem >= 7) loiNoi = `Làm tốt lắm! Bạn ${ten} được ${diem} điểm.`;
        else if (diem >= 5) loiNoi = `Bạn ${ten} đã hoàn thành bài thi với ${diem} điểm.`;
        else loiNoi = `Cố gắng lần sau nhé ${ten}, bạn được ${diem} điểm.`;

        // Cấu hình giọng đọc
        let utterance = new SpeechSynthesisUtterance(loiNoi);
        utterance.lang = 'vi-VN'; // Tiếng Việt
        utterance.rate = 0.9;     // Tốc độ vừa phải
        utterance.pitch = 1.1;    // Giọng cao một chút cho vui tai

        // Đọc
        window.speechSynthesis.speak(utterance);
    }
}

window.xemLaiBai = function() {
    const popup = document.getElementById("result-popup");
    if(popup) popup.style.display = "none";
    const btnNop = document.getElementById("btn-nop");
    if(btnNop) btnNop.style.display = "none";

    const questionBlocks = document.querySelectorAll(".question-block");
    questionBlocks.forEach(block => {
        const inputs = block.querySelectorAll("input[type='radio']");
        inputs.forEach(input => {
            input.disabled = true;
            const parentLabel = input.parentElement;
            if (input.getAttribute("data-correct") === "true") parentLabel.classList.add("res-correct");
            if (input.checked && input.getAttribute("data-correct") !== "true") parentLabel.classList.add("res-wrong");
        });
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const backBtn = document.createElement("button");
    backBtn.innerText = "⬅ Quay về chọn môn khác";
    backBtn.className = "btn-submit";
    backBtn.style.background = "#64748b";
    backBtn.style.marginTop = "20px";
    backBtn.onclick = function() { window.location.href = "Menu.html"; };
    document.querySelector(".quiz-container").appendChild(backBtn);
};

function formatTime(sec) {
    let m = Math.floor(sec / 60).toString().padStart(2, '0');
    let s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}
