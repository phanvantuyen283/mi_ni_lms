/* ============================================================
   DANH SÁCH CÂU HỎI: MÔN KHOA HỌC - BÀI 27: PHÒNG TRÁNH ĐUỐI NƯỚC
   Hệ thống: Mini LMS V6.0
   Thang điểm: 10 (Mỗi câu tương ứng số điểm ghi trong max_score)
   ============================================================ */

const currentSubject = "Khoa học";

const EXAM_STRUCTURE = [
    // PHẦN 1: NHẬN BIẾT HÀNH ĐỘNG (Hình ảnh trang 68)
    {
        id: "t1",
        type: "system",
        question: "Câu 1: Quan sát hình 1 (nhóm trẻ nhảy cầu tắm sông tự do), đây là hành động NÊN làm (N) hay KHÔNG NÊN làm (K) để phòng tránh đuối nước?",
        options: ["N (Nên làm)", "K (Không nên làm)"],
        answer: "K (Không nên làm)",
        max_score: 1
    },
    {
        id: "t2",
        type: "system",
        question: "Câu 2: Quan sát hình 2 (bé gái dùng sào dài cứu bạn dưới nước), đây là hành động NÊN làm (N) hay KHÔNG NÊN làm (K) khi gặp tình huống khẩn cấp?",
        options: ["N (Nên làm)", "K (Không nên làm)"],
        answer: "N (Nên làm)",
        max_score: 1
    },
    {
        id: "t3",
        type: "system",
        question: "Câu 3: Quan sát hình 3 (trẻ em tắm tại hồ bơi có biển chỉ dẫn và người giám sát), đây là hành động NÊN làm (N) hay KHÔNG NÊN làm (K)?",
        options: ["N (Nên làm)", "K (Không nên làm)"],
        answer: "N (Nên làm)",
        max_score: 1
    },
    {
        id: "t4",
        type: "system",
        question: "Câu 4: Quan sát hình 4 (trẻ em mặc áo phao khi đi thuyền), đây là hành động NÊN làm (N) hay KHÔNG NÊN làm (K)?",
        options: ["N (Nên làm)", "K (Không nên làm)"],
        answer: "N (Nên làm)",
        max_score: 1
    },

    // PHẦN 2: KỸ NĂNG PHÁN ĐOÁN TÌNH HUỐNG (Bài tập 2 trang 69)
    {
        id: "t5",
        type: "ai",
        question: "Câu 5: Dựa vào hình ảnh bé gái cứu bạn (trang 69), em hãy phân tích: \n1. Em quan sát thấy gì? \n2. Điều đó có nguy cơ gì? \n3. Cách ứng xử đúng là gì?",
        rubric: "- Mô tả đúng hành động dùng vật dài/sào để cứu (1đ)\n- Phân tích được nguy cơ nếu nhảy xuống trực tiếp sẽ bị đuối nước cùng (1đ)\n- Đưa ra cách ứng xử: Gọi người lớn hoặc dùng vật hỗ trợ gián tiếp (1đ).",
        max_score: 3
    },

    // PHẦN 3: ĐIỀN TỪ HOÀN THÀNH BÁO CÁO (Bài tập 3 trang 69)
    {
        id: "t6",
        type: "system",
        question: "Câu 6: Chọn cụm từ đúng để điền vào chỗ trống (1): 'Đuối nước có thể xảy ra... như bơi ở ...'",
        options: ["nơi an toàn", "nơi không an toàn", "hồ bơi", "phòng tắm"],
        answer: "nơi không an toàn",
        max_score: 1
    },
    {
        id: "t7",
        type: "system",
        question: "Câu 7: Để phòng tránh đuối nước, chúng ta NÊN làm gì?",
        options: [
            "Bơi một mình ở sông suối", 
            "Học bơi và bơi ở những nơi an toàn, có phương tiện cứu hộ", 
            "Chơi đùa gần bờ ao", 
            "Không cần mặc áo phao khi đi thuyền"
        ],
        answer: "Học bơi và bơi ở những nơi an toàn, có phương tiện cứu hộ",
        max_score: 1
    },
    {
        id: "t8",
        type: "multimedia",
        question: "Câu 8 (Thực hành): Em hãy vẽ một biển báo nhắc nhở phòng tránh đuối nước vào vở (ví dụ: Cấm tắm sông, Chú ý nước sâu), chụp ảnh và gửi lên đây.",
        max_score: 1
    }
];
