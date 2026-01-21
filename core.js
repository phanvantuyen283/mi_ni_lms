/* ============================================================
   CORE.JS - TRÁI TIM HỆ THỐNG MINI LMS V4.0
   Nhiệm vụ: Chấm điểm, Đếm giờ, Lưu trữ, Bảo mật
   ============================================================ */

// --- 1. KHỞI TẠO BIẾN TOÀN CỤC ---
let db = null; // Biến kết nối cơ sở dữ liệu
let studentName = localStorage.getItem("hocSinhLop4A") || "Khách";
let timerInterval;
let isSubmitted = false;
let totalSeconds = 0;
let securityCorrectAnswer = null; // Lưu đáp án bảo mật từ server

// --- 2. KẾT NỐI FIREBASE AN TOÀN ---
// Đoạn này đảm bảo dù file config lỗi thì trang web không bị trắng xóa
try {
    if (typeof CONFIG === 'undefined') {
        console.error("❌ LỖI: Thiếu file config.js. Hệ thống sẽ chạy ở chế độ Offline.");
    } else if (typeof firebase === 'undefined') {
        console.error("❌ LỖI: Thiếu thư viện Firebase. Hệ thống sẽ chạy ở chế độ Offline.");
    } else {
        // Chỉ khởi tạo nếu chưa có app nào chạy
        if (!firebase.apps.length) {
            firebase.initializeApp(CONFIG.firebase);
        }
        db = firebase.firestore();
        console.log("✅ Core V4: Kết nối Database thành công.");
    }
} catch (e) {
    console.error("⚠️ Cảnh báo: Không kết nối được Firebase.", e);
}

// --- 3. KHI TRANG WEB TẢI XONG ---
document.addEventListener("DOMContentLoaded", async () => {
    // 3.1. Hiển thị tên học sinh
    const display = document.getElementById("student-display");
    if (display) display.innerText = studentName;

    // 3.2. Cảnh báo nếu chưa đăng nhập
    if (studentName === "Khách") {
        // Tạo một thông báo nhỏ góc màn hình thay vì alert khó chịu
        console.warn("⚠️ Đang truy cập với tư cách Khách.");
    }

    // 3.3. Tải câu hỏi bảo mật (Nếu có)
    await loadSecurityQuestion();

    // 3.4. Bắt đầu tính giờ
    startTimer();
});

// --- 4. HÀM TẢI CÂU HỎI BẢO MẬT ---
async function loadSecurityQuestion() {
    const container = document.querySelector(".security-quest");
    if (!container || !db) return; // Không có chỗ chứa hoặc không có mạng thì bỏ qua

    try {
        const doc = await db.collection("BAO_MAT").doc("cau_hoi_ngay").get();
        if (doc.exists) {
            const data = doc.data();
            // Nếu giáo viên có đặt câu hỏi
            if (data.question && data.question.trim() !== "") {
                securityCorrectAnswer = data.answer ? data.answer.trim().toLowerCase() : "";
                
                // Vẽ giao diện câu hỏi bảo mật
                let html = `
                    <div class="question-text" style="color:#be123c">🔒 <b>CÂU HỎI BẢO MẬT:</b> ${data.question}</div>
                    <div class="input-group" style="margin-top:10px">
                        <input type="text" id="sec-answer-input" placeholder="Nhập câu trả lời..." class="security-input" autocomplete="off">
                    </div>
                    <p style="font-size:12px; color:#666; margin-top:5px"><i>* Trả lời đúng câu này mới được nộp bài.</i></p>
                `;
                container.innerHTML = html;
                container.style.display = "block"; // Hiện lên
                container.style.border = "2px dashed #f43f5e";
                container.style.background = "#fff1f2";
            } else {
                container.style.display = "none"; // Ẩn đi nếu không có câu hỏi
            }
        }
    } catch (e) {
        console.log("Lỗi tải security:", e);
        container.style.display = "none";
    }
}

