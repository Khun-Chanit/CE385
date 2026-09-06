// student-service.mjs
// รับผิดชอบ: กฎทางธุรกิจ — ตัดเกรด, ตรวจสอบผ่าน/ไม่ผ่าน, สรุปผล
// ไฟล์นี้ห้าม import อะไรเลย และห้ามมี console.log ข้างใน
// ทุกฟังก์ชันเป็น pure function รับข้อมูลผ่านพารามิเตอร์เท่านั้น
// ไม่รู้จัก ไม่สนใจ ว่าข้อมูลมาจากไหน (array ในไฟล์ / ฐานข้อมูล / API ฯลฯ)

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

// แปลงคะแนน -> เกรด
export const toGrade = (score) => gradeTable.find((g) => score >= g.min).grade;

// ตรวจว่าคะแนนนี้ผ่านหรือไม่ (>= 50)
export const isPassing = (score) => score >= 50;

// สรุปผลจาก array ของนักศึกษาที่ได้รับมาทางพารามิเตอร์
export const summarize = (students) => {
  const total = students.reduce((sum, s) => sum + s.score, 0);
  const average =
    students.length === 0 ? 0 : Number((total / students.length).toFixed(2));
  const passedCount = students.filter((s) => isPassing(s.score)).length;

  return {
    count: students.length,
    total,
    average,
    passedCount,
    failedCount: students.length - passedCount,
  };
};
