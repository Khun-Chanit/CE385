// ============================================================
// Workshop 2 · ข้อที่ 2 — ทะเบียนนักศึกษา
// ทุกฟังก์ชันต้อง return และห้ามแก้ไข array ต้นฉบับ (no mutation)
// ============================================================

// ---------- ส่วนที่ 1: ข้อมูลตั้งต้น ----------

const students = [
  {
    id: 1,
    name: "ก้อง",
    major: "CE",
    score: 85,
    contact: { email: "kong@university.ac.th", phone: "081-111-1111" },
  },
  {
    id: 2,
    name: "แนน",
    major: "IT",
    score: 45, // นักศึกษาคนนี้คะแนนไม่ถึง 50 ไว้ทดสอบ hasFailingStudent
    contact: { email: "nan@university.ac.th", phone: "082-222-2222" },
  },
  {
    id: 3,
    name: "บอส",
    major: "CE",
    score: 60,
    contact: { email: "boss@university.ac.th", phone: "083-333-3333" },
  },
  {
    id: 4,
    name: "มายด์",
    major: "IT",
    score: 92,
    contact: { email: "mind@university.ac.th", phone: "084-444-4444" },
  },
  {
    id: 5,
    name: "ปอนด์",
    major: "CE",
    score: 70,
    contact: { email: "pond@university.ac.th", phone: "085-555-5555" },
  },
  {
    id: 6,
    name: "ฟ้า",
    major: "IT",
    score: 55,
    contact: { email: "fah@university.ac.th", phone: "086-666-6666" },
  },
];

// ---------- ส่วนที่ 2: ฟังก์ชันค้นหา (ทุกตัว return, ไม่แก้ array ต้นฉบับ) ----------

// คืนนักศึกษาคนนั้น หรือ undefined ถ้าไม่พบ
const findById = (students, id) => students.find((s) => s.id === id);

// คืน array ของนักศึกษาในสาขานั้น (filter สร้าง array ใหม่ ไม่แตะต้นฉบับ)
const findByMajor = (students, major) => students.filter((s) => s.major === major);

// คืน true ถ้ามีอย่างน้อย 1 คนที่คะแนนต่ำกว่า 50
const hasFailingStudent = (students) => students.some((s) => s.score < 50);

// คืนอีเมล หรือข้อความ "ไม่พบข้อมูลติดต่อ" ถ้าไม่มี
// ใช้ ?. กันกรณีหาไม่เจอ (student เป็น undefined) หรือไม่มี contact
// ใช้ ?? กันกรณี email เป็น null/undefined
const getEmail = (students, id) => {
  const student = findById(students, id);
  return student?.contact?.email ?? "ไม่พบข้อมูลติดต่อ";
};

// ============================================================
// ส่วนที่ 3: ทดสอบกรณีที่หาไม่เจอ
// ============================================================

console.log("findById(students, '9999') =", findById(students, "9999"));
console.log("getEmail(students, '9999') =", getEmail(students, "9999"));
console.log("--- โปรแกรมไม่ error แม้หา id ที่ไม่มีอยู่จริง ---");

// เพิ่มนักศึกษา 1 คนที่ไม่มี contact โดยไม่แก้ array ต้นฉบับ -> สร้าง array ใหม่ด้วย spread
const studentsWithNoContact = [
  ...students,
  { id: 7, name: "ต้น", major: "IT", score: 65 }, // ไม่มี contact เลย
];

console.log(
  "getEmail(studentsWithNoContact, 7) =",
  getEmail(studentsWithNoContact, 7)
); // คาดหวัง "ไม่พบข้อมูลติดต่อ" เพราะไม่มี contact.email

// ทดสอบฟังก์ชันอื่น ๆ เพิ่มเติม
console.log("findByMajor(students, 'CE') =", findByMajor(students, "CE"));
console.log("hasFailingStudent(students) =", hasFailingStudent(students)); // true เพราะแนนได้ 45

// ยืนยันว่า array ต้นฉบับไม่ถูกแก้ไข
console.log("students.length เดิมยังเป็น 6 คน:", students.length === 6);