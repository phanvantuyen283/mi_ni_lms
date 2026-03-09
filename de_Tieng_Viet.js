/* ============================================================
   DANH SÁCH CÂU HỎI: TIẾNG VIỆT 4 - TẬP LÀM VĂN
   Chủ đề: Lập dàn ý Timeline cho bài văn kể chuyện
   ============================================================ */

const currentSubject = "Tiếng Việt";
const EXAM_STRUCTURE = [
    {    id:"infor_1",
         type:"infor",
         question:"Hãy bấm link sau, chọn đọc câu chuyện Ông Bụt đã đến- Sách giáo khoa Tiếng Việt tập 2, chủ điểm Sống để yêu thương và trả lời các câu hỏi phía dưới",
         website_link:"https://hanhtrangso.nxbgd.vn/ebook/read/tieng-viet-4-tap-hai-11383",
         max_score:0
    },
   {
        id: "t1",
        type: "system",
        question: "Câu 1 (Khởi động): Hãy sắp xếp các sự việc sau theo trình tự thời gian đúng của một câu chuyện kể:",
        options: [
            "A. Kết thúc câu chuyện -> Diễn biến -> Mở đầu",
            "B. Mở đầu -> Diễn biến (Sự việc 1, 2...) -> Kết thúc",
            "C. Diễn biến -> Mở đầu -> Kết thúc",
            "D. Sự việc quan trọng nhất -> Mở đầu -> Kết thúc"
        ],
        answer: "B. Mở đầu -> Diễn biến (Sự việc 1, 2...) -> Kết thúc",
        max_score: 1
    },
    {
        id: "t2",
        type: "system",
        question: "Câu 2 (Khám phá): Tại sao khi lập dàn ý theo sơ đồ Timeline, chúng ta nên sử dụng 'từ khóa' cô đọng thay vì viết cả đoạn văn dài?",
        options: [
            "A. Vì lười viết chữ nhiều",
            "B. Để sơ đồ trông đẹp mắt hơn",
            "C. Để nhìn thấy 'xương sống' câu chuyện một cách logic và ngắn gọn nhất",
            "D. Vì không đủ chỗ trống trên giấy"
        ],
        answer: "C. Để nhìn thấy 'xương sống' câu chuyện một cách logic và ngắn gọn nhất",
        max_score: 1
    },
    {
        id: "t3",
        type: "ai",
        question: "Câu 3 (Luyện tập AI): Em hãy chọn một câu chuyện mình yêu thích và liệt kê 3 sự việc chính theo đúng trình tự thời gian. AI sẽ giúp em kiểm tra xem các sự việc này đã logic và đủ 'đắt giá' chưa nhé!",
        rubric: "- Nêu được tên câu chuyện rõ ràng (1đ)\n- Liệt kê đủ 3 sự việc chính (Mở đầu - Diễn biến - Kết thúc) (2đ)\n- Các sự việc sắp xếp đúng trình tự thời gian và logic (2đ).",
        max_score: 5
    },
    {
        id: "t4",
        type: "multimedia",
        question: "Câu 4 (Vận dụng): Em hãy vẽ sơ đồ Timeline (hình mũi tên hoặc đoàn tàu) cho câu chuyện em vừa chọn vào vở, sau đó chụp ảnh sản phẩm rành mạch của mình gửi lên đây nhé!",
        max_score: 3
    }
];
