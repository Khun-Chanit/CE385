// ============================================================
// Workshop 2 · ข้อที่ 4 — รวมข้อมูลจากหลายแหล่ง
// ห้ามใช้ Object.assign · ห้ามแก้ baseInfo/scoreInfo/contactInfo · ต้องใช้ spread และ rest
// ============================================================

const baseInfo = { id: "6501", name: "สมชาย", major: "CE" };
const scoreInfo = { id: "6501", score: 78, attendance: 9 };
const contactInfo = {
  id: "6501",
  contact: { email: "somchai@dpu.ac.th", phone: "081-111-1111" },
};

// ตารางเกรด (เกณฑ์เดียวกับข้อก่อนหน้า)
const gradeTable = [
  { min: 80, grade: "A" },
  { min: 75, grade: "B+" },
  { min: 70, grade: "B" },
  { min: 65, grade: "C+" },
  { min: 60, grade: "C" },
  { min: 55, grade: "D+" },
  { min: 50, grade: "D" },
  { min: 0, grade: "F" },
];
const toGrade = (score) => gradeTable.find((g) => score >= g.min).grade;

// ============================================================
// ส่วนที่ 1: รวม 3 ก้อนเป็น object เดียวด้วย spread แล้วเพิ่ม grade
// ลำดับ spread สำคัญ: เขียน base, score, contact ตามลำดับ (ไม่มี key ชนกันยกเว้น id ที่ค่าตรงกันอยู่แล้ว)
// ============================================================

// หมายเหตุสำคัญ: แค่ ...contact เฉย ๆ จะทำให้ merged.contact ใช้ reference
// เดียวกับ contactInfo.contact (shallow spread คัดลอกแค่ชั้นบนสุด) ถ้าใครมาแก้
// merged.contact.email ทีหลัง จะไปกระทบ contactInfo ต้นฉบับด้วย ซึ่งผิดเงื่อนไข
// จึงต้อง spread ชั้นในของ contact.contact แยกออกมาอีกชั้น เพื่อตัดการอ้างอิงถึงต้นฉบับ
const mergeStudent = (base, score, contact) => ({
  ...base,
  ...score,
  ...contact,
  contact: { ...contact.contact },
  grade: toGrade(score.score),
});

const merged = mergeStudent(baseInfo, scoreInfo, contactInfo);
console.log("merged =", merged);

// ============================================================
// ส่วนที่ 2: พิสูจน์เรื่อง shallow copy
// ============================================================

// 1) คัดลอกผลลัพธ์ด้วย { ...merged } แล้วแก้ copy.contact.email
const copy = { ...merged };
copy.contact.email = "hacked@dpu.ac.th";

// 2) แสดงว่าอีเมลของต้นฉบับเปลี่ยนตามด้วย
console.log("merged.contact.email หลังแก้ copy =", merged.contact.email);
/*
อธิบาย: { ...merged } เป็นการทำ "shallow copy" คือคัดลอกแค่ชั้นบนสุดของ object
แต่ property "contact" เป็น object ซ้อนอยู่ข้างใน spread จะคัดลอกแค่ "reference"
(ที่อยู่ในหน่วยความจำ) ของ contact มาให้ ไม่ได้สร้าง object contact ขึ้นใหม่
ดังนั้น copy.contact กับ merged.contact จึงชี้ไปที่ object เดียวกันในหน่วยความจำ
เมื่อแก้ copy.contact.email จึงเท่ากับแก้ object เดียวกันนั้น ทำให้ merged.contact.email
เปลี่ยนตามไปด้วย ทั้งที่เราตั้งใจจะแก้แค่ copy เท่านั้น
*/

// 3) แก้ให้คัดลอกได้ถูกต้อง โดย spread ชั้นในของ contact ด้วย (deep-ish copy เฉพาะ contact)
const copy2 = { ...merged, contact: { ...merged.contact } };
copy2.contact.email = "hacked2@dpu.ac.th";

console.log("merged.contact.email หลังแก้ copy2 =", merged.contact.email); // ไม่เปลี่ยน
console.log("copy2.contact.email =", copy2.contact.email);
// ครั้งนี้ต้นฉบับ (merged) ไม่เปลี่ยน เพราะ copy2.contact เป็น object ใหม่ที่แยกจาก merged.contact แล้ว

// ============================================================
// ส่วนที่ 3: Destructuring และ Rest
// ============================================================

// 1) รับ object เดียวแล้ว destructure พร้อม default value ให้ major
const formatStudent = ({ name, score, grade, major = "ไม่ระบุ" }) =>
  `${name} (${major}) - เกรด ${grade} คะแนน ${score}`;

console.log(formatStudent(merged));

// 2) ใช้ rest แยก contact ออกจากข้อมูลที่เหลือ
const { contact, ...publicData } = merged;
console.log("publicData (ไม่มี contact) =", publicData);
console.log("contact ที่แยกออกมา =", contact);

/*
อธิบาย: ทำไม API จริงถึงไม่ควรส่ง contact ออกไปให้ทุกคน
- contact เก็บข้อมูลส่วนตัวที่ค่อนข้างละเอียดอ่อน (อีเมล, เบอร์โทร) การส่งข้อมูลนี้
  ออกไปในทุก response (เช่น API ที่ใช้แสดงรายชื่อ/อันดับ/คะแนนแบบสาธารณะ) จะทำให้
  ข้อมูลติดต่อของนักศึกษารั่วไหลไปยังผู้ใช้ที่ไม่มีสิทธิ์เห็น เช่น เพื่อนร่วมชั้น หรือ
  บุคคลภายนอกที่ดึงข้อมูลผ่าน endpoint สาธารณะ
- หลักการ "least privilege" / data minimization คือควรส่งเฉพาะข้อมูลที่ผู้ใช้ปลายทาง
  จำเป็นต้องรู้เท่านั้น เช่น หน้าดูอันดับคะแนนไม่จำเป็นต้องมีเบอร์โทรของทุกคนติดมาด้วย
- ถ้าจำเป็นต้องใช้ contact จริง ๆ (เช่น อาจารย์เจ้าของวิชาต้องการติดต่อ) ควรทำเป็น
  endpoint แยกที่มีการตรวจสิทธิ์ (authorization) ก่อน ไม่ใช่แนบมากับข้อมูลทั่วไปทุกครั้ง
*/

// ยืนยันว่าไม่มีการแก้ไข object ต้นฉบับทั้ง 3 ก้อนเลย
console.log("\nbaseInfo ไม่เปลี่ยน:", JSON.stringify(baseInfo));
console.log("scoreInfo ไม่เปลี่ยน:", JSON.stringify(scoreInfo));
console.log("contactInfo ไม่เปลี่ยน:", JSON.stringify(contactInfo));