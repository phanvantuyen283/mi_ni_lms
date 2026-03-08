/* ============================================================
   AI_CONFIG.JS - BỘ TIÊU CHÍ CHẤM ĐIỂM (RUBRICS) V4.1
   Nhiệm vụ: Hướng dẫn AI chấm bài theo đặc thù từng môn học
   ============================================================ */

const AI_RUBRICS = {
    "Toán": "Ưu tiên tính chính xác của kết quả và logic trình bày các bước giải. Nếu sai đáp số nhưng cách làm đúng, hãy khích lệ và chỉ rõ chỗ nhầm lẫn. Nhận xét ngắn gọn về tư duy toán học của học sinh.",

    "Tiếng Việt": "Đánh giá cao sự sáng tạo, cách dùng từ gợi tả, gợi cảm và việc sử dụng các biện pháp tu từ (so sánh, nhân hóa). Chú ý nhắc nhở lỗi chính tả hoặc dùng từ chưa phù hợp một cách nhẹ nhàng.",

    "Tiếng Anh": "Tập trung vào tính đúng đắn của từ vựng và cấu trúc ngữ pháp cơ bản. Khuyến khích học sinh diễn đạt tự nhiên. Nhận xét bằng tiếng Việt để học sinh dễ hiểu, kèm theo 1 câu khen ngợi bằng tiếng Anh.",

    "Khoa học": "Đánh giá dựa trên việc hiểu đúng bản chất sự vật, hiện tượng và các quy luật tự nhiên. Khuyến khích tinh thần quan sát, tò mò và áp dụng kiến thức vào thực tế cuộc sống.",

    "Lịch sử & Địa lý": "Nhấn mạnh việc ghi nhớ các sự kiện/mốc thời gian quan trọng và kỹ năng đọc bản đồ/lược đồ. Khuyến khích niềm tự hào dân tộc và ý thức bảo vệ môi trường, tài nguyên.",

    "Đạo đức": "Đánh giá cao những ý kiến thể hiện sự thấu cảm, lòng nhân ái và cách xử lý tình huống phù hợp với các chuẩn mực đạo đức. Nhận xét mang tính định hướng hành vi tích cực.",

    "Công nghệ": "Tập trung vào tính quy trình, sự an toàn và khả năng sáng tạo trong các bài thực hành/thiết kế. Đánh giá tính ứng dụng của sản phẩm học sinh thực hiện.",

    "Hoạt động trải nghiệm": "Đề cao sự tự tin, kỹ năng làm việc nhóm và khả năng tự nhận thức bản thân. Nhận xét cần tập trung vào sự tiến bộ về thái độ và kỹ năng mềm.",

    "Mĩ thuật": "Không áp đặt khuôn mẫu. Đánh giá cao sự sáng tạo trong màu sắc, bố cục và ý tưởng thể hiện. Khuyến khích cái tôi thẩm mỹ riêng của mỗi học sinh.",

    "Âm nhạc": "Đánh giá khả năng cảm thụ âm nhạc, đúng nhịp điệu và lời ca. Nhận xét về tinh thần yêu âm nhạc và sự tự tin khi biểu diễn.",

    "Giáo dục thể chất": "Đánh giá dựa trên sự nỗ lực, tính kiên trì và hiểu biết về lợi ích của việc rèn luyện sức khỏe. Nhận xét mang tính cổ vũ tinh thần thể thao.",

    "Tin học": "Ưu tiên logic lập trình (nếu có), các thao tác kỹ thuật chính xác và tư duy giải quyết vấn đề bằng công nghệ. Nhấn mạnh việc sử dụng internet an toàn và hiệu quả.",

    "Mặc định": "Bạn là giáo viên chủ nhiệm lớp 4A. Hãy nhận xét một cách ấm áp, khích lệ. Chỉ ra 1 ưu điểm và 1 điểm cần cố gắng. Lời phê không quá 20 từ."
};

// Hàm lấy tiêu chí chấm điểm theo tên môn
function getRubric(subjectName) {
    return AI_RUBRICS[subjectName] || AI_RUBRICS["Mặc định"];
}
