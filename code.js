// 1. กำหนด ID โฟลเดอร์สำหรับเก็บรูปภาพ (แก้ไขตรงนี้)
const FOLDER_ID = "1E0vpH5Yk1yG6Y-z-9TwNIGeci7AL8Zyn"; 

// 2. ฟังก์ชันแสดงหน้าเว็บ (เสมือนเป็น Index.php)
function doGet(e) {
  // รองรับการส่งพารามิเตอร์ ?page=check เผื่อใช้ทำหน้าตรวจสอบข้อมูลในอนาคต
  if (e.parameter.page === 'check') {
    return HtmlService.createHtmlOutput('<h1>หน้าตรวจสอบข้อมูล กำลังอยู่ระหว่างการพัฒนา</h1>');
  }
  
  // แสดงหน้าฟอร์มลงทะเบียนปกติ
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// 3. ฟังก์ชันเช็คเลขบัตรประชาชนซ้ำ
function checkDuplicateID(idCard) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  // เริ่มเช็คตั้งแต่แถวที่ 2 (index 1) เพราะแถว 1 เป็นหัวข้อ
  // คอลัมน์ H (เลขบัตร) คือ index 7
  for (let i = 1; i < data.length; i++) {
    if (data[i][7] == idCard) {
      return true; // พบว่ามีข้อมูลซ้ำ
    }
  }
  return false; // ไม่ซ้ำ
}

// 4. ฟังก์ชันประมวลผลการลงทะเบียนและบันทึกข้อมูล
function processRegistration(data) {
  try {
    const folder = DriveApp.getFolderById(FOLDER_ID);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    let profileUrl = "";
    let slipUrl = "";
    const idCard = data.idCard;

    // บันทึกรูปโปรไฟล์
    if (data.profileFile) {
      let blobProfile = Utilities.newBlob(Utilities.base64Decode(data.profileFile.data), data.profileFile.mimeType, "Profile_" + idCard + ".jpg");
      let fileProfile = folder.createFile(blobProfile);
      profileUrl = fileProfile.getUrl();
    }

    // บันทึกรูปสลิป
    if (data.slipFile) {
      let blobSlip = Utilities.newBlob(Utilities.base64Decode(data.slipFile.data), data.slipFile.mimeType, "Slip_" + idCard + ".jpg");
      let fileSlip = folder.createFile(blobSlip);
      slipUrl = fileSlip.getUrl();
    }

    // บันทึกเวลาปัจจุบัน
    const timestamp = new Date();

    // นำข้อมูลเรียงใส่แถวใหม่ใน Google Sheets
    sheet.appendRow([
      timestamp,
      data.prefix,
      data.firstName,
      data.lastName,
      data.birthDate,
      data.ageYears,
      data.ageMonths,
      data.idCard,
      data.phone,
      data.houseNo,
      data.moo,
      data.street,
      data.subDistrict,
      data.district,
      data.province,
      data.medicalInfo,
      data.emergencyName,
      data.emergencyRelation,
      data.emergencyPhone,
      data.eventType,
      data.shirtSize,
      profileUrl,
      slipUrl
    ]);

    return { status: "success", message: "บันทึกข้อมูลสำเร็จ" };

  } catch (error) {
    return { status: "error", message: "เกิดข้อผิดพลาด: " + error.toString() };
  }
}