// ===== ส่วนที่ 1: ตัวแปรเก็บคะแนนดิบ =====
const workshopRaw = 48;   // คะแนน Workshop ดิบ (เต็ม 60)
const attendance = 9;
const project = 17;
const midterm = 15;
const final = 24;

// ค่าคงที่ที่ใช้ในสูตร (ตั้งชื่อสื่อความหมาย ห้ามพิมพ์ตัวเลขดิบกลางสูตร)
const WORKSHOP_MAX = 60;   // คะแนนเต็มของ Workshop ก่อนแปลง
const WORKSHOP_WEIGHT = 20; // น้ำหนักคะแนน Workshop หลังแปลงตามเกณฑ์วิชา
const FULL_SCORE = 100;     // คะแนนเต็มรวมทั้งหมดของวิชา
const PASS_SCORE = 80;      // เกณฑ์คะแนนที่ต้องได้เพื่อผ่าน

// ===== ส่วนที่ 2: คำนวณ =====

// แปลงคะแนน Workshop จากคะแนนดิบ (เต็ม 60) ให้เป็นคะแนนเต็ม 20 ตามเกณฑ์ของวิชา
// สูตร: (คะแนนดิบ ÷ คะแนนเต็มเดิม) × น้ำหนักที่ต้องการ
const workshopConverted = (workshopRaw / WORKSHOP_MAX) * WORKSHOP_WEIGHT;

// รวมคะแนนทั้งหมด: Workshop ที่แปลงแล้ว + อื่นๆ ตามที่เก็บมา
const totalScore = workshopConverted + attendance + project + midterm + final;

// คิดคะแนนรวมเป็นกี่เปอร์เซ็นต์ของคะแนนเต็ม 100
const percentage = (totalScore / FULL_SCORE) * 100;

// คำนวณว่ายังขาดอีกกี่คะแนนถึงจะได้ 80 (ถ้าเกินแล้ว ค่าจะติดลบไปก่อน)
const pointsUntilPass = PASS_SCORE - totalScore;

// ===== ส่วนที่ 3: แสดงผลเป็นใบสรุปคะแนน =====
console.log(`===== ใบสรุปคะแนน CE385 =====
Workshop (แปลงแล้ว) : ${workshopConverted.toFixed(2)} / ${WORKSHOP_WEIGHT}
Attendance          : ${attendance}
Project             : ${project}
Midterm             : ${midterm}
Final               : ${final}
-----------------------------
คะแนนรวม            : ${totalScore.toFixed(2)} / ${FULL_SCORE}
คิดเป็นเปอร์เซ็นต์    : ${percentage.toFixed(2)}%
ห่างจากเกณฑ์ผ่าน (${PASS_SCORE}) : ${pointsUntilPass.toFixed(2)} คะแนน
=============================`);