/* ============================================================
   DANH SÁCH CÂU HỎI: LỊCH SỬ & ĐỊA LÝ 4 - BÀI 17
   Chủ đề: Cố đô Huế (Tiết 1)
   ============================================================ */

const currentSubject = "Lịch sử & Địa lý";
const EXAM_STRUCTURE = [
    { 
       youtube_url:"https://youtube.com/embed/Wq0yG11iKvg",
        id: "t1",
        type: "system",
        question: "Câu 1: Cố đô Huế thuộc tỉnh nào của nước ta và nằm ở vùng địa lí nào?",
        options: [
            "A. Tỉnh Quảng Bình - Vùng Bắc Trung Bộ",
            "B. Tỉnh Thừa Thiên Huế - Vùng Bắc Trung Bộ",
            "C. Tỉnh Quảng Nam - Vùng Nam Trung Bộ",
            "D. Thành phố Đà Nẵng - Vùng Nam Trung Bộ"
        ],
        answer: "B. Tỉnh Thừa Thiên Huế - Vùng Bắc Trung Bộ",
        max_score: 1
    },
    {
        id: "t2",
        type: "system",
        question: "Câu 2: Những biểu tượng thiên nhiên nào thường được nhắc đến khi mô tả vẻ đẹp thơ mộng của Cố đô Huế?",
        options: [
            "A. Sông Hồng và Núi Ba Vì",
            "B. Sông Hàn và Ngũ Hành Sơn",
            "C. Sông Hương và Núi Ngự",
            "D. Sông Thu Bồn và Núi Chúa"
        ],
        answer: "C. Sông Hương và Núi Ngự",
        max_score: 1
    },
    {
        id: "t3",
        type: "system",
        question: "Câu 3: Công trình kiến trúc nào dưới đây là nơi ở và làm việc của các vua nhà Nguyễn tại Huế?",
        options: [
            "A. Chùa Thiên Mụ",
            "B. Kinh thành Huế",
            "C. Văn Miếu - Quốc Tử Giám",
            "D. Thành Cổ Loa"
        ],
        answer: "B. Kinh thành Huế",
        max_score: 1
    },
    {
        id: "t4",
        type: "ai",
        question: "Câu 4 (Đóng vai AI): Em hãy đóng vai một hướng dẫn viên tí hon, viết 2-3 câu giới thiệu về một cảnh đẹp ở Huế mà em ấn tượng nhất. Hãy sử dụng các tính từ miêu tả (ví dụ: cổ kính, thơ mộng, uy nghiêm...).",
        rubric: "- Sử dụng đúng tính từ miêu tả đặc trưng của Huế (2đ)\n- Giới thiệu được tên danh thắng cụ thể (Sông Hương, Núi Ngự, Kinh thành...) (2đ)\n- Lời văn truyền cảm, có ý thức tự hào về di sản (1đ).",
        max_score: 5
    },
    {
        id: "t5",
        type: "multimedia",
        question: "Câu 5 (Thực hành): Em hãy hoàn thành sơ đồ 'Mảnh ghép Cố đô' (dán thẻ tên danh thắng vào đúng vị trí) trong phiếu học tập, sau đó chụp ảnh kết quả của nhóm mình để thầy/cô kiểm tra nhé!",
        max_score: 2
    }
];