// --- 5. ĐỒNG HỒ TÍNH GIỜ ---
function startTimer() {
    // Ưu tiên lấy thời gian từ biến toàn cục (nếu giáo viên cài trong script bài thi)
    // Nếu không có thì đếm xuôi (00:00 -> tăng dần)
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
                nopBai(true); // Nộp cưỡng ép
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
            if (isCountDown && showMin < 2) timerEl.style.color = "red"; // Đỏ khi còn dưới 2 phút
        }
    }, 1000);
}

// --- 6. HÀM NỘP BÀI (QUAN TRỌNG NHẤT) ---
// Gán vào window để file HTML chắc chắn gọi được
window.nopBai = async function(force = false) {
    if (isSubmitted) return; 

    // 6.1. Kiểm tra bảo mật (Nếu không phải nộp ép)
    if (!force && securityCorrectAnswer) {
        const userAns = document.getElementById("sec-answer-input").value.trim().toLowerCase();
        if (userAns !== securityCorrectAnswer) {
            alert("⛔ BẠN CHƯA TRẢ LỜI ĐÚNG CÂU HỎI BẢO MẬT!\nHãy nhập đúng để xác nhận bạn là học sinh lớp 4A.");
            document.getElementById("sec-answer-input").focus();
            return;
        }
    }

    // 6.2. Xác nhận nộp
    if (!force && !confirm("Con đã kiểm tra kỹ và muốn nộp bài chưa?")) return;

    // 6.3. Khóa hệ thống
    isSubmitted = true;
    clearInterval(timerInterval);
    const btn = document.getElementById("btn-nop");
    if(btn) {
        btn.disabled = true;
        btn.innerText = "ĐANG CHẤM ĐIỂM...";
        btn.style.opacity = "0.7";
        btn.style.cursor = "not-allowed";
    }

    // 6.4. Chấm điểm logic
    let correctCount = 0;
    // Chỉ chọn các câu hỏi trắc nghiệm (bỏ qua câu bảo mật)
    const blocks = document.querySelectorAll(".question-block:not(.security-quest)");
    const total = blocks.length;

    blocks.forEach(block => {
        const checked = block.querySelector("input:checked");
        // Kiểm tra đáp án có data-correct="true"
        if (checked && checked.getAttribute("data-correct") === "true") {
            correctCount++;
        }
    });

    let score = total === 0 ? 0 : (correctCount / total) * 10;
    score = Number(score.toFixed(1)); // Làm tròn 1 số thập phân

    // 6.5. Lưu Firebase (Chỉ chạy nếu có mạng và db)
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
                ngay_nop: firebase.firestore.FieldValue.serverTimestamp() // Dùng giờ server cho chuẩn
            });
            console.log("💾 Đã lưu điểm lên mây.");
        } catch (e) {
            console.error("Lỗi lưu điểm (Mất mạng?):", e);
            // Không alert lỗi để tránh làm học sinh hoang mang, vẫn hiện điểm bình thường
        }
    }

    // 6.6. Hiện kết quả
    hienThiPopup(score, correctCount, total);
    
    // Hiệu ứng ăn mừng
    if (score >= 5 && typeof confetti !== 'undefined') confetti();
    
    // Đọc lời chúc
    docLoiChuc(score);
};

