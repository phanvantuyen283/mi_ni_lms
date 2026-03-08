/* ============================================================
   DANH SÁCH CÂU HỎI: TOÁN 4 - CHIA CHO SỐ CÓ HAI CHỮ SỐ
   Mã môn: Toan | Phiên bản: V6.0
   ============================================================ */

const currentSubject = "Giáo dục thể chất";
const EXAM_STRUCTURE = [
    {
        id: "t1",
        type: "system",
        question: "Câu 1: Quy tắc quan trọng nhất khi hạ một chữ số xuống để chia là gì?",
        options: [
            "A. Chỉ chia khi số hạ xuống lớn hơn số chia.",
            "B. Mỗi lần hạ là một lần chia.",
            "C. Hạ hai số cùng lúc để chia cho nhanh.",
            "D. Không cần chia nếu số hạ xuống nhỏ hơn số chia."
        ],
        answer: "B. Mỗi lần hạ là một lần chia.",
        max_score: 0.5
    },
    {
        id: "t2",
        type: "system",
        question: "Câu 2: Khi hạ một chữ số xuống mà số đó nhỏ hơn số chia, ta phải viết chữ số nào vào thương?",
        options: [
            "A. Viết số 1",
            "B. Viết số 0",
            "C. Không viết gì cả",
            "D. Viết số dư"
        ],
        answer: "B. Viết số 0",
        max_score: 0.5
    },
    {
        id: "t3",
        type: "system",
        question: "Câu 3: Kết quả của phép tính 60 : (2 × 5) theo chiến thuật 'Chia liên tiếp' là:",
        options: [
            "A. 60 : 2 × 5 = 150",
            "B. 60 : 10 = 60",
            "C. 60 : 2 : 5 = 6",
            "D. 60 : 5 : 2 = 12"
        ],
        answer: "C. 60 : 2 : 5 = 6",
        max_score: 0.5
    },
    {
        id: "t4",
        type: "system",
        question: "Câu 4: Để tính nhanh biểu thức (24 × 48) : 12, cách nào sau đây là tối ưu nhất?",
        options: [
            "A. Lấy 24 nhân 48 trước rồi mới chia cho 12.",
            "B. Lấy (24 : 12) rồi nhân với 48.",
            "C. Lấy (48 : 12) rồi cộng với 24.",
            "D. Lấy 24 nhân (48 : 2)."
        ],
        answer: "B. Lấy (24 : 12) rồi nhân với 48.",
        max_score: 0.5
    },
    {
        id: "t5",
        type: "system",
        question: "Câu 5: Một sân bóng đá hình chữ nhật có diện tích 7140 m² và chiều rộng 68 m. Chiều dài của sân bóng là:",
        options: [
            "A. 15 m",
            "B. 100 m",
            "C. 105 m",
            "D. 150 m"
        ],
        answer: "C. 105 m",
        max_score: 0.5
    },
    {
        id: "t6",
        type: "system",
        question: "Câu 6: Tại sao trong phép chia 7140 : 68, học sinh dễ mắc lỗi ở lượt chia thứ hai?",
        options: [
            "A. Vì không biết bảng cửu chương.",
            "B. Vì quên viết chữ số 0 vào thương khi số bị chia nhỏ hơn số chia.",
            "C. Vì phép chia này có dư.",
            "D. Vì số chia quá lớn."
        ],
        answer: "B. Vì quên viết chữ số 0 vào thương khi số bị chia nhỏ hơn số chia.",
        max_score: 0.5
    },
    {
        id: "t7",
        type: "system",
        question: "Câu 7: Tính chu vi của sân bóng đá có chiều dài 105 m và chiều rộng 68 m:",
        options: [
            "A. 173 m",
            "B. 346 m",
            "C. 7140 m",
            "D. 340 m"
        ],
        answer: "B. 346 m",
        max_score: 0.5
    },
    {
        id: "t8",
        type: "system",
        question: "Câu 8: Chiến thuật 'Làm nhỏ số lớn' trong phép tính (a × b) : c có nghĩa là:",
        options: [
            "A. Thực hiện phép nhân trước cho số thật lớn.",
            "B. Thực hiện phép chia trước (nếu chia hết) để biểu thức gọn hơn.",
            "C. Bỏ bớt các chữ số ở hàng đơn vị.",
            "D. Chuyển phép nhân thành phép cộng."
        ],
        answer: "B. Thực hiện phép chia trước (nếu chia hết) để biểu thức gọn hơn.",
        max_score: 0.5
    },
    {
        id: "t9",
        type: "system",
        question: "Câu 9: Phép tính nào dưới đây có kết quả bằng 96?",
        options: [
            "A. (24 + 48) : 12",
            "B. (24 × 48) : 12",
            "C. 24 × (48 + 12)",
            "D. (48 - 24) × 12"
        ],
        answer: "B. (24 × 48) : 12",
        max_score: 0.5
    },
    {
        id: "t10",
        type: "system",
        question: "Câu 10: Điền số thích hợp vào chỗ trống: 90 : (3 × 3) = 90 : 3 : ...",
        options: [
            "A. 90",
            "B. 1",
            "C. 3",
            "D. 9"
        ],
        answer: "C. 3",
        max_score: 0.5
    },
    {
        id: "t11",
        type: "system",
        question: "Câu 11: Kích thước sân bóng (Dài 105m, Rộng 68m) đạt tiêu chuẩn của tổ chức nào?",
        options: [
            "A. FIFA (Tiêu chuẩn quốc tế)",
            "B. V-League",
            "C. Sân bóng trường học",
            "D. Sân bóng mini"
        ],
        answer: "A. FIFA (Tiêu chuẩn quốc tế)",
        max_score: 0.5
    },
    {
        id: "t12",
        type: "ai",
        question: "Câu 12: Khi thực hiện phép chia, nếu số dư cuối cùng lớn hơn số chia thì:",
        
        rubric: "nếu số dư cuối cùng lớn hơn số chia thì bỏ thương cũ ( 0.25 điểm) và hạ thương xuống 1 đơn vị (0.25 điểm)",
        max_score: 0.5
    },
    {
        id: "t13",
        type: "ai",
        question: "Câu 13 (Tự luận AI): Em hãy giải thích các bước thực hiện phép chia 7140 : 68. Tại sao ở lượt chia thứ hai ta lại viết 0 vào thương?",
        rubric: "- Nêu rõ lượt chia thứ nhất 71:68 được 1 dư 3 (1đ)\n- Nêu rõ lượt chia thứ hai hạ 4 được 34, vì 34 < 68 nên viết 0 vào thương (2đ)\n- Nêu rõ lượt chia cuối hạ 0 được 340:68 được 5 (1đ)\n- Kết luận kết quả 105 (0.5đ).",
        max_score: 4.5
    },
    {
        id: "t14",
        type: "multimedia",
        question: "Câu 14 (Chụp ảnh): Em hãy đặt tính rồi tính phép chia 8256 : 52 vào vở, sau đó chụp ảnh kết quả gửi thầy kiểm tra nhé.",
        max_score: 1.5
    }
];
