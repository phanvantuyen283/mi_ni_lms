const currentSubject = "Toán";
const EXAM_STRUCTURE = [
    // --- MỨC ĐỘ: NHẬN BIẾT (4 CÂU) ---
    {
        id: "t1",
        type: "system",
        question: "Muốn cộng hai phân số khác mẫu số, bước đầu tiên ta cần làm gì?",
        options: [
            "Cộng tử số với tử số, giữ nguyên mẫu số",
            "Quy đồng mẫu số hai phân số đó",
            "Lấy tử số của phân số này nhân với mẫu số phân số kia",
            "Trừ mẫu số của hai phân số cho nhau"
        ],
        answer: "Quy đồng mẫu số hai phân số đó",
        max_score: 0.75
    },
    {
        id: "t2",
        type: "system",
        question: "Phân số nào sau đây là kết quả của việc quy đồng phân số $\\frac{1}{2}$ để có mẫu số chung là 8?",
        options: ["$\\frac{2}{8}$", "$\\frac{3}{8}$", "$\\frac{4}{8}$", "$\\frac{5}{8}$"],
        answer: "$\\frac{4}{8}$",
        max_score: 0.75
    },
    {
        id: "t3",
        type: "system",
        question: "Trong phép tính $\\frac{1}{3} + \\frac{1}{6}$, mẫu số chung nhỏ nhất có thể chọn là bao nhiêu?",
        options: ["3", "6", "9", "18"],
        answer: "6",
        max_score: 0.75
    },
    {
        id: "t4",
        type: "system",
        question: "Sau khi quy đồng mẫu số, ta thực hiện cộng hai phân số đó như thế nào?",
        options: [
            "Cộng tử số với tử số, cộng mẫu số với mẫu số",
            "Cộng tử số với tử số, giữ nguyên mẫu số chung",
            "Nhân tử số với tử số, giữ nguyên mẫu số chung",
            "Giữ nguyên tử số, cộng mẫu số với mẫu số"
        ],
        answer: "Cộng tử số với tử số, giữ nguyên mẫu số chung",
        max_score: 0.75
    },

    // --- MỨC ĐỘ: THÔNG HIỂU (4 CÂU) ---
    {
        id: "t5",
        type: "system",
        question: "Kết quả của phép tính $\\frac{1}{5} + \\frac{2}{10}$ là:",
        options: ["$\\frac{3}{10}$", "$\\frac{4}{10}$", "$\\frac{3}{15}$", "$\\frac{4}{20}$"],
        answer: "$\\frac{4}{10}$",
        max_score: 0.75
    },
    {
        id: "t6",
        type: "system",
        question: "Tính: $\\frac{1}{4} + \\frac{3}{8} = ?$",
        options: ["$\\frac{4}{12}$", "$\\frac{5}{8}$", "$\\frac{7}{8}$", "$\\frac{4}{8}$"],
        answer: "$\\frac{5}{8}$",
        max_score: 0.75
    },
    {
        id: "t7",
        type: "system",
        question: "Điền số thích hợp vào chỗ trống: $\\frac{1}{2} + \\frac{1}{6} = \\frac{...}{6}$",
        options: ["2", "3", "4", "5"],
        answer: "4",
        max_score: 0.75
    },
    {
        id: "t8",
        type: "system",
        question: "Nam tô màu $\\frac{1}{2}$ băng giấy, Mai tô màu $\\frac{1}{8}$ băng giấy. Tổng số phần băng giấy hai bạn đã tô màu là:",
        options: ["$\\frac{2}{10}$", "$\\frac{5}{8}$", "$\\frac{4}{8}$", "$\\frac{3}{8}$"],
        answer: "$\\frac{5}{8}$",
        max_score: 0.75
    },

    // --- MỨC ĐỘ: VẬN DỤNG (AI & MULTIMEDIA) ---
    {
        id: "t9",
        type: "ai",
        question: "Một thợ may dùng $\\frac{1}{6}$ tấm vải để may áo và $\\frac{1}{3}$ tấm vải để may túi. Em hãy tính tổng phần vải đã dùng và giải thích các bước làm.",
        rubric: "- Tính đúng kết quả $\\frac{1}{2}$ hoặc $\\frac{3}{6}$ (1đ).\n- Giải thích đủ 2 bước: Quy đồng mẫu số và Cộng tử số (1đ).",
        max_score: 2
    },
    {
        id: "t10",
        type: "multimedia",
        question: "Em hãy trình bày cách tính phép cộng: $\\frac{2}{3} + \\frac{1}{5}$ vào vở (ghi rõ bước quy đồng). Sau đó chụp ảnh bài làm gửi thầy nhé.",
        max_score: 2
    }
];
