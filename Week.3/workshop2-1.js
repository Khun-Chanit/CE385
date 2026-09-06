// ============================================================
// Workshop 2 · ข้อที่ 1 — ฟังก์ชันคำนวณคะแนน
// ทุกฟังก์ชันทำเรื่องเดียว และ "คืนค่า" (pure function, ไม่มี console.log ข้างใน)
// ============================================================

// ---------- ส่วนที่ 1: ฟังก์ชันหลัก ----------

// 1) ตรวจว่าคะแนนถูกต้องหรือไม่ (ต้องเป็นตัวเลข 0–100)
const isValidScore = (score) =>
  typeof score === "number" && !Number.isNaN(score) && score >= 0 && score <= 100;

// 2) แปลงคะแนน -> เกรด โดยใช้ array ของเกณฑ์ + find (สั้นกว่า if ซ้อนกัน)
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

const toGrade = (score) => {
  // ตรวจก่อนตัดเกรดเสมอ ตามเงื่อนไข
  if (!isValidScore(score)) return "N/A";
  const found = gradeTable.find((g) => score >= g.min);
  return found.grade;
};

// 3) แปลงคะแนนดิบของ workshop ให้เป็นคะแนนตามน้ำหนักที่กำหนด
//    ค่าเริ่มต้น: เต็ม 60, น้ำหนัก 20 คะแนน
const calculateWorkshopScore = (raw, full = 60, weight = 20) => (raw / full) * weight;

// 4) รวมคะแนนทั้ง 5 ก้อน เป็นคะแนนรวม
const calculateTotal = (workshop, attendance, project, midterm, final) =>
  workshop + attendance + project + midterm + final;

// ============================================================
// ส่วนที่ 2: สร้างข้อมูลนักศึกษา 3 คน แล้วเรียกฟังก์ชันข้างต้น
// ============================================================

const rawStudents = [
  { name: "ก้อง", workshopRaw: 48, attendance: 5, project: 20, midterm: 18, final: 27 },
  { name: "แนน", workshopRaw: 55, attendance: 5, project: 25, midterm: 20, final: 28 },
  { name: "บอส", workshopRaw: 30, attendance: 3, project: 15, midterm: 12, final: 20 },
];

const students = rawStudents.map((s) => {
  const workshopScore = calculateWorkshopScore(s.workshopRaw); // full=60, weight=20 (ค่า default)
  const total = calculateTotal(workshopScore, s.attendance, s.project, s.midterm, s.final);
  return {
    ชื่อ: s.name,
    "Workshop ดิบ": s.workshopRaw,
    "Workshop (20)": workshopScore.toFixed(2),
    เข้าเรียน: s.attendance,
    โปรเจกต์: s.project,
    กลางภาค: s.midterm,
    ปลายภาค: s.final,
    รวม: total.toFixed(2),
    เกรด: toGrade(total),
  };
});

console.table(students);

// ============================================================
// ส่วนที่ 3: พิสูจน์ค่าเริ่มต้นทำงานถูกต้อง
// ============================================================

const resultDefault = calculateWorkshopScore(48); // ไม่ใส่ full, weight -> ใช้ default 60, 20
const resultExplicit = calculateWorkshopScore(48, 60, 20); // ใส่ค่าตรงกับ default เอง

console.log("calculateWorkshopScore(48) =", resultDefault);
console.log("calculateWorkshopScore(48, 60, 20) =", resultExplicit);
console.log("ค่าเท่ากันหรือไม่?", resultDefault === resultExplicit); // true

const resultUndefinedFull = calculateWorkshopScore(48, undefined, 25);
console.log("calculateWorkshopScore(48, undefined, 25) =", resultUndefinedFull);

/*
อธิบายผลลัพธ์ ส่วนที่ 3:

1) calculateWorkshopScore(48) กับ calculateWorkshopScore(48, 60, 20) ให้ผลลัพธ์
   เท่ากัน (16) เพราะเมื่อไม่ส่ง argument ตัวที่ 2 และ 3 มา JavaScript จะใช้ค่า
   default parameter ที่กำหนดไว้ในฟังก์ชัน (full = 60, weight = 20) ให้เองโดยอัตโนมัติ
   ซึ่งเป็นค่าเดียวกับที่เราพิมพ์ระบุเองตรง ๆ ในการเรียกครั้งที่สอง ผลลัพธ์จึงเหมือนกัน

2) calculateWorkshopScore(48, undefined, 25) ยังคงได้ full = 60 (เพราะการส่งค่า
   undefined เข้ามาตรง ๆ ก็ทำให้ default parameter ทำงานเหมือนกับการไม่ส่งอะไรมาเลย
   — นี่คือกฎของ default parameter ใน JS: จะใช้ค่า default ก็ต่อเมื่อ argument
   เป็น undefined เท่านั้น ไม่ใช่แค่ "ไม่ถูกส่งมา") แต่ weight เปลี่ยนเป็น 25 เพราะเราระบุ
   ค่านี้เอง ผลลัพธ์จึงกลายเป็น (48 / 60) * 25 = 20 ซึ่งต่างจากสองกรณีแรก (16)
*/