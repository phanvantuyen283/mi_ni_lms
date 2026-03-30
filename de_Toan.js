/* ============================================================
   FILE: de_Toan.js (Môn: Toán - Phép Cộng & Trừ Phân Số)
   Hệ thống: Mini LMS V6.0
   Nhiệm vụ: Tự động chấm điểm (System)
   ============================================================ */

const currentSubject = "Toán";

const EXAM_STRUCTURE = [
  // --- PHẦN 1: PHÉP CỘNG PHÂN SỐ (TIẾT 4) ---
  {
     id: "t0",
     type: "system",
     question: "Nếu chưa biết cộng phân số, Hãy xem lại video dưới đây",
      youtube_url:"https://www.youtube.com/embed/zurPaPnF3pQ",
     max_score: 0
},
  {
    id: "t1",
    type: "system",
    question: "Bài 1a: Tính 2/15 + 11/15",
    options: ["13/30", "13/15", "1", "3/15"],
    answer: "13/15",
    max_score: 0.5
  },
  {
    id: "t2",
    type: "system",
    question: "Bài 1b: Tính 8/19 + 7/19",
    options: ["15/38", "1/19", "15/19", "15"],
    answer: "15/19",
    max_score: 0.5
  },
  {
    id: "t3",
    type: "system",
    question: "Bài 1c: Tính 5/12 + 1/4 (Gợi ý: Quy đồng mẫu số)",
    options: ["6/16", "8/12", "2/3", "4/12"],
    answer: "2/3", // 5/12 + 3/12 = 8/12 = 2/3
    max_score: 0.5
  },
  {
    id: "t4",
    type: "system",
    question: "Bài 1d: Tính 7/20 + 3/10",
    options: ["10/30", "13/20", "1/2", "10/20"],
    answer: "13/20", // 7/20 + 6/20 = 13/20
    max_score: 0.5
  },
  {
    id: "t5",
    type: "system",
    question: "Bài 3 (Thuận tiện): Tính 40/41 + 93/41 + 60/41",
    options: ["193/123", "193/41", "100/41", "4"],
    answer: "193/41",
    max_score: 1
  },
  {
    id: "t6",
    type: "system",
    question: "Bài 5 (Giải toán): Ngày Chủ nhật, Nam đọc sách: sáng 1/2 cuốn, chiều 1/3 cuốn, tối 1/12 cuốn. Tổng cộng Nam đã đọc bao nhiêu phần cuốn sách?",
    options: ["3/17", "11/12", "1", "10/12"],
    answer: "11/12", // 6/12 + 4/12 + 1/12 = 11/12
    max_score: 1.5
  },

  // --- PHẦN 2: PHÉP TRỪ PHÂN SỐ (TIẾT 1 - BÀI 61) ---
  {
    id: "t7",
    type: "system",
    question: "Bài 1a (Trừ): 9/13 - 4/13",
    options: ["13/13", "5/0", "5/13", "5/26"],
    answer: "5/13",
    max_score: 0.5
  },
  {
    id: "t8",
    type: "system",
    question: "Bài 1b (Trừ): 8/7 - 5/7",
    options: ["3/7", "3/14", "13/7", "1"],
    answer: "3/7",
    max_score: 0.5
  },
  {
    id: "t9",
    type: "system",
    question: "Bài 1c (Trừ): 15/19 - 4/19",
    options: ["11/0", "11/38", "11/19", "19/19"],
    answer: "11/19",
    max_score: 0.5
  },
  {
    id: "t10",
    type: "system",
    question: "Bài 1d (Trừ): 85/57 - 23/57",
    options: ["62/57", "62/0", "108/57", "1"],
    answer: "62/57",
    max_score: 0.5
  },
  {
    id: "t11",
    type: "system",
    question: "Bài 2b (Hình ảnh): Viết phép tính trừ thích hợp với hình: Có 5/6 tấm hình, bớt đi 2/6. Còn lại bao nhiêu?",
    options: ["5/6 - 2/6 = 3/6", "5/6 - 3/6 = 2/6", "3/6 + 2/6 = 5/6", "1 - 2/6 = 4/6"],
    answer: "5/6 - 2/6 = 3/6",
    max_score: 1.5
  },
  {
    id: "t12",
    type: "system",
    question: "Bài 3d (Đúng/Sai): Phép tính '3/11 - 2/11 = (3-2)/(11-11) = 1/0' là Đúng hay Sai?",
    options: ["Đúng", "Sai"],
    answer: "Sai",
    max_score: 1
  },
  {
    id: "t13",
    type: "system",
    question: "Bài 4 (Trang 79): Mai cần 1/2 giờ để quét nhà và 1/6 giờ để lau nhà. Tổng thời gian Mai cần là:",
    options: ["2/6 giờ", "2/3 giờ", "1/4 giờ", "4/6 giờ"],
    answer: "2/3 giờ", // 3/6 + 1/6 = 4/6 = 2/3
    max_score: 1
  }
];
