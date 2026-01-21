/* core.js - PHIÊN BẢN CỨU HỘ V3 (FIX LỖI LIỆT NÚT) */

// 1. CẤU HÌNH TÍCH HỢP SẴN (Không cần file config.js nữa để tránh lỗi)
const SYSTEM_CONFIG = {
    apiKey: "AIzaSyA77lLi_JCLIdR535KEfg3S0_Ge2EorPMo",
    authDomain: "baikiemtracuoiki.firebaseapp.com",
    projectId: "baikiemtracuoiki",
    storageBucket: "baikiemtracuoiki.firebasestorage.app",
    messagingSenderId: "953819948776",
    appId: "1:953819948776:web:4e9a017a6c5fc10ed28b5d"
};

// 2. KHỞI TẠO FIREBASE AN TOÀN (Bọc trong Try-Catch để không làm chết trang web)
let db = null;
try {
    if (typeof firebase !== 'undefined') {
        if (!firebase.apps.length) {
            firebase.initializeApp(SYSTEM_CONFIG);
        }
        db = firebase.firestore();
        console.log("✅ Kết nối Firebase thành công!");
    } else {
        console.error("⚠️ Chưa tải thư viện Firebase trong file HTML.");
    }
} catch (e) {
    console.error("❌ Lỗi khởi tạo Firebase:", e);
    // Code vẫn chạy tiếp để tính điểm offline
}

// 3. BIẾN TOÀN CỤC
let studentName = localStorage.getItem("hocSinhLop4A") || "Khách";
let timerInterval;
let isSubmitted = false;
let totalSeconds = 0;

// 4. TỰ ĐỘNG CHẠY KHI TRANG TẢI XONG
document.addEventListener("DOMContentLoaded", () => {
    // Hiển thị tên
    const display = document.getElementById("student-display");
    if (display) display.innerText = studentName;
    
    // Cảnh báo nếu chưa đăng nhập
    if (studentName === "Khách" && !window.location.href.includes("index.html")) {
        alert("⚠️ Bạn chưa đăng nhập! Kết quả có thể không được lưu.");
    }

    // Bắt đầu đếm giờ
    startTimer();
});

// 5. ĐỒNG HỒ TÍNH GIỜ
function startTimer() {
    // Kiểm tra xem có giới hạn thời gian từ HTML không
    let timeLimit = window.serverTimeLimit || 0; 

    timerInterval = setInterval(() => {
        totalSeconds++;
        
        // Xử lý hiển thị phút:giây
        let showSec = 0;
        let showMin = 0;
        let isCountDown = false;

        if (timeLimit > 0) {
            // Đếm ngược
            let remaining = timeLimit - totalSeconds;
            if (remaining <= 0) {
                clearInterval(timerInterval);
                alert("⏰ HẾT GIỜ! Hệ thống tự động thu bài.");
                nopBai(true); // Nộp cưỡng ép
                return;
            }
            showMin = Math.floor(remaining / 60);
            showSec = remaining % 60;
            isCountDown = true;
        } else {
            // Đếm xuôi
            showMin = Math.floor(totalSeconds / 60);
            showSec = totalSeconds % 60;
        }

        // Cập nhật lên màn hình
        const timerEl = document.getElementById("timer");
        if(timerEl) {
            timerEl.innerText = `${showMin.toString().padStart(2, '0')}:${showSec.toString().padStart(2, '0')}`;
            if (isCountDown && showMin < 1) timerEl.style.color = "red";
        }
    }, 1000);
}

// 6. HÀM NỘP BÀI (QUAN TRỌNG NHẤT)
// Gán vào window để file HTML chắc chắn gọi được
window.nopBai = async function(force = false) {
    console.log("🖱️ Đã bấm nút nộp bài..."); // Log kiểm tra
    
    if (isSubmitted) return; // Chặn bấm nhiều lần

    // Hỏi xác nhận (trừ khi hết giờ)
    if (!force && !confirm("Con có chắc chắn muốn nộp bài không?")) return;

    // Khóa hệ thống
    isSubmitted = true;
    clearInterval(timerInterval);
    const btn = document.getElementById("btn-nop");
    if(btn) {
        btn.disabled = true;
        btn.innerText = "ĐANG CHẤM...";
        btn.style.opacity = "0.7";
    }

    // --- A. CHẤM ĐIỂM ---
    let correctCount = 0;
    const blocks = document.querySelectorAll(".question-block");
    const total = blocks.length;

    blocks.forEach(block => {
        const checked = block.querySelector("input:checked");
        // Kiểm tra đáp án đúng (có data-correct="true")
        if (checked && checked.getAttribute("data-correct") === "true") {
            correctCount++;
        }
    });

    let score = total === 0 ? 0 : (correctCount / total) * 10;
    score = Number(score.toFixed(1));

    // --- B. LƯU FIREBASE (Nếu có mạng & db không lỗi) ---
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
            console.log("💾 Đã lưu kết quả.");
        } catch (e) {
            console.error("⚠️ Không lưu được điểm (Lỗi mạng/DB):", e);
            alert("Lưu ý: Không lưu được kết quả lên hệ thống do lỗi mạng. Hãy chụp ảnh màn hình điểm số!");
        }
    } else {
        console.warn("⚠️ Database chưa kết nối, chỉ chấm điểm tại chỗ.");
    }

    // --- C. HIỆN KẾT QUẢ ---
    hienThiPopup(score, correctCount, total);
    
    // Hiệu ứng pháo giấy
    if (score >= 5 && typeof confetti !== 'undefined') confetti();
};

// 7. HIỂN THỊ POPUP
function hienThiPopup(diem, dung, tong) {
    // Xóa popup cũ
    const old = document.querySelector(".result-overlay");
    if(old) old.remove();

    const div = document.createElement("div");
    div.className = "result-overlay";
    // Inline style để đảm bảo hiện đẹp dù chưa load CSS
    div.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:99999; display:flex; justify-content:center; align-items:center;";
    
    div.innerHTML = `
        <div class="result-box" style="background:white; padding:30px; border-radius:20px; text-align:center; width:90%; max-width:400px; border-top: 6px solid #22c55e; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
            <h3 style="color:#15803d; margin:0 0 10px 0; text-transform:uppercase;">Kết Quả Bài Làm</h3>
            <div style="font-size:4.5rem; font-weight:900; color:#ea580c; margin:10px 0; line-height:1;">${diem}</div>
            <p style="font-size:1.1rem; color:#475569;">Đúng <b>${dung}/${tong}</b> câu</p>
            <div style="margin-top:20px; display:flex; flex-direction:column; gap:10px;">
                <button onclick="xemLoiGiai()" style="padding:12px; background:#f59e0b; color:white; border:none; border-radius:8px; font-weight:bold; cursor:pointer;">🔍 Xem Lời Giải & Đáp Án</button>
                <button onclick="window.location.href='Menu.html'" style="padding:12px; background:#15803d; color:white; border:none; border-radius:8px; font-weight:bold; cursor:pointer;">➜ Quay Về Menu</button>
            </div>
        </div>
    `;
    document.body.appendChild(div);
}

// 8. CHẾ ĐỘ XEM LỜI GIẢI (REVIEW)
window.xemLoiGiai = function() {
    const overlay = document.querySelector(".result-overlay");
    if(overlay) overlay.style.display = "none";
    
    const btnNop = document.getElementById("btn-nop");
    if(btnNop) btnN
