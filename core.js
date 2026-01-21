    <script>
        // Hàm này sẽ đợi file core.js tải xong và khởi tạo Firebase
        async function initPage() {
            let monKey = "sudia"; 
            
            // Đảm bảo core.js đã chạy và tạo biến db
            // Lưu ý: Biến db nằm trong window.db do core.js tạo ra
            if (typeof window.db !== 'undefined') {
                try {
                    const configDoc = await window.db.collection("CAU_HINH").doc("trang_thai_mon").get();
                    // Kiểm tra trạng thái đóng/mở
                    if (configDoc.exists && configDoc.data()[monKey] === false) {
                        alert("⛔ BÀI THI ĐANG ĐÓNG!");
                        window.location.href = "Menu.html";
                    }
                    // Kiểm tra thời gian
                    const timeDoc = await window.db.collection("CAU_HINH").doc("thoi_gian_lam_bai").get();
                    if(timeDoc.exists && timeDoc.data()[monKey] > 0) {
                         window.serverTimeLimit = timeDoc.data()[monKey] * 60; 
                    }
                } catch (e) { console.log(e); }
            }
        }
        
        // Chạy sau 1 giây để đảm bảo core.js đã tải xong hoàn toàn
        setTimeout(initPage, 1000);
    </script>
    
    <script src="core.js"></script>

</body>
</html>
