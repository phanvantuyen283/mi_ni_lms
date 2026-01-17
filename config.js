/* config.js - TRÁI TIM CỦA HỆ THỐNG */

// 1. Khai báo thông tin Firebase (Chỉ sửa ở đây)
const firebaseConfig = {
    apiKey: "AIzaSyA77lLi_JCLIdR535KEfg3S0_Ge2EorPMo",
    authDomain: "baikiemtracuoiki.firebaseapp.com",
    projectId: "baikiemtracuoiki",
    storageBucket: "baikiemtracuoiki.firebasestorage.app",
    messagingSenderId: "953819948776",
    appId: "1:953819948776:web:4e9a017a6c5fc10ed28b5d"
};

// 2. Tự động khởi tạo kết nối
// (Đoạn code này kiểm tra xem thư viện đã load chưa để tránh lỗi)
let db;
if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    db = firebase.firestore();
    console.log("✅ [System] Đã kết nối Firebase từ config.js");
} else {
    console.error("❌ [System] Chưa chèn thư viện Firebase SDK trước file config.js!");
}