// --- 7. HIỆN POPUP KẾT QUẢ ---
function hienThiPopup(diem, dung, tong) {
    // Xóa popup cũ nếu có
    const old = document.querySelector(".result-overlay");
    if(old) old.remove();

    const div = document.createElement("div");
    div.className = "result-overlay";
    // Inline style để đảm bảo hiện đẹp ngay cả khi CSS chưa load kịp
    div.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:99999; display:flex; justify-content:center; align-items:center; animation: fadeIn 0.3s;";
    
    let color = diem >= 5 ? "#16a34a" : "#dc2626"; // Xanh hoặc Đỏ
    let emoji = diem >= 9 ? "🏆" : (diem >= 5 ? "👍" : "💪");

    div.innerHTML = `
        <div class="result-box" style="background:white; padding:30px; border-radius:20px; text-align:center; width:90%; max-width:400px; border-top: 6px solid ${color}; box-shadow: 0 20px 50px rgba(0,0,0,0.3);">
            <h3 style="margin:0 0 10px 0; text-transform:uppercase; color:${color}; font-size:1.2rem">KẾT QUẢ BÀI LÀM</h3>
            <div style="font-size:5rem; font-weight:900; color:${color}; margin:10px 0; line-height:1">${diem}</div>
            <p style="font-size:1.1rem; color:#475569;">Đúng <b>${dung}/${tong}</b> câu ${emoji}</p>
            
            <div style="margin-top:25px; display:flex; flex-direction:column; gap:10px;">
                <button onclick="xemLoiGiai()" style="padding:12px; background:#f59e0b; color:white; border:none; border-radius:10px; font-weight:bold; cursor:pointer; font-size:16px; box-shadow: 0 4px 0 #b45309;">🔍 Xem Lời Giải Chi Tiết</button>
                <button onclick="window.location.href='Menu.html'" style="padding:12px; background:#334155; color:white; border:none; border-radius:10px; font-weight:bold; cursor:pointer; font-size:16px;">➜ Quay Về Menu</button>
            </div>
        </div>
    `;
    document.body.appendChild(div);
}

// --- 8. CHẾ ĐỘ XEM LỜI GIẢI (REVIEW) ---
window.xemLoiGiai = function() {
    // Ẩn popup
    const overlay = document.querySelector(".result-overlay");
    if(overlay) overlay.style.display = "none";
    
    // Ẩn nút nộp
    const btnNop = document.getElementById("btn-nop");
    if(btnNop) btnNop.style.display = "none";

    // Duyệt qua từng câu hỏi
    document.querySelectorAll(".question-block:not(.security-quest)").forEach(block => {
        const inputs = block.querySelectorAll("input");
        let explainText = "";

        inputs.forEach(input => {
            input.disabled = true; // Khóa không cho chọn lại
            
            // Xử lý hiển thị màu sắc
            if (input.getAttribute("data-correct") === "true") {
                // Đây là đáp án ĐÚNG -> Tô xanh
                input.parentElement.style.backgroundColor = "#dcfce7"; 
                input.parentElement.style.border = "2px solid #22c55e";
                input.parentElement.style.color = "#14532d";
                input.parentElement.classList.add("res-correct"); // Thêm class cho CSS xử lý icon check
                
                explainText = input.getAttribute("data-explain");
            } 
            else if (input.checked) {
                // Đây là đáp án SAI mà học sinh đã chọn -> Tô đỏ
                input.parentElement.style.backgroundColor = "#fee2e2";
                input.parentElement.style.border = "2px solid #ef4444";
                input.parentElement.style.color = "#991b1b";
                input.parentElement.classList.add("res-wrong");
            }
        });

        // Thêm khung giải thích bên dưới câu hỏi
        if (explainText) {
            const expDiv = document.createElement("div");
            expDiv.innerHTML = `💡 <b>Giải thích:</b> ${explainText}`;
            // Style trực tiếp để đảm bảo đẹp
            expDiv.style.cssText = "margin-top:15px; padding:15px; background:#fff7ed; border-left:5px solid #f97316; color:#c2410c; font-size:0.95rem; border-radius: 4px;";
            block.appendChild(expDiv);
        }
    });

    // Cuộn màn hình lên đầu để học sinh xem từ câu 1
    window.scrollTo({top: 0, behavior: 'smooth'});
};

// --- 9. TIỆN ÍCH: ĐỌC LỜI CHÚC ---
function docLoiChuc(diem) {
    if ('speechSynthesis' in window) {
        let text = "";
        if (diem == 10) text = "Tuyệt vời! Con làm đúng hết rồi. Chúc mừng con!";
        else if (diem >= 8) text = `Giỏi lắm! Con được ${diem} điểm.`;
        else if (diem >= 5) text = `Khá tốt. Con được ${diem} điểm. Cố gắng thêm nhé.`;
        else text = `Lần sau cẩn thận hơn nhé. Con được ${diem} điểm.`;

        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'vi-VN'; 
        utterance.rate = 0.9; // Đọc chậm rãi
        window.speechSynthesis.speak(utterance);
    }
}
