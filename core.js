/* core.js - PHIÊN BẢN V4 (FINAL STABLE) */

// --- 1. BIẾN TOÀN CỤC & KẾT NỐI ---
let db = null;
let studentName = localStorage.getItem("hocSinhLop4A") || "Khách";
let timerInterval;
let isSubmitted = false;
let totalSeconds = 0;

// Khởi tạo Firebase an toàn (bọc trong try-catch)
try {
    if (typeof firebase !== 'undefined' && typeof CONFIG !== 'undefined') {
        if (!firebase.apps.length) {
            firebase.initializeApp(CONFIG.firebase);
        }
        db = firebase.firestore();
        console.log("✅ Kết nối Firebase thành công.");
    } else {
        console.warn("⚠️ Chưa tải Firebase hoặc thiếu file config.js. Chế độ Offline được kích hoạt.");
    }
} catch (e) {
    console.error("❌ Lỗi khởi tạo Firebase:", e);
}

// --- 2. TỰ ĐỘNG CHẠY KHI MỞ TRANG ---
document.addEventListener("DOMContentLoaded", () => {
    // Hiển thị tên học sinh
    const display = document.getElementById("student-display");
    if (display) display.innerText = studentName;

    // Cảnh báo nếu chưa đăng nhập
    if (studentName === "Khách") {
        console.log("⚠️ Đang chạy chế độ khách.");
    }

    // Bắt đầu tính giờ
    startTimer();
});

// --- 3. ĐỒNG HỒ TÍNH GIỜ ---
function startTimer() {
    let timeLimit = window.serverTimeLimit || 0; 

    timerInterval = setInterval(() => {
        totalSeconds++;
        
        let showMin = 0, showSec = 0;
        let isCountDown = false;

        if (timeLimit > 0) {
            let remaining = timeLimit - totalSeconds;
            if (remaining <= 0) {
                clearInterval(timerInterval);
                alert("⏰ HẾT GIỜ! Hệ thống tự động thu bài.");
                nopBai(true); 
                return;
            }
            showMin = Math.floor(remaining / 60);
            showSec = remaining % 60;
            isCountDown = true;
        } else {
            showMin = Math.floor(totalSeconds / 60);
            showSec = totalSeconds % 60;
        }

        const timerEl = document.getElementById("timer");
        if(timerEl) {
            timerEl.innerText = `${showMin.toString().padStart(2, '0')}:${showSec.toString().padStart(2, '0')}`;
            if (isCountDown && showMin < 1) timerEl.style.color = "red";
        }
    }, 1000);
}

// --- 4. HÀM NỘP BÀI (QUAN TRỌNG) ---
// Định nghĩa trực tiếp vào window để tránh lỗi scope
window.nopBai = async function(force = false) {
    if (isSubmitted) return; 

    if (!force && !confirm("Con chắc chắn muốn nộp bài chứ?")) return;

    // Khóa nút ngay lập tức
    isSubmitted = true;
    clearInterval(timerInterval);
    const btn = document.getElementById("btn-nop");
    if(btn) {
        btn.disabled = true;
        btn.innerText = "ĐANG CHẤM...";
        btn.style.opacity = "0.7";
    }

    // A. Chấm điểm
    let correctCount = 0;
    const blocks = document.querySelectorAll(".question-block");
    const total = blocks.length;

    blocks.forEach(block => {
        const checked = block.querySelector("input:checked");
        if (checked && checked.getAttribute("data-correct") === "true") {
            correctCount++;
        }
    });

    let score = total === 0 ? 0 : (correctCount / total) * 10;
    score = Number(score.toFixed(1));

    // B. Lưu Firebase (Nếu DB kết nối tốt)
    const title = document.getElementById("ten-bai-tap") ? document.getElementById("ten-bai-tap").innerText : "Bài Tập";
    
    if (db) {
        try {
            await db.collection("KET_QUA_TONG_HOP").add({
                hoc_sinh: studentName,
                bai_tap: title,
                diem: score,
                so_cau_dung: correctCount,
                tong_so_cau: total,
                thoi_gian_lam: totalSeconds,
                ngay_nop: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (e) {
            console.error("Lỗi lưu điểm (Mất mạng?):", e);
        }
    }

    // C. Hiện kết quả
    hienThiPopup(score, correctCount, total);
    if (score >= 5 && typeof confetti !== 'undefined') confetti();
};

// --- 5. HIỆN POPUP KẾT QUẢ ---
function hienThiPopup(diem, dung, tong) {
    const old = document.querySelector(".result-overlay");
    if(old) old.remove();

    const div = document.createElement("div");
    div.className = "result-overlay";
    div.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:99999; display:flex; justify-content:center; align-items:center;";
    
    div.innerHTML = `
        <div class="result-box" style="background:white; padding:30px; border-radius:20px; text-align:center; width:90%; max-width:400px; border-top: 6px solid #22c55e;">
            <h3 style="margin:0 0 10px 0; text-transform:uppercase; color:#15803d;">KẾT QUẢ</h3>
            <div style="font-size:4rem; font-weight:900; color:#ea580c; margin:10px 0;">${diem}</div>
            <p>Đúng <b>${dung}/${tong}</b> câu</p>
            <div style="margin-top:20px; display:flex; flex-direction:column; gap:10px;">
                <button onclick="xemLoiGiai()" style="padding:12px; background:#f59e0b; color:white; border:none; border-radius:8px; font-weight:bold; cursor:pointer;">🔍 Xem Lời Giải</button>
                <button onclick="window.location.href='Menu.html'" style="padding:12px; background:#15803d; color:white; border:none; border-radius:8px; font-weight:bold; cursor:pointer;">➜ Quay Về Menu</button>
            </div>
        </div>
    `;
    document.body.appendChild(div);
}

// --- 6. XEM LỜI GIẢI ---
window.xemLoiGiai = function() {
    const overlay = document.querySelector(".result-overlay");
    if(overlay) overlay.style.display = "none";
    
    const btnNop = document.getElementById("btn-nop");
    if(btnNop) btnNop.style.display = "none";

    document.querySelectorAll(".question-block").forEach(block => {
        const inputs = block.querySelectorAll("input");
        let explainText = "";

        inputs.forEach(input => {
            input.disabled = true;
            if (input.getAttribute("data-correct") === "true") {
                input.parentElement.style.backgroundColor = "#dcfce7"; 
                input.parentElement.style.border = "2px solid #22c55e";
                input.parentElement.style.color = "#14532d";
                explainText = input.getAttribute("data-explain");
            } else if (input.checked) {
                input.parentElement.style.backgroundColor = "#fee2e2";
                input.parentElement.style.border = "2px solid #ef4444";
            }
        });

        if (explainText) {
            const expDiv = document.createElement("div");
            expDiv.innerHTML = `💡 <b>Giải thích:</b> ${explainText}`;
            expDiv.style.cssText = "margin-top:10px; padding:12px; background:#fff7ed; border-left:4px solid #f97316; color:#c2410c; font-size:0.95rem;";
            block.appendChild(expDiv);
        }
    });
    window.scrollTo({top: 0, behavior: 'smooth'});
};
