// ตัวแปรเก็บข้อมูลส่วนตัว 5 อย่าง
const nickname = "หมูกรอบ";
const studentId = "6512345";
const age = 20;
const major = "วิทยาการคอมพิวเตอร์";
const enrolledSubjects = 6;

// คำนวณปีที่จะจบจากปีปัจจุบัน + จำนวนปีที่เหลือ (สมมติเหลืออีก 2 ปี)
const currentYear = 2569;
const yearsLeft = 2;
const graduationYear = currentYear + yearsLeft;

console.log(`===== บัตรแนะนำตัว =====
ชื่อเล่น       : ${nickname}
รหัสนักศึกษา   : ${studentId}
อายุ           : ${age} ปี
สาขาวิชา       : ${major}
ลงทะเบียน      : ${enrolledSubjects} วิชา
ปีที่จะจบ      : ${graduationYear}    ← คำนวณจาก ${currentYear} + จำนวนปีที่เหลือ (สมมติเหลืออีก ${yearsLeft} ปี)
=========================`);