/* ============================================================
   DANH SÁCH CÂU HỎI: KHOA HỌC 4 - BÀI 21
   Nhiệm vụ: Nấm gây hỏng thực phẩm và nấm độc
   ============================================================ */

const currentSubject = "Khoa học";
const EXAM_STRUCTURE = [
    {
        id: "t1",
        type: "system",
        question: "Câu 1: Để ngăn chặn nấm mốc phát triển, chúng ta cần phá vỡ các điều kiện ưa thích của chúng. Đó là những điều kiện nào?",
        image_url: "https://vtv1.mediacdn.vn/2019/10/24/nam-moc-15718894178381273943360.jpg",
        options: ["A. Khô ráo và Lạnh lẽo", "B. Ẩm ướt và Ấm áp", "C. Sạch sẽ và Thoáng mát", "D. Nhiều ánh sáng mặt trời"],
        answer: "B. Ẩm ướt và Ấm áp",
        max_score: 0.5
    },
    {
        id: "t2",
        type: "system",
        question: "Câu 2: Tại sao phương pháp phơi khô hoặc sấy khô lại giúp bảo quản thực phẩm được lâu?",
        options: [
            "A. Vì làm mất đi lượng nước trong thực phẩm, nấm mốc không thể sống thiếu nước",
            "B. Vì làm cho thực phẩm cứng lại, nấm mốc không cắn được",
            "C. Vì phương pháp này làm thực phẩm mặn hơn",
            "D. Vì làm thay đổi màu sắc của thực phẩm"
        ],
        answer: "A. Vì làm mất đi lượng nước trong thực phẩm, nấm mốc không thể sống thiếu nước",
        max_score: 0.5
    },
    {
        id: "t3",
        type: "system",
        question: "Câu 3: Việc bảo quản thực phẩm trong tủ lạnh dựa trên yếu tố nào để hạn chế nấm mốc?",
        options: ["A. Ánh sáng thấp", "B. Độ ẩm cao", "C. Nhiệt độ thấp", "D. Không khí loãng"],
        answer: "C. Nhiệt độ thấp",
        max_score: 0.5
    },
    {
        id: "t4",
        type: "system",
        question: "Câu 4: Đặc điểm thường thấy (nhưng không phải tất cả) của các loại nấm độc như Nấm độc đỏ là gì?",
        image_url: "https://upload.wikimedia.org/wikipedia/commons/3/32/Amanita_muscaria_3.jpg",
        options: [
            "A. Có màu nâu xám, nhìn rất giản dị",
            "B. Có màu sắc sặc sỡ, bắt mắt và hình dáng lạ",
            "C. Thường mọc ở trong tủ lạnh",
            "D. Có mùi thơm như kẹo"
        ],
        answer: "B. Có màu sắc sặc sỡ, bắt mắt và hình dáng lạ",
        max_score: 0.5
    },
    {
        id: "t5",
        type: "system",
        question: "Câu 5: Nguyên tắc vàng khi đi rừng hoặc cắm trại mà gặp các loại nấm lạ là gì?",
        options: [
            "A. Hái về nấu thử xem có ngon không",
            "B. Chỉ hái những cây nấm to",
            "C. Ngửi thử, nếu thơm thì ăn được",
            "D. Tuyệt đối KHÔNG hái và KHÔNG ăn nấm lạ"
        ],
        answer: "D. Tuyệt đối KHÔNG hái và KHÔNG ăn nấm lạ",
        max_score: 0.5
    },
    {
        id: "t6",
        type: "system",
        question: "Câu 6: Nếu ổ bánh mì bị mốc một góc nhỏ, em nên xử lý như thế nào?",
        image_url: "https://cdn.tuoitre.vn/thumb_w/730/2021/11/3/bread-mold-16359287383791244439077.jpg",
        options: [
            "A. Xé bỏ phần mốc, ăn phần còn lại cho đỡ phí",
            "B. Đem nướng lại thật nóng rồi ăn tiếp",
            "C. Bỏ toàn bộ ổ bánh mì, không ăn nữa",
            "D. Cho vật nuôi trong nhà ăn hộ"
        ],
        answer: "C. Bỏ toàn bộ ổ bánh mì, không ăn nữa",
        max_score: 0.5
    },
    {
        id: "t7",
        type: "system",
        question: "Câu 7: Vì sao chúng ta phải bỏ toàn bộ thực phẩm đã bị mốc dù chỉ thấy một đốm nhỏ?",
        options: [
            "A. Vì nhìn không đẹp mắt",
            "B. Vì chân nấm và độc tố đã lan sâu vào bên trong mà mắt thường không thấy được",
            "C. Vì mốc làm thực phẩm bị nhạt đi",
            "D. Vì kiến sẽ bu vào ăn"
        ],
        answer: "B. Vì chân nấm và độc tố đã lan sâu vào bên trong mà mắt thường không thấy được",
        max_score: 0.5
    },
    {
        id: "t8",
        type: "system",
        question: "Câu 8: Bạn Lan định rang lại mẻ lạc (đậu phộng) đã bị mốc để ăn vì nghĩ nhiệt độ cao sẽ diệt hết độc. Điều này Đúng hay Sai?",
        options: [
            "A. Đúng, nhiệt độ cao sẽ làm sạch mọi thứ",
            "B. Sai, độc tố nấm mốc trong các loại hạt (Aflatoxin) không bị phá hủy hoàn toàn bởi nhiệt độ cao",
            "C. Đúng, nhưng phải rang thật cháy",
            "D. Sai, vì rang lên ăn sẽ bị đắng thôi chứ không độc"
        ],
        answer: "B. Sai, độc tố nấm mốc trong các loại hạt (Aflatoxin) không bị phá hủy hoàn toàn bởi nhiệt độ cao",
        max_score: 0.5
    },
    {
        id: "t9",
        type: "system",
        question: "Câu 9: Khi đi siêu thị mua thực phẩm đóng gói, thông tin quan trọng nào trên bao bì giúp em tránh mua phải hàng hết hạn dễ bị mốc?",
        options: ["A. Tên nhà sản xuất", "B. Hình ảnh minh họa", "C. Hạn sử dụng (Date)", "D. Mã vạch sản phẩm"],
        answer: "C. Hạn sử dụng (Date)",
        max_score: 0.5
    },
    {
        id: "t10",
        type: "system",
        question: "Câu 10: Khẩu hiệu an toàn thực phẩm nào phù hợp nhất với nội dung bài học hôm nay?",
        options: ["A. Ăn chín uống sôi", "B. Rửa tay trước khi ăn", "C. Thấy mốc là bỏ - Không được tiếc rẻ", "D. Cần kiệm là quốc sách"],
        answer: "C. Thấy mốc là bỏ - Không được tiếc rẻ",
        max_score: 0.5
    },
    {
        id: "t11",
        type: "ai",
        question: "Câu 11 (Tự luận AI): Em hãy đóng vai một chuyên gia dinh dưỡng để giải thích cho một người bạn hiểu tại sao không nên hái nấm mọc hoang trong tự nhiên để ăn, dù chúng trông rất ngon?",
        rubric: "- Giải thích được sự nguy hiểm của độc tố nấm (2đ)\n- Nêu được nấm độc khó phân biệt với nấm thường bằng mắt (2đ)\n- Đưa ra lời khuyên an toàn (1đ).",
        max_score: 5
    },
    {
        id: "t12",
        type: "multimedia",
        question: "Câu 12 (Trải nghiệm): Em hãy kiểm tra trong bếp nhà mình một loại thực phẩm đang được bảo quản (ví dụ: gạo, đậu, hoặc đồ trong tủ lạnh). Hãy chụp ảnh thực phẩm đó và ghi chú cách mà gia đình em đang dùng để ngăn chặn nấm mốc nhé.",
        max_score: 5
    }
];
