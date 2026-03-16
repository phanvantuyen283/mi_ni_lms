/* ============================================================
   DE_GDTC_B1.JS - ĐỘNG TÁC VƯƠN THỞ VỚI VÒNG
   Nhiệm vụ: Ghi nhớ nhịp và thực hành đúng tư thế
   ============================================================ */

const currentSubject = "Giáo dục thể chất";
const EXAM_STRUCTURE = [
    // 1. Kiểm tra kiến thức về kỹ thuật hít thở (System)
   {
      id: "t0",
      type: "system",
      question: " Hãy xem video hướng dẫn sau",
      youtube_url:"https://www.youtube.com/eHgLwKK1dHA?si",
      option:[""],
      max_score: 0
    },
         
    {
        id: "t1",
        type: "system",
        question: "Câu 1: Ở động tác vươn thở với vòng, tại Nhịp 1 và Nhịp 3, em cần thực hiện hít thở như thế nào?",
        options: [
            "Thở ra từ từ bằng miệng", 
            "Hít sâu vào bằng mũi", 
            "Nín thở", 
            "Hít vào bằng miệng"
        ],
        answer: "Hít sâu vào bằng mũi",
        max_score: 2
    },

    // 2. Phân tích tư thế tay và chân (System)
    {
        id: "t2",
        type: "system",
        question: "Câu 2: Tại Nhịp 2 của động tác vươn thở, tư thế tay và chân của em như thế nào là đúng?",
        options: [
            "Chân trái bước sang ngang, hai tay đưa lên cao chếch chữ V", 
            "Hai tay hạ xuống cầm vòng phía trước dọc theo thân, thở ra từ từ bằng miệng", 
            "Về tư thế chuẩn bị, hít sâu vào bằng mũi", 
            "Chân phải bước sang ngang, hai tay đưa sang ngang"
        ],
        answer: "Hai tay hạ xuống cầm vòng phía trước dọc theo thân, thở ra từ từ bằng miệng",
        max_score: 2
    },

    // 3. Mô tả trình tự thực hiện (AI)
    {
        id: "t3",
        type: "ai",
        question: "Câu 3: Em hãy mô tả lại cách thực hiện nhịp 1 của động tác vươn thở với vòng. Cần lưu ý điều gì về hướng lòng bàn tay và đầu?",
        rubric: "- Nêu đúng việc bước chân trái sang ngang rộng bằng vai (1đ)\n- Mô tả đúng tư thế tay cầm vòng đưa sang ngang - lên cao chếch chữ V (2đ)\n- Nêu đúng lòng bàn tay hướng vào nhau và đầu ngửa (1đ)\n- Nhắc đến việc hít sâu vào bằng mũi (1đ).",
        max_score: 5
    },

    // 4. Thực hành quay video/chụp ảnh (Multimedia)
    {
        id: "t4",
        type: "multimedia",
        question: "Câu 4 (Thực hành): Em hãy thực hiện động tác vươn thở với vòng (từ nhịp 1 đến nhịp 4). Nhờ người thân chụp lại ảnh tư thế Nhịp 1 hoặc quay một đoạn video ngắn thực hiện động tác này và gửi lên đây nhé.",
        max_score: 5
    },

    // 5. Tự đánh giá mức độ hoàn thành (AI)
    {
        id: "t5",
        type: "ai",
        question: "Câu 5: Sau khi thực hiện động tác, em cảm thấy mình đã làm tốt ở nhịp nào nhất và nhịp nào em thấy khó thực hiện nhất khi cầm vòng? Vì sao?",
        rubric: "- Thể hiện thái độ tự giác tập luyện (1đ)\n- Chỉ ra được ưu/nhược điểm trong tư thế của bản thân (2đ)\n- Nêu được lý do khó khăn (vướng vòng, khó giữ thăng bằng...) (2đ).",
        max_score: 3
    }
];
