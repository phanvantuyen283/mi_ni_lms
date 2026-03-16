/* ============================================================
   DE_AMNHAC_B4.JS - BÀI HÁT: TÌNH BẠN TUỔI THƠ
   Nhiệm vụ: Nhận diện nhạc lý và thực hành biểu diễn
   ============================================================ */

const currentSubject = "Âm nhạc";
const EXAM_STRUCTURE = [
    // 1. Kiểm tra kiến thức nhạc lý cơ bản (System)
    {
        id: "t1",
        type: "system",
        question: "Câu 1: Bài hát 'Tình bạn tuổi thơ' được sáng tác bởi nhạc sĩ nào và có sắc thái như thế nào?",
        youtube_url:"https://www.youtube.com/embed/aGom9sYhpCI",
        options: [
            "Nhạc sĩ Hoàng Long - Vui tươi, hồn nhiên", 
            "Nhạc sĩ Nguyễn Quốc Việt - Hơi nhanh, vui tươi", 
            "Nhạc sĩ Phạm Tuyên - Nhẹ nhàng, sâu lắng", 
            "Nhạc sĩ Bùi Đình Thảo - Chậm rãi, thiết tha"
        ],
        answer: "Nhạc sĩ Nguyễn Quốc Việt - Hơi nhanh, vui tươi",
        max_score: 2
    },

    // 2. Nhận diện lời ca và ý nghĩa (System)
    {
        id: "t2",
        type: "system",
        question: "Câu 2: Trong lời bài hát, tình bạn của các bạn nhỏ được so sánh với những hình ảnh nào dưới đây?",
        options: [
            "Như mặt trời và mặt trăng", 
            "Như con tàu và bến cảng", 
            "Như cây với cành, như đàn chim líu ríu", 
            "Như những vì sao trên bầu trời"
        ],
        answer: "Như cây với cành, như đàn chim líu ríu",
        max_score: 2
    },

    // 3. Cảm thụ âm nhạc (AI)
    {
        id: "t3",
        type: "ai",
        question: "Câu 3: Sau khi học và hát bài 'Tình bạn tuổi thơ', em có cảm nhận như thế nào về tình bạn của các bạn nhỏ trong bài hát? Giai điệu của bài hát gợi cho em cảm xúc gì?",
        rubric: "- Nêu được sự gắn bó, thắm thiết của tình bạn (2đ)\n- Cảm nhận được sự vui tươi, trong sáng của giai điệu (2đ)\n- Liên hệ được với tình bạn của chính bản thân mình (1đ).",
        max_score: 5
    },

    // 4. Thực hành biểu diễn (Multimedia)
    {
        id: "t4",
        type: "multimedia",
        question: "Câu 4 (Thực hành): Em hãy chọn một trong các hình thức: Hát kết hợp vỗ tay theo tiết tấu, hoặc hát kết hợp múa phụ họa đơn giản. Hãy quay video phần trình bày của em và gửi cho thầy cô nhé!",
        max_score: 5
    },

    // 5. Tư duy sáng tạo trong trình bày (AI)
    {
        id: "t5",
        type: "ai",
        question: "Câu 5: Nếu được biểu diễn bài hát này cùng các bạn trên sân khấu, em sẽ chọn hình thức biểu diễn nào (đơn ca, song ca hay tốp ca)? Em sẽ sử dụng thêm nhạc cụ gõ đệm nào để bài hát sinh động hơn? Vì sao?",
        rubric: "- Lựa chọn được hình thức biểu diễn phù hợp (1đ)\n- Đề xuất được nhạc cụ gõ đệm (thanh phách, song loan, trống nhỏ...) (1đ)\n- Giải thích được lý do lựa chọn để tăng tính sinh động cho bài hát (1đ).",
        max_score: 3
    }
];
