# 🚲 ระบบลงทะเบียน SURIN3 BIKE FOR STUDENTS
ระบบลงทะเบียนออนไลน์สำหรับกิจกรรมปั่นจักรยาน พัฒนาด้วย Google Apps Script แบบ Serverless ไม่ต้องใช้ Hosting

## 🚀 ฟีเจอร์การทำงาน (Features)
* Frontend พัฒนาด้วย HTML, CSS (Bootstrap 5) และ JavaScript
* มีระบบตรวจสอบความถูกต้องของเลขประจำตัวประชาชน 13 หลัก
* ใช้ Flatpickr สำหรับปฏิทินภาษาไทย (แปลง ค.ศ. เป็น พ.ศ. อัตโนมัติ)
* มีระบบบีบอัดรูปภาพ (Image Compression) ด้วย HTML5 Canvas ก่อนอัปโหลด เพื่อประหยัดพื้นที่
* Backend ใช้ Google Apps Script บันทึกข้อมูลลง Google Sheets อัตโนมัติ
* อัปโหลดไฟล์รูปภาพ (E-Ticket / สลิปโอนเงิน) เก็บเข้า Google Drive ทันที
* รองรับการแสดงผลทุกหน้าจอ (Responsive Design)

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)
* Frontend: HTML5, Bootstrap 5, SweetAlert2, jQuery
* Backend: Google Apps Script (JavaScript)
* Database/Storage: Google Sheets, Google Drive
