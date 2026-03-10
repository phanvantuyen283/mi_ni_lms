/* ============================================================
   FILE: de_TiengAnh.js
   NỘI DUNG: ENGLISH TEST - UNIT 10 (OUR SUMMER HOLIDAYS)
   CHUẨN: MINI LMS V6.0 (Đã sửa lỗi cấu trúc)
   ============================================================ */

const currentSubject = "Tiếng Anh";

const EXAM_STRUCTURE = [
    // --- LAYER 1: AUTO-GRADED SYSTEM QUESTIONS (SYSTEM) ---
    {
        id: "ta_u10_t1",
        type: "system",
        question: "Question 1: Choose the correct preposition to fill in the blank:\n'Were you ___ the beach last weekend?'",
        options: ["in", "on", "at", "to"],
        answer: "on",
        max_score: 2
    },
    {
        id: "ta_u10_t2",
        type: "system",
        question: "Question 2: Read the conversation and choose the correct answer:\n👦 Bill: Were you at the zoo last weekend?\n👧 Mai: No, I ____. I was at the campsite.",
        options: ["was", "wasn't", "were", "weren't"],
        answer: "wasn't",
        max_score: 2
    },

    // --- LAYER 2: AI-ASSISTED ESSAY QUESTIONS (AI) ---
    {
        id: "ta_u10_t3",
        type: "ai",
        question: "Question 3 (AI Assistant): Based on Unit 10, role-play as two friends and write a short conversation (2 sentences):\n- Person A asks if Person B was in the countryside last weekend.\n- Person B answers negatively and says they were in the mountains.",
        rubric: "- Correct question: 'Were you in the countryside last weekend?' (2đ)\n- Correct answer: 'No, I wasn't. I was in the mountains.' (2đ)\n- Spelling & Grammar (1đ).",
        max_score: 5
    },

    // --- LAYER 3: MULTIMEDIA UPLOAD FOR TEACHER GRADING (MULTIMEDIA) ---
    {
        id: "ta_u10_t4",
        type: "multimedia",
        question: "Question 4 (Notebook Photo): Practice writing 3 pairs of questions and answers using 'Were you...' based on page 139 of your textbook. Take a clear picture and upload it here!",
        max_score: 1
    }
];

const SUBJECT_NAME = "Tiếng Anh";
