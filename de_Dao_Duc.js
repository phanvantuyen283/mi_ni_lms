/* ============================================================
   DANH SÁCH CÂU HỎI: ĐẠO ĐỨC 4 - BÀI 6
   Chủ đề: Thiết lập quan hệ bạn bè (Tiết 1)
   ============================================================ */

const currentSubject = "Đạo đức";
const EXAM_STRUCTURE = [
    {
        id: "t1",
        type: "system",
        question: "Câu 1: Đâu là những biểu hiện cơ bản giúp em bắt đầu thiết lập một tình bạn mới?",
        options: [
            "A. Im lặng và quan sát từ xa",
            "B. Mỉm cười, chào hỏi và giới thiệu bản thân",
            "C. Đợi bạn đến chào mình trước",
            "D. Chỉ chơi với những bạn đã quen từ trước"
        ],
        answer: "B. Mỉm cười, chào hỏi và giới thiệu bản thân",
        max_score: 1
    },
    {
        id: "t2",
        type: "system",
        question: "Câu 2: Trong trò chơi 'Đèn Xanh - Đèn Đỏ', hành động nào dưới đây được coi là 'Đèn Đỏ' (không nên làm) khi gặp bạn mới?",
        options: [
            "A. Mỉm cười thân thiện",
            "B. Lời chào lễ phép",
            "C. Lườm nguýt hoặc nói trống không",
            "D. Chủ động hỏi tên bạn"
        ],
        answer: "C. Lườm nguýt hoặc nói trống không",
        max_score: 1
    },
    {
        id: "t3",
        type: "system",
        question: "Câu 3: Theo 'Công thức kết bạn' đã học trong tiết Khám phá, thứ tự các bước thực hiện nên là:",
        options: [
            "A. Giới thiệu tên -> Mời chơi -> Chào hỏi",
            "B. Chào hỏi -> Mời chơi -> Mỉm cười",
            "C. Mỉm cười -> Chào hỏi -> Giới thiệu tên & Mời chơi",
            "D. Chỉ cần mời chơi là đủ"
        ],
        answer: "C. Mỉm cười -> Chào hỏi -> Giới thiệu tên & Mời chơi",
        max_score: 1
    },
    {
        id: "t4",
        type: "system",
        question: "Câu 4: Khi giới thiệu về bản thân với một người bạn mới, em cần thể hiện thái độ như thế nào?",
        options: [
            "A. Ngại ngùng, nói thật nhỏ",
            "B. Kiêu ngạo về bản thân",
            "C. Tự tin, chân thành và lắng nghe bạn",
            "D. Nói thật nhanh để kết thúc câu chuyện"
        ],
        answer: "C. Tự tin, chân thành và lắng nghe bạn",
        max_score: 1
    },
    {
        id: "t5",
        type: "ai",
        question: "Câu 5 (Tình huống AI): Ở giờ ra chơi, em thấy một bạn học sinh mới chuyển đến đang đứng một mình ở góc sân trường, trông bạn rất rụt rè. Em sẽ làm gì để làm quen và giúp bạn hòa nhập?",
        rubric: "- Thể hiện được thái độ thân thiện (mỉm cười, tiến lại gần) (1đ)\n- Sử dụng lời chào và lời giới thiệu bản thân phù hợp (2đ)\n- Đưa ra lời mời bạn cùng tham gia hoạt động/trò chơi (2đ).",
        max_score: 5
    },
    {
        id: "t6",
        type: "multimedia",
        question: "Câu 6 (Sáng tạo): Em hãy chụp ảnh tấm 'Danh thiếp tình bạn' mà em đã tự tay trang trí (gồm tên, sở thích, hình vẽ) để chia sẻ với thầy và cả lớp nhé.",
        max_score: 1
    }
];
