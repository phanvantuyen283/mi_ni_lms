const currentSubject = "Tiếng Việt";
const EXAM_STRUCTURE = [
  {
    id: "t0",
    type: "system",
    question: "Hãy xem video sau đây và cho biết Lễ hội chùa Hương diễn ra vào thời gian nào?",
    youtube_url:"https://www.youtube.com/embed//iEFW8PWQgRg",
    options:["mùa xuân", "mùa hè", "mùa thu", "mùa đông"],
    answer:"mùa xuân",
    max_score: 1
  },
      
  {
    id: "t1",
    type: "system",
    question: "Câu 1: Trong bài thơ, cảnh vật thiên nhiên rừng mơ được miêu tả thay đổi như thế nào khi vào mùa hội?",
    options: [
      "Rừng mơ rụng lá úa",
      "Rừng mơ thay áo mới, xúng xính hoa đón mời",
      "Rừng mơ kết trái chín mọng",
      "Rừng mơ im lìm trong sương mù"
    ],
    answer: "Rừng mơ thay áo mới, xúng xính hoa đón mời",
    max_score: 2
  },
  {
    id: "t2",
    type: "system",
    question: "Câu 2: Những từ ngữ nào trong bài thơ thể hiện sự đông đúc và tinh thần cởi mở của người đi hội?",
    options: [
      "Lặng lẽ, vắng vẻ",
      "Vội vã, chen lấn",
      "Nườm nượp, xúng xính, cởi mở",
      "Trầm mặc, thành kính"
    ],
    answer: "Nườm nượp, xúng xính, cởi mở",
    max_score: 1
  },
  {
    id: "t3",
    type: "ai",
    question: "Câu 3: Em hãy giải thích ý nghĩa của hai câu thơ: 'Đất nước mình thanh lịch / Nên núi rừng cũng thơ'. Qua đó, em cảm nhận được tình cảm gì của tác giả dành cho quê hương?",
    rubric: "- Giải thích được từ 'thanh lịch' gắn với vẻ đẹp con người và đất nước (0.5đ)\n- Nêu được mối quan hệ giữa con người và thiên nhiên (núi rừng cũng trở nên có hồn, nên thơ) (0.5đ)\n- Thể hiện được niềm tự hào, tình yêu quê hương đất nước sâu sắc của tác giả (1đ).",
    max_score: 2
  },
  {
    id: "t4",
    type: "multimedia",
    question: "Câu 4: Em hãy chép lại 4 khổ thơ đầu của bài 'Đi hội chùa Hương' vào vở sao cho đúng thể thơ 5 chữ, trình bày sạch đẹp và chụp ảnh gửi lên hệ thống.",
    max_score: 4
  }
];
