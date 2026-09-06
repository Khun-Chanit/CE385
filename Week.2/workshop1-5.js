// ฟังก์ชันคืนราคาเมนูอาหารตามชื่อเมนู
function getMenuPrice(menu) {
  switch (menu) {
    // เมนูราคา 50 บาทเท่ากันทั้ง 3 รายการ ใช้ fall-through รวม case เข้าด้วยกัน
    // แทนการเขียนคำสั่ง return 50 ซ้ำกันถึง 3 ครั้ง
    case "ข้าวผัด":
    case "ข้าวมันไก่":
    case "ข้าวหมูแดง":
      return 50;
    case "ผัดไทย":
      return 60;
    case "ต้มยำกุ้ง":
      return 120;
    default:
      // เมนูที่ไม่มีในรายการ ให้ราคาเป็น 0
      return 0;
  }
}

// ฟังก์ชันคืนตัวคูณราคาตามขนาดที่สั่ง
function getSizeMultiplier(size) {
  switch (size) {
    case "ธรรมดา":
      return 1;
    case "พิเศษ":
      return 1.5;
    case "จัมโบ้":
      return 2;
    default:
      // ขนาดอื่นๆ ที่ไม่ระบุ ให้ใช้ตัวคูณปกติ
      return 1;
  }
}

// ส่วนที่ 3: สร้าง array ของออร์เดอร์อย่างน้อย 5 รายการ
const orders = [
  { menu: "ผัดไทย", size: "พิเศษ", qty: 2 },
  { menu: "ข้าวผัด", size: "ธรรมดา", qty: 1 },
  { menu: "ต้มยำกุ้ง", size: "จัมโบ้", qty: 1 },
  { menu: "ข้าวมันไก่", size: "ธรรมดา", qty: 3 },
  { menu: "ก๋วยเตี๋ยวเรือ", size: "ธรรมดา", qty: 1 }, // เมนูนี้ไม่มีในรายการ เพื่อทดสอบ default (ราคา 0)
];

// วนคำนวณราคาแต่ละรายการ แล้วรวมเป็นราคาบิลทั้งหมด
let totalBill = 0;

console.log("===== บิลค่าอาหาร =====");
for (const order of orders) {
  const basePrice = getMenuPrice(order.menu);
  const multiplier = getSizeMultiplier(order.size);
  const lineTotal = basePrice * multiplier * order.qty;

  console.log(`${order.menu} (${order.size}) x${order.qty} = ${lineTotal} บาท`);

  totalBill += lineTotal;
}
console.log(`ราคารวมทั้งบิล: ${totalBill} บาท`);
console.log("========================");