/* ============================================================
   DE_TINHOC_B6.JS - SỬ DỤNG PHẦN MỀM KHI ĐƯỢC PHÉP
   Nhiệm vụ: Phân biệt phần mềm miễn phí và có bản quyền
   ============================================================ */

const currentSubject = "Tin học";
const EXAM_STRUCTURE = [
    // 1. Nhận biết phần mềm miễn phí (System)
    {
        id: "t1",
        type: "system",
        question: "Câu 1: Trong các phần mềm sau đây, phần mềm nào là phần mềm miễn phí (theo nội dung Hình 23)?",
        options: ["PowerPoint", "Tutor for Adobe Photoshop", "Kiran's Typing Tutor", "mtd - Lac Viet Dictionaries"],
        answer: "Kiran's Typing Tutor",
        max_score: 2
    },

    // 2. Lý do sử dụng phần mềm có bản quyền (System)
    {
        id: "t2",
        type: "system",
        question: "Câu 2: Tại sao chúng ta nên sử dụng phần mềm có bản quyền?",
        options: [
            "Để máy tính bị nhiễm virus", 
            "Để tránh nguy cơ vi phạm pháp luật và bảo mật thông tin", 
            "Để tốn thêm tiền cho gia đình", 
            "Để được xem nhiều quảng cáo hơn"
        ],
        answer: "Để tránh nguy cơ vi phạm pháp luật và bảo mật thông tin",
        max_score: 2
    },

    // 3. Phân tích tình huống vi phạm bản quyền (AI)
    {
        id: "t3",
        type: "ai",
        question: "Câu 3: Theo em, vì sao chúng ta không nên sử dụng các phần mềm bẻ khóa (crack) hoặc tìm cách dùng lậu các phần mềm không miễn phí?",
        rubric: "- Nêu được việc sử dụng trái phép là vi phạm pháp luật (1đ)\n- Giải thích được nguy cơ mất an toàn dữ liệu/nhiễm virus (2đ)\n- Thể hiện được sự tôn trọng quyền lợi của người làm ra phần mềm (2đ).",
        max_score: 5
    },

    // 4. Liên hệ thực tế máy tính cá nhân (Multimedia)
    {
        id: "t4",
        type: "multimedia",
        question: "Câu 4: Em hãy kiểm tra trên máy tính mình đang sử dụng, tìm một phần mềm miễn phí (ví dụ: Unikey, Google Chrome, Scratch...) và chụp ảnh màn hình có biểu tượng phần mềm đó gửi cho thầy.",
        max_score: 3
    },

    // 5. Giải quyết tình huống (AI)
    {
        id: "t5",
        type: "ai",
        question: "Câu 5: Nếu biết một người bạn đang cố gắng tìm cách sử dụng phần mềm 'lậu' (không có bản quyền), em sẽ đưa ra lời khuyên như thế nào cho bạn?",
        rubric: "- Lời khuyên lễ phép, chân thành (1đ)\n- Chỉ ra được các rủi ro về bảo mật cho bạn (2đ)\n- Gợi ý bạn tìm các phần mềm miễn phí tương đương để thay thế (2đ).",
        max_score: 5
    }
];
