import express from 'express';

const app = express();
const PORT = 3000;

// 1. Built-in Middleware (วางไว้บนสุดก่อนทุก route)
app.use(express.json());

// ข้อมูลตั้งต้น
let TODOS = [
  { id: "1", title: "ทำการบ้านวิชา CE385", done: true, priority: "high" },
  { id: "2", title: "ทบทวนบทเรียน Node.js", done: false, priority: "medium" },
  { id: "3", title: "ซื้อของใช้ประจำสัปดาห์", done: false, priority: "low" },
  { id: "4", title: "ออกกำลังกาย 30 นาที", done: true, priority: "medium" }
];

// GET /health
app.get('/health', (req, res) => {
  res.status(200).json({ status: "ok" });
});

// 3. Route-level middleware (validateTodo)
const validateTodo = (req, res, next) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: "ต้องมี title เป็นข้อความ" });
  }
  next();
};

// 2. สร้าง Router สำหรับกลุ่ม todo
const todoRouter = express.Router();

// GET /api/todos
todoRouter.get('/', (req, res) => {
  const todosCopy = TODOS.map(todo => ({ ...todo }));
  res.status(200).json(todosCopy);
});

// GET /api/todos/:id/status (ข้อเพิ่มเติม)
todoRouter.get('/:id/status', (req, res) => {
  const { id } = req.params;
  const todo = TODOS.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: `ไม่พบรายการ ${id}` });
  }
  res.status(200).send(todo.done ? "เสร็จแล้ว" : "ยังไม่เสร็จ");
});

// GET /api/todos/:id
todoRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const todo = TODOS.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: `ไม่พบรายการ ${id}` });
  }
  res.status(200).json({ ...todo });
});

// POST /api/todos (เรียกใช้ validateTodo)
todoRouter.post('/', validateTodo, (req, res) => {
  const { title, priority = "medium", done = false } = req.body;
  const newTodo = {
    id: String(TODOS.length + 1),
    title,
    done,
    priority
  };
  TODOS.push(newTodo);
  res.status(201).json(newTodo);
});

// Mount Router ที่ /api/todos[cite: 2]
app.use('/api/todos', todoRouter);

// เส้นทางสำหรับทดสอบ errorHandler[cite: 2]
app.get('/boom', (req, res, next) => {
  next(new Error("ระเบิด"));
});

// 4. เพิ่ม notFound และ errorHandler ไว้ล่างสุด[cite: 2]

// NotFound Middleware (จัดการเมื่อไม่พบเส้นทางที่ตรงกัน)
app.use((req, res, next) => {
  res.status(404).json({ error: "ไม่พบหน้าหรือเส้นทางที่ร้องขอ" });
});

// Error-handling Middleware (รับ 4 parameters: err, req, res, next)
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" });
});

// เปิดพอร์ต 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});