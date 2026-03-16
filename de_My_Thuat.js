/* ============================================================
   DE_MITHUAT_B2.JS - DỮ LIỆU ĐỀ THI MÔN MĨ THUẬT
   Chủ đề: PHONG CẢNH QUÊ EM (V6.0)
   ============================================================ */

const currentSubject = "Mĩ thuật";
const EXAM_STRUCTURE = [
    // 1. Kiểm tra kiến thức về cảm giác màu sắc (System)
    {
        id: "t1",
        type: "system",
        question: "Câu 1: Trong mĩ thuật, nhóm màu nào thường gợi cho em cảm giác lạnh và không gian yên bình của miền quê?",
        options: ["Đỏ, Vàng, Cam", "Xanh lam, Xanh lá, Tím", "Nâu, Đỏ đun, Vàng đất", "Hồng, Cam tươi, Đỏ cam"],
        answer: "Xanh lam, Xanh lá, Tím",
        max_score: 2
    },

    // 2. Tìm hiểu tranh của họa sĩ (AI)
    {
        id: "t2",
        type: "ai",
        question: "Câu 2: Quan sát bức tranh phong cảnh quê hương của họa sĩ (trang 13 SGK). Em hãy nêu cảm nhận về màu sắc và chất liệu của bức tranh đó. Em học tập được gì về cách sắp xếp bố cục?",
        youtube_url: "https://youtube.com/embed/iO9zbESMjkk?si", // Video minh họa tranh phong cảnh (nếu có)
        rubric: "- Nêu được chất liệu và hình thức thể hiện (2đ)\n- Cảm nhận được cảm xúc mà màu sắc mang lại (2đ)\n- Rút ra bài học về cách sắp xếp không gian/bố cục (1đ).",
        max_score: 5
    },

    // 3. Thực hành vẽ/xé dán phong cảnh (Multimedia)
    {
        id: "t3",
        type: "multimedia",
        question: "Câu 3 (Thực hành): Em hãy vẽ hoặc xé dán một bức tranh về phong cảnh quê hương (nơi em ở hoặc nơi em từng đến). Sau khi hoàn thành, hãy chụp ảnh sản phẩm thật rõ nét và gửi lên hệ thống.",
        image_url: "https://vnu.app/v6/sample_landscape.jpg", // Ảnh gợi ý các bước vẽ
        max_score: 3
    },

    // 4. Phân tích sản phẩm cá nhân (AI)
    {
        id: "t4",
        type: "ai",
        question: "Câu 4: Dựa trên sản phẩm em vừa chụp ở Câu 3, hãy giới thiệu: Phong cảnh đó ở vùng miền nào? Hình ảnh nào là trọng tâm và em đã sử dụng màu sắc như thế nào để tạo ấn tượng?",
        rubric: "- Xác định được vùng miền và nội dung tranh (1đ)\n- Chỉ ra được hình ảnh trọng tâm (2đ)\n- Giải thích được cách dùng màu tạo điểm nhấn (2đ).",
        max_score: 5
    }
];
