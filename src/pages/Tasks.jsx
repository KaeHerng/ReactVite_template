import { useState } from "react";
import "../styles/tasks.css";

// 定义三种任务状态，对应三个看板列
const STATUSES = ["tasks", "pending", "completed"];

export default function Tasks() {
  // -----------------------------
  // 1️⃣ State Hooks
  // -----------------------------

  // 存储所有任务信息
  const [tasks, setTasks] = useState([]);

  // 存储表单输入内容
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  // 存储当前拖拽的任务 id
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  // -----------------------------
  // 2️⃣ Add New Task
  // -----------------------------
  const handleAddTask = () => {
    // 简单表单验证
    if (!form.title) return alert("Task name is required");
    if (!form.startDate || !form.endDate) return alert("Select both start and end date");
    if (form.endDate < form.startDate) return alert("End date cannot be before start date");

    // 新增任务到 tasks state
    setTasks([
      ...tasks,
      {
        id: Date.now().toString(), // 使用时间戳生成唯一 id
        ...form,
        status: "tasks", // 默认状态为 tasks
      },
    ]);

    // 清空表单
    setForm({ title: "", description: "", startDate: "", endDate: "" });
  };

  // -----------------------------
  // 3️⃣ Drag & Drop Handlers
  // -----------------------------

  // 当用户开始拖动任务时，记录任务 id
  const handleDragStart = (id) => {
    setDraggedTaskId(id);
  };

  // 当任务被拖动到某一列上释放时，更新任务状态
  const handleDrop = (status) => {
    // 更新对应任务的状态
    const taskresult = tasks.map(task =>
      task.id === draggedTaskId
        ? { ...task, status } // 修改任务状态
        : task
    );

    setTasks(taskresult);
    setDraggedTaskId(null); // 清空拖拽状态
  };

  // -----------------------------
  // 4️⃣ Delete Task
  // -----------------------------
  const handleDeleteTask = (id) => {
    // 弹出确认框，防止误删除
    if (window.confirm("Are you sure you want to delete this task?")) {
      // 删除任务
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  // -----------------------------
  // 5️⃣ Helper Functions
  // -----------------------------

  // 根据状态筛选任务，用于显示在不同列
  const getTasksByStatus = (status) =>
    tasks.filter(task => task.status === status);

  // -----------------------------
  // 6️⃣ JSX 渲染部分
  // -----------------------------

  return (
    <div className="tasks-page">
      {/* 页面标题 */}
      <h2>🗂 Task Manager</h2>

      {/* 任务创建表单 */}
      <div className="task-form">
        <input
          placeholder="Task name"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <label>
          Start Date:
          <input
            type="date"
            value={form.startDate}
            onChange={e => setForm({ ...form, startDate: e.target.value })}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={form.endDate}
            onChange={e => setForm({ ...form, endDate: e.target.value })}
            min={form.startDate} // 防止结束日期早于开始日期
          />
        </label>
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {/* 任务看板 */}
      <div className="board">
        {STATUSES.map(status => (
          <div
            key={status}
            className="column"
            onDragOver={(e) => e.preventDefault()} // 允许拖拽进入列
            onDrop={() => handleDrop(status)}     // 放下时触发
          >
            <h3>{status.toUpperCase()}</h3>

            {/* 列内任务卡 */}
            {getTasksByStatus(status).map(task => (
              <div
                key={task.id}
                className="task-card"
                draggable
                onDragStart={() => handleDragStart(task.id)}
                style={{
                  border: `2px solid ${task.status === "tasks"
                    ? "#3b82f6"   // light blue
                    : task.status === "pending"
                      ? "#f97316"   // orange
                      : "#10b981"   // green for completed
                    }`,
                }}>
                {/* 任务内容 */}
                <h4>{task.title}</h4>
                <p>{task.description}</p>

                {/* 任务底部：显示时间范围 + 删除按钮 */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <small>{task.startDate} → {task.endDate}</small>

                  {/* 删除按钮 */}
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteTask(task.id)}>
                    ❌ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
