// ============================================================
// Workshop 2 · ข้อที่ 3 — สรุปผลการเรียน
// ใช้ map / filter / reduce เท่านั้น ห้ามใช้ for หรือ while เลย
// reduce ทุกตัวต้องมีค่าเริ่มต้น และห้ามแก้ array ต้นฉบับ
// ============================================================

// ---------- ใช้ข้อมูลชุดเดียวกับข้อ 2 ----------

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
    score: 45,
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

// ตารางเกรด (ใช้เกณฑ์เดียวกับข้อ 1) สำหรับ countByGrade
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

// ---------- ส่วนที่ 1: ฟังก์ชันสรุปข้อมูล (map / filter / reduce เท่านั้น) ----------

// array ของชื่อทุกคน
const getNames = (students) => students.map((s) => s.name);

// array ของคนที่คะแนน >= 50
const getPassedStudents = (students) => students.filter((s) => s.score >= 50);

// ผลรวมคะแนนทั้งหมด (reduce มีค่าเริ่มต้น 0)
const getTotalScore = (students) => students.reduce((sum, s) => sum + s.score, 0);

// คะแนนเฉลี่ย (ทศนิยม 2 ตำแหน่ง) — array ว่างต้องคืน 0 ไม่ใช่ NaN
const getAverageScore = (students) => {
  if (students.length === 0) return 0;
  return Number((getTotalScore(students) / students.length).toFixed(2));
};

// object นับจำนวนแยกตามเกรด เช่น { A: 2, B: 1, F: 1 }
// reduce มีค่าเริ่มต้นเป็น {} แล้วสะสมทีละคน
const countByGrade = (students) =>
  students.reduce((counts, s) => {
    const grade = toGrade(s.score);
    return { ...counts, [grade]: (counts[grade] ?? 0) + 1 };
  }, {});

// นักศึกษาที่คะแนนสูงสุด ใช้ reduce เทียบทีละคน
// ค่าเริ่มต้นเป็น null เพื่อรองรับกรณี array ว่าง
const getTopStudent = (students) =>
  students.reduce((top, s) => {
    if (top === null) return s;
    return s.score > top.score ? s : top;
  }, null);

// ============================================================
// ส่วนที่ 2: ท่อข้อมูลต่อกัน (บรรทัดเดียว) — filter -> map -> reduce
// หาคะแนนเฉลี่ยของนักศึกษาสาขา CE ที่สอบผ่านเท่านั้น
// ============================================================

const avgPassedCEScore =
  students
    .filter((s) => s.major === "CE" && s.score >= 50)
    .map((s) => s.score)
    .reduce((sum, score, _, arr) => sum + score / arr.length, 0);

console.log("คะแนนเฉลี่ยของนักศึกษา CE ที่สอบผ่าน =", avgPassedCEScore.toFixed(2));

// ============================================================
// ส่วนที่ 3: ทดสอบกรณีขอบ — เรียกทุกฟังก์ชันด้วย array ว่าง []
// ============================================================

console.log("--- ทดสอบด้วย array ว่าง [] ---");
console.log("getNames([]) =", getNames([]));
console.log("getPassedStudents([]) =", getPassedStudents([]));
console.log("getTotalScore([]) =", getTotalScore([]));
console.log("getAverageScore([]) =", getAverageScore([])); // ต้องได้ 0 ไม่ใช่ NaN
console.log("countByGrade([]) =", countByGrade([]));
console.log("getTopStudent([]) =", getTopStudent([])); // ได้ null เพราะไม่มีใครให้เทียบ
console.log("--- ไม่มีตัวไหน error แม้ array ว่าง ---");

// ทดสอบการทำงานจริงกับข้อมูลปกติ เพื่อยืนยันผลลัพธ์
console.log("\n--- ทดสอบกับข้อมูลจริง ---");
console.log("getNames(students) =", getNames(students));
console.log(
  "getPassedStudents(students) =",
  getPassedStudents(students).map((s) => s.name)
);
console.log("getTotalScore(students) =", getTotalScore(students));
console.log("getAverageScore(students) =", getAverageScore(students));
console.log("countByGrade(students) =", countByGrade(students));
console.log("getTopStudent(students) =", getTopStudent(students)?.name);

// ยืนยันว่า array ต้นฉบับไม่ถูกแก้ไข
console.log("\nstudents.length เดิมยังเป็น 6 คน:", students.length === 6);