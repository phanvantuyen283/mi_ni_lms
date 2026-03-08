/* ============================================================
   DANH SÁCH CÂU HỎI: CÔNG NGHỆ 4 - LẮP GHÉP CÁI ĐU
   Nhiệm vụ: Kiểm tra quy trình thực hành và an toàn dụng cụ
   ============================================================ */

const currentSubject = "Công nghệ";
const EXAM_STRUCTURE = [
    {   youtube_url:"https://youtube.com/embed/WOoz9i9iHIk?si",
        id: "t1",
        type: "system",
        question: "Câu 1: Để lắp ghép mô hình cái đu, bộ dụng cụ nào dưới đây là không thể thiếu?",
        options: [
            "A. Kéo và hồ dán",
            "B. Tua-vít và cờ-lê",
            "C. Búa và đinh",
            "D. Thước kẻ và bút chì"
        ],
        answer: "B. Tua-vít và cờ-lê",
        max_score: 1
    },
    {
        id: "t2",
        type: "system",
        question: "Câu 2: Quy trình lắp ghép cái đu ở Tiết 1 bao gồm 2 bước chính nào?",
        options: [
            "A. Lắp chân đỡ và lắp thanh đỡ ngang",
            "B. Lắp mặt ghế và lắp tay cầm",
            "C. Lắp giá đỡ và lắp ghế cái đu",
            "D. Lắp trục và lắp móc treo"
        ],
        answer: "C. Lắp giá đỡ và lắp ghế cái đu",
        max_score: 1
    },
    {
        id: "t3",
        type: "system",
        question: "Câu 3: Khi lắp giá đỡ cái đu, yêu cầu kỹ thuật quan trọng nhất là gì?",
        options: [
            "A. Vặn vít thật lỏng để dễ tháo",
            "B. Các mối ghép phải chắc chắn, khung không bị xiêu vẹo",
            "C. Lắp thanh đỡ ngang ở sát trên đỉnh chân đỡ",
            "D. Chỉ cần lắp 2 chân là đủ vững"
        ],
        answer: "B. Các mối ghép phải chắc chắn, khung không bị xiêu vẹo",
        max_score: 1
    },
    {
        id: "t4",
        type: "system",
        question: "Câu 4: Tại sao khi lắp cặp móc treo vào trục ghế, chúng ta không nên vặn vít quá chặt?",
        options: [
            "A. Để tiết kiệm sức lực",
            "B. Để dễ dàng tháo ra khi hết giờ",
            "C. Để ghế có thể đung đưa được dễ dàng",
            "D. Vì vít đó không quan trọng"
        ],
        answer: "C. Để ghế có thể đung đưa được dễ dàng",
        max_score: 1
    },
    {
        id: "t5",
        type: "system",
        question: "Câu 5: Trong bộ lắp ghép, chi tiết nào dùng để giữ ốc khi dùng tua-vít vặn vít?",
        options: [
            "A. Thanh thẳng",
            "B. Vòng đệm",
            "C. Cờ-lê",
            "D. Bánh xe"
        ],
        answer: "C. Cờ-lê",
        max_score: 1
    },
    {
        id: "t6",
        type: "ai",
        question: "Câu 6 (Tình huống AI): Trong khi thực hành, bạn Lan thấy giá đỡ cái đu của mình bị nghiêng và các mối nối rất lỏng lẻo. Em hãy hướng dẫn bạn Lan cách dùng dụng cụ để khắc phục tình trạng này.",
        rubric: "- Chỉ ra được nguyên nhân là do chưa vặn chặt vít (1đ)\n- Hướng dẫn dùng cờ-lê giữ ốc và tua-vít vặn vít theo chiều kim đồng hồ (2đ)\n- Nhắc nhở kiểm tra độ cân đối của các thanh chân đỡ (1đ)\n- Lời khuyên về an toàn khi sử dụng dụng cụ (1đ).",
        max_score: 5
    },
    {
        id: "t7",
        type: "multimedia",
        question: "Câu 7 (Thực hành): Em hãy chụp ảnh sản phẩm 'Giá đỡ' hoặc 'Ghế ngồi' mà em đã hoàn thành trong tiết học hôm nay để thầy/cô nhận xét nhé.",
        max_score: 5
    }
];
