// core.js - PHIÊN BẢN v3 (CÓ CHỨC NĂNG XEM LẠI BÀI)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = { apiKey: "AIzaSyA77lLi_JCLIdR535KEfg3S0_Ge2EorPMo", authDomain: "baikiemtracuoiki.firebaseapp.com", projectId: "baikiemtracuoiki", storageBucket: "baikiemtracuoiki.firebasestorage.app", messagingSenderId: "953819948776", appId: "1:953819948776:web:4e9a017a6c5fc10ed28b5d" };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 1. Kiểm tra đăng nhập
const studentName = localStorage.getItem("hocSinhLop4A");
if (!studentName) {
    alert("Hệ thống chưa nhận diện được học sinh! Vui lòng quay lại điểm danh.");
    window.location.href = "index.html";
} else {
    const display = document.getElementById("student-display");
    if(display) display.innerText = studentName;
}

// 2. Xử lý đồng hồ
let seconds = 0;
let timerInterval = setInterval(() => {
    seconds++;
    let m = Math.floor(seconds / 60).toString().padStart(2, '0');
    let s = (seconds % 60).toString().padStart(2, '0');
    const timer = document.getElementById("timer");
    if(timer) timer.innerText = `${m}:${s}`;
}, 1000);

// 3. Hàm nộp bài
window.nopBai = async function() {
    // Dừng đồng hồ & Khóa nút
    clearInterval(timerInterval); 
    const btn = document.getElementById("btn-nop");
    btn.disabled = true;
    btn.innerText = "Đang gửi dữ liệu..."; // Thông báo đang gửi
    btn.style.opacity = "0.7";

    const tieuDe = document.getElementById("ten-bai-tap").innerText;
    const questionBlocks = document.querySelectorAll(".question-block");
    let score = 0;
    let total = questionBlocks.length;

    // Chấm điểm ngầm
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
        // Gửi Firebase
        await addDoc(collection(db, "KET_QUA_TONG_HOP"), {
            hoc_sinh: studentName,
            bai_tap: tieuDe,
            diem: diemSo,
            so_cau_dung: score,
            tong_so_cau: total,
            thoi_gian_lam: seconds,
            ngay_nop: serverTimestamp()
        });

        // Hiện bảng kết quả
        hienThiKetQua(diemSo, score, total);

    } catch (e) {
        alert("Lỗi mạng: " + e.message);
        btn.disabled = false;
        btn.innerText = "NỘP BÀI LẠI";
        timerInterval = setInterval(() => { seconds++; }, 1000); 
    }
};

// 4. Hàm hiển thị Popup Kết quả
function hienThiKetQua(diem, dung, tong) {
    const div = document.createElement("div");
    div.id = "result-popup"; // Đặt ID để tí nữa ẩn đi được
    div.className = "result-overlay";
    div.innerHTML = `
        <div class="result-box">
            <h3 style="color:#16a34a">✅ ĐÃ NỘP BÀI XONG!</h3>
            <div class="result-score">${diem.toFixed(1)}</div>
            <div class="result-info">
                Bạn làm đúng <strong>${dung}/${tong}</strong> câu.<br>
                Thời gian: <strong>${formatTime(seconds)}</strong>
            </div>
            <div class="btn-group-result">
                <button class="btn-review" onclick="xemLaiBai()">🔍 Xem lại bài & Đáp án</button>
                <button class="btn-continue" onclick="window.location.href='Menu.html'">➜ Làm môn khác</button>
                <button class="btn-finish" onclick="window.location.href='index.html'">✘ Thoát</button>
            </div>
        </div>
    `;
    document.body.appendChild(div);
}

// 5. CHỨC NĂNG XEM LẠI BÀI (MỚI)
window.xemLaiBai = function() {
    // A. Ẩn bảng kết quả đi
    const popup = document.getElementById("result-popup");
    if(popup) popup.style.display = "none";

    // B. Ẩn nút nộp bài cũ đi
    const btnNop = document.getElementById("btn-nop");
    if(btnNop) btnNop.style.display = "none";

    // C. Duyệt từng câu hỏi để tô màu
    const questionBlocks = document.querySelectorAll(".question-block");
    
    questionBlocks.forEach(block => {
        const inputs = block.querySelectorAll("input[type='radio']");
        
        inputs.forEach(input => {
            // Khóa không cho chọn lại
            input.disabled = true;
            
            const parentLabel = input.parentElement; // Lấy thẻ Label bao quanh

            // 1. Nếu đây là đáp án ĐÚNG -> Tô xanh
            if (input.getAttribute("data-correct") === "true") {
                parentLabel.classList.add("res-correct");
            }

            // 2. Nếu đây là đáp án SAI mà học sinh ĐÃ CHỌN -> Tô đỏ
            if (input.checked && input.getAttribute("data-correct") !== "true") {
                parentLabel.classList.add("res-wrong");
            }
        });
    });

    // D. Cuộn lên đầu trang
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // E. Thêm nút "Quay về Menu" ở cuối trang (thay cho nút nộp)
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
