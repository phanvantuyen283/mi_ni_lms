/* ============================================================
   DANH SÁCH CÂU HỎI: GIÁO DỤC TRẢI NGHIỆM - TIẾT 70
   Chủ đề: Chăm sóc cảnh quan thiên nhiên
   ============================================================ */

const currentSubject = "Hoạt động trải nghiệm";
const EXAM_STRUCTURE = [
    {
        id: "t1",
        type: "system",
        question: "Câu 1: Trong tiểu phẩm 'Chuyện ở vườn hoa', bạn An (Hiệp sĩ xanh) đã có hành động gì khi thấy Bin định vứt rác và Mai định ngắt hoa?",
        options: [
            "A. Mặc kệ vì không phải việc của mình",
            "B. Cùng tham gia ngắt hoa với các bạn",
            "C. Ngăn cản và giải thích cho các bạn hiểu",
            "D. Đi báo cáo ngay với thầy cô giáo"
        ],
        answer: "C. Ngăn cản và giải thích cho các bạn hiểu",
        max_score: 1
    },
    {
        id: "t2",
        type: "system",
        question: "Câu 2: Theo luật chơi 'Hành động xanh', khi nghe thấy hành động 'Vẽ bậy lên bàn', em cần thực hiện phản ứng nào?",
        options: [
            "A. Vỗ tay 3 cái và hô 'TUYỆT VỜI'",
            "B. Bắt chéo tay và hô 'KHÔNG NÊN'",
            "C. Đứng nghiêm và giữ im lặng",
            "D. Cười lớn và đồng tình"
        ],
        answer: "B. Bắt chéo tay và hô 'KHÔNG NÊN'",
        max_score: 1
    },
    {
        id: "t3",
        type: "ai",
        question: "Câu 3 (Tư duy AI): Nếu em đang đi dạo trong công viên và thấy một nhóm bạn đang dẫm lên cỏ để chụp ảnh, em sẽ nói gì với các bạn ấy để bảo vệ cảnh quan mà vẫn giữ được sự lịch sự?",
        rubric: "- Thể hiện thái độ lịch sự, không gay gắt (1đ)\n- Nêu được lý do tại sao cần bảo vệ thảm cỏ (giữ thẩm mỹ, cỏ cần oxy...) (2đ)\n- Đưa ra lời khuyên hoặc hướng dẫn bạn ra khu vực được phép chụp ảnh (2đ).",
        max_score: 5
    },
    {
        id: "t4",
        type: "multimedia",
        question: "Câu 4 (Hành động xanh): Em hãy thực hiện một hành động chăm sóc cây xanh hoặc dọn dẹp vệ sinh tại góc học tập/lớp học của mình. Hãy chụp ảnh lại 'thành quả' sạch đẹp đó để chia sẻ cùng cả lớp nhé!",
        max_score: 3
    }
];
