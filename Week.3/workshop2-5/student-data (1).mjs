// student-data.mjs
// รับผิดชอบ: เก็บและจ่ายข้อมูลนักศึกษาเท่านั้น
// ห้าม export ตัวแปร array ตรง ๆ — ต้อง export ผ่านฟังก์ชันที่คืน "สำเนา" เท่านั้น
// เพื่อไม่ให้ไฟล์อื่นแก้ไขข้อมูลต้นฉบับได้โดยตรง

const students = [
  { id: 1, name: "ก้อง", major: "CE", score: 85 },
  { id: 2, name: "แนน", major: "IT", score: 45 },
  { id: 3, name: "บอส", major: "CE", score: 60 },
  { id: 4, name: "มายด์", major: "IT", score: 92 },
  { id: 5, name: "ปอนด์", major: "CE", score: 70 },
  { id: 6, name: "ฟ้า", major: "IT", score: 55 },
];

// คืนสำเนาของนักศึกษาทุกคน (array ใหม่ + object ใหม่ทุกตัว) ไม่ใช่ตัวแปรจริง
export const getAllStudents = () => students.map((s) => ({ ...s }));

// คืนสำเนาของนักศึกษาคนที่ id ตรงกัน หรือ undefined ถ้าไม่พบ
export const findStudentById = (id) => {
  const found = students.find((s) => s.id === id);
  return found ? { ...found } : undefined;
};
