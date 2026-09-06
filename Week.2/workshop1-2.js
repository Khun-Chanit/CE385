// ===== ส่วนที่ 1: ตัวแปร 6 ชนิด และแสดงค่ากับชนิดของแต่ละตัว =====
const valString = "สวัสดี";
const valNumber = 42;
const valBoolean = true;
let valUndefined;
const valNull = null;
const valArray = [1, 2, 3];

console.log(`ค่า: ${valString} | ชนิด: ${typeof valString}`);
console.log(`ค่า: ${valNumber} | ชนิด: ${typeof valNumber}`);
console.log(`ค่า: ${valBoolean} | ชนิด: ${typeof valBoolean}`);
console.log(`ค่า: ${valUndefined} | ชนิด: ${typeof valUndefined}`);
console.log(`ค่า: ${valNull} | ชนิด: ${typeof valNull}`);
console.log(`ค่า: ${valArray} | ชนิด: ${typeof valArray}`);

// ===== ส่วนที่ 2: ตอบคำถามด้วยโค้ด =====

// typeof null ได้ผลว่า "object" ซึ่งเป็นบั๊กเก่าแก่ของ JavaScript
// ผลนี้ไม่ถูกต้องตามความเป็นจริง เพราะ null ไม่ใช่ object แต่เป็นชนิดข้อมูลพื้นฐาน (primitive)
console.log(`typeof null คือ: ${typeof null}`); // "object" (ไม่ถูกต้องตามจริง)

// ตัวแปรที่ประกาศแล้วยังไม่กำหนดค่า จะมีชนิดเป็น undefined โดยอัตโนมัติ
let notAssignedYet;
console.log(`ตัวแปรที่ยังไม่กำหนดค่า มีชนิดเป็น: ${typeof notAssignedYet}`);

// NaN ย่อมาจาก Not a Number แต่ typeof ของมันกลับได้ผลเป็น "number"
const notANumber = Number("abc"); // สร้าง NaN จากการแปลงสตริงที่ไม่ใช่ตัวเลข
console.log(`typeof NaN คือ: ${typeof notANumber}`); // "number"

// ===== ส่วนที่ 3: การแปลงชนิด =====
const inputAge = "20";
const inputScore = "85.5";

// แปลง inputAge เป็นตัวเลขด้วย Number() แล้วบวก 5
const ageAsNumber = Number(inputAge) + 5;
console.log(`inputAge บวก 5 ได้: ${ageAsNumber}`); // ได้ 25 ไม่ใช่ "205"

// แปลง inputScore เป็นตัวเลขแล้วจัดทศนิยม 1 ตำแหน่งด้วย toFixed()
const scoreAsNumber = Number(inputScore).toFixed(1);
console.log(`inputScore มีทศนิยม 1 ตำแหน่ง: ${scoreAsNumber}`);

// เปรียบเทียบ inputAge === 20 (string vs number) กับ Number(inputAge) === 20
console.log(`inputAge === 20 ได้ผลเป็น: ${inputAge === 20}`);               // false เพราะชนิดต่างกัน (string vs number)
console.log(`Number(inputAge) === 20 ได้ผลเป็น: ${Number(inputAge) === 20}`); // true เพราะแปลงชนิดให้ตรงกันก่อนเทียบ