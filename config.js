/* ============================================================
   CONFIG.JS - TRẠM ĐIỀU KHIỂN TRUNG TÂM MINI LMS V6.0 (DÙNG CHUNG)
   Nhiệm vụ: Kết nối Firebase và Apps Script (KHÔNG CHỨA ĐỀ THI)
   ============================================================ */

// 1. Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA77lLi_JCLIdR535KEfg3S0_Ge2EorPMo",
    authDomain: "baikiemtracuoiki.firebaseapp.com",
    projectId: "baikiemtracuoiki",
    storageBucket: "baikiemtracuoiki.firebasestorage.app",
    messagingSenderId: "953819948776",
    appId: "1:953819948776:web:4e9a017a6c5fc10ed28b5d"
};

// 2. Các thông số vận hành hệ thống (Cố định)
const GLOBAL_CONFIG = {
    WEB_API_URL: "https://script.google.com/macros/s/AKfycbwD7XiaNJyCx4Awgcx7bq0AnvTkIHOtZl8IZN6aNJQWBdKR03Cpdy4uaRH4WC43lybcIw/exec", 
    ADMIN_SECRET_KEY: "172108",
    DRIVE_FOLDER_ID: "1n68_9G6BQKkdDgIIk5zsTiBeQRxcofti",
    SUBJECTS: [
        "Toán", "Tiếng Việt", "Tiếng Anh", "Khoa học", "Lịch sử & Địa lý", 
        "Đạo đức", "Công nghệ", "Hoạt động trải nghiệm", "Mĩ thuật", 
        "Âm nhạc", "Giáo dục thể chất", "Tin học"
    ]
};

// 3. Khởi tạo kết nối hệ thống
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

console.log("🚀 Trạm gốc Config V6.0 đã kết nối thành công!");
