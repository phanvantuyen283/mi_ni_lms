/* ============================================================
   DANH SÁCH CÂU HỎI: MÔN MĨ THUẬT - LỚP 4
   BÀI 3: TRANH VẼ HOẠT ĐỘNG VÌ CỘNG ĐỒNG
   ============================================================ */

const currentSubject = "Mĩ thuật";
const EXAM_STRUCTURE = [
    {
        id: "t1",
        type: "system",
        question: "Câu 1: Trong các hoạt động dưới đây, đâu là hoạt động vì cộng đồng thường được thể hiện trong tranh vẽ?",
        options: [
            "Em đang ngồi học bài một mình",
            "Cả lớp cùng tham gia trồng cây và dọn vệ sinh trường học",
            "Em đang xem tivi tại nhà",
            "Cả gia đình đang đi du lịch nước ngoài"
        ],
        answer: "Cả lớp cùng tham gia trồng cây và dọn vệ sinh trường học",
        max_score: 2
    },
    {
        id: "t2",
        type: "system",
        question: "Câu 2: Để làm nổi bật nội dung đề tài trong tranh, chúng ta cần kết hợp hài hòa các yếu tố nào?",
        options: [
            "Chỉ dùng màu thật đậm",
            "Chỉ vẽ nhân vật, không cần vẽ cảnh nền",
            "Hài hòa giữa đậm - nhạt, nóng - lạnh và hình dáng hoạt động của nhân vật",
            "Chỉ sử dụng duy nhất một loại màu sắc"
        ],
        answer: "Hài hòa giữa đậm - nhạt, nóng - lạnh và hình dáng hoạt động của nhân vật",
        max_score: 2
    },
    {
        id: "t3",
        type: "ai",
        question: "Câu 3: Em hãy quan sát hình ảnh/video về các hoạt động thiện nguyện và giải thích ý nghĩa của các hoạt động vì cộng đồng đối với cuộc sống xung quanh em.",
        youtube_url: "https://www.youtube.com/embed/1_St0l7GkDQ", // Link gợi ý về hoạt động cộng đồng
        rubric: "- Nêu được ít nhất 2 hoạt động vì cộng đồng (1đ)\n- Giải thích được ý nghĩa giúp đỡ mọi người, làm đẹp môi trường (2đ)\n- Thể hiện được cảm xúc cá nhân hoặc mong muốn tham gia (1đ).",
        max_score: 4
    },
    {
        id: "t4",
        type: "system",
        question: "Câu 4: Theo hướng dẫn trong SGK trang 63, bước nào dưới đây nằm trong quy trình vẽ tranh đề tài cộng đồng?",
        options: [
            "Vẽ phác hình ảnh chính và hình ảnh phụ phù hợp với nội dung",
            "Gấp giấy thành máy bay",
            "Cắt dán chữ từ báo cũ",
            "Sử dụng đất nặn để tạo khối"
        ],
        answer: "Vẽ phác hình ảnh chính và hình ảnh phụ phù hợp với nội dung",
        max_score: 2
    },
    {
        id: "t5",
        type: "multimedia",
        question: "Câu 5 (Thực hành): Em hãy vẽ một bức tranh về chủ đề 'Hoạt động vì cộng đồng' (Ví dụ: Quyên góp sách vở, dọn rác bãi biển, giúp đỡ người già...). Sau khi hoàn thiện, hãy chụp ảnh bài vẽ thật rõ nét và tải lên đây nhé!",
        youtube_url:"https://wwww.youtube.com/shorts/3JUVH1VsRFY", // Link ảnh minh họa các bước nếu có
        max_score: 10 
    }
];
