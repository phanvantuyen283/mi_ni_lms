// core.js - PHIÊN BẢN v4 (CHỈ LƯU ĐIỂM CAO NHẤT)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

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

// 3. Hàm nộp bài THÔNG MINH
window.nopBai = async function() {
    // Dừng đồng hồ & Khóa nút
    clearInterval(timerInterval); 
    const btn = document.getElementById("btn-nop");
    btn.disabled = true;
    btn.innerText = "Đang kiểm tra dữ liệu...";
    btn.style.opacity = "0.7";

    const tieuDe = document.getElementById("ten-bai-tap").innerText;
    const questionBlocks = document.querySelectorAll(".question-block");
    let score = 0;
    let total = questionBlocks.length;

    // Chấm điểm
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
        // --- LOGIC MỚI: KIỂM TRA ĐIỂM CŨ ---
        // 1. Tìm xem học sinh này đã làm bài này chưa
        const q = query(
            collection(db, "KET_QUA_TONG_HOP"), 
            where("hoc_sinh", "==", studentName),
            where("bai_tap", "==", tieuDe)
        );
        const querySnapshot = await getDocs(q);

        let isNewRecord = false; // Cờ đánh dấu xem có phải kỷ lục mới không
        let oldScore = -1;

        if (!querySnapshot.empty) {
            // Đã từng làm bài này rồi
            const oldDoc = querySnapshot.docs[0]; // Lấy bài làm cũ
            oldScore = oldDoc.data().diem;

            if (diemSo > oldScore) {
                // ĐIỂM MỚI CAO HƠN -> Cập nhật đè lên bài cũ
                await setDoc(doc(db, "KET_QUA_TONG_HOP", oldDoc.id), {
                    hoc_sinh: studentName,
                    bai_tap: tieuDe,
                    diem: diemSo,
                    so_cau_dung: score,
                    tong_so_cau: total,
                    thoi_gian_lam: seconds,
                    ngay_nop: serverTimestamp()
                });
                isNewRecord = true;
            } else {
                // ĐIỂM MỚI THẤP HƠN HOẶC BẰNG -> Không lưu
                // Chỉ hiển thị kết quả cho học sinh xem thôi
                isNewRecord = false; 
            }
        } else {
            // Chưa làm bao giờ -> Lưu mới
            await addDoc(collection(db, "KET_QUA_TONG_HOP"), {
                hoc_sinh: studentName,
                bai_tap: tieuDe,
                diem: diemSo,
                so_cau_dung: score,
                tong_so_cau: total,
                thoi_gian_lam: seconds,
                ngay_nop: serverTimestamp()
            });
            isNewRecord = true;
        }

        // Hiện bảng kết quả (Kèm thông báo kỷ lục)
        hienThiKetQua(diemSo, score, total, isNewRecord, oldScore);

    } catch (e) {
        alert("Lỗi mạng: " + e.message);
        btn.disabled = false;
        btn.innerText = "NỘP BÀI LẠI";
        timerInterval = setInterval(() => { seconds++; }, 1000); 
    }
};

// 4. Hàm hiển thị Popup Kết quả (Có xử lý thông báo Kỷ lục)
function hienThiKetQua(diem, dung, tong, isNewRecord, oldScore) {
    let msgTitle = "";
    let msgColor = "";

    if (oldScore === -1) {
        // Làm lần đầu
        msgTitle = "✅ ĐÃ NỘP BÀI THÀNH CÔNG!";
        msgColor = "#16a34a"; // Xanh lá
    } else if (isNewRecord) {
        // Phá kỷ lục
        msgTitle = "🏆 TUYỆT VỜI! KỶ LỤC MỚI!";
        msgColor = "#ea580c"; // Cam đậm
    } else {
        // Không phá được kỷ lục
        msgTitle = `⚠️ ĐIỂM CHƯA VƯỢT QUA KỶ LỤC CŨ (${oldScore.toFixed(1)})`;
        msgColor = "#64748b"; // Xám
    }

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
            
            ${!isNewRecord && oldScore !== -1 ? "<p style='color:red; font-size:13px; font-style:italic'>(Kết quả này thấp hơn lần trước nên sẽ không được lưu)</p>" : ""}

            <div class="btn-group-result">
                <button class="btn-review" onclick="xemLaiBai()">🔍 Xem lại bài & Đáp án</button>
                <button class="btn-continue" onclick="window.location.href='Menu.html'">➜ Làm môn khác</button>
                <button class="btn-finish" onclick="window.location.href='index.html'">✘ Thoát</button>
            </div>
        </div>
    `;
    document.body.appendChild(div);
}

// 5. CHỨC NĂNG XEM LẠI BÀI
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
            if (input.getAttribute("data-correct") === "true") {
                parentLabel.classList.add("res-correct");
            }
            if (input.checked && input.getAttribute("data-correct") !== "true") {
                parentLabel.classList.add("res-wrong");
            }
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
