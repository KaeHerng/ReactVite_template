import { useState, useEffect } from "react";
import "../styles/tasks.css"; // 使用相同样式
import { utils, write } from "xlsx";
import { saveAs } from "file-saver";
import MultiLayerImage from "../components/MultiLayerImage";

// 定义三种面试状态，对应三个看板列
const STATUSES = ["interview", "pending", "completed"];

export default function Interviews() {
  // -----------------------------
  // 1️⃣ State Hooks
  // -----------------------------

  // 从 localStorage 初始化
  const [interviews, setInterviews] = useState(() => {
    const saved = localStorage.getItem("interviews");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    company: "",
    location: "",
    description: "",
    date: "",
  });

  const [editingId, setEditingId] = useState(null);

  const [editForm, setEditForm] = useState({
    company: "",
    location: "",
    description: "",
    date: "",
  });

  const [draggedInterviewId, setDraggedInterviewId] = useState(null);

  // -----------------------------
  // 💾 Local Storage Sync
  // -----------------------------
  useEffect(() => {
    localStorage.setItem("interviews", JSON.stringify(interviews));
  }, [interviews]);

  // -----------------------------
  // 2️⃣ Add New Interview
  // -----------------------------
  const handleAddInterview = () => {
    if (!form.company) return alert("Company name is required");
    if (!form.date) return alert("Date is required");

    setInterviews([
      ...interviews,
      {
        id: Date.now().toString(),
        ...form,
        status: "interview",
        offerDecision: null,
      },
    ]);

    setForm({ company: "", location: "", description: "", date: "" });
  };

  // -----------------------------
  // 3️⃣ Drag & Drop Handlers
  // -----------------------------
  const handleDragStart = (id) => {
    setDraggedInterviewId(id);
  };

  const handleDrop = (status) => {
    const updated = interviews.map(item =>
      item.id === draggedInterviewId
        ? { ...item, status }
        : item
    );

    setInterviews(updated);
    setDraggedInterviewId(null);
  };

  // -----------------------------
  // 4️⃣ Delete Interview
  // -----------------------------
  const handleDeleteInterview = (id) => {
    if (window.confirm("Are you sure you want to delete this interview?")) {
      setInterviews(interviews.filter(item => item.id !== id));
    }
  };

  // -----------------------------
  // 5️⃣ Offer Decision (only for completed)
  // -----------------------------
  const handleOfferDecision = (id, decision) => {
    const updated = interviews.map(item =>
      item.id === id
        ? { ...item, offerDecision: decision }
        : item
    );

    setInterviews(updated);
  };

  // -----------------------------
  // 6️⃣ Helper Functions
  // -----------------------------
  const getInterviewsByStatus = (status) =>
    interviews.filter(item => item.status === status);

  // -----------------------------
  // 7️⃣ Edit Functions
  // -----------------------------
  const handleEditStart = (item) => {
    setEditingId(item.id);
    setEditForm({
      company: item.company,
      location: item.location,
      description: item.description,
      date: item.date,
    });
  };

  const handleEditSave = (id) => {
    const updated = interviews.map(item =>
      item.id === id
        ? { ...item, ...editForm }
        : item
    );

    setInterviews(updated);
    setEditingId(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };


  // -----------------------------
  // 7️⃣ Export Excel record Functions
  // -----------------------------
  const handleExportExcel = () => {
    if (interviews.length === 0) return alert("No data to export");

    // Map data
    const data = interviews.map(({ id, company, location, description, date, status, offerDecision }) => ({
      ID: id,
      Company: company,
      Location: location,
      Description: description,
      Date: date,
      Status: status,
      Offer: offerDecision || "Pending",
    }));

    // Create worksheet and workbook
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Interviews");

    // Write workbook and save
    const wbout = write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "Interview_Records.xlsx");
  };


  // useEffect(() => {
  //   console.log("mounted");

  //   return () => {
  //     console.log("unmounted");
  //   };
  // }, []);

  // -----------------------------
  // 8️⃣ JSX Render
  // -----------------------------
  return (
    <div className="tasks-page">
      <h2 className="largeText" style={{ fontWeight: 'bold' }}>💼 <span style={{ color: 'red' }}>Power</span><span style={{ color: 'blue' }}>Kids</span> Interview Tracker</h2>

      <MultiLayerImage />
      {/* 面试创建表单 */}
      <div className="task-form paragraph">
        <input
          className="task-input"
          placeholder="Company ..."
          value={form.company}
          onChange={e => setForm({ ...form, company: e.target.value })}
        />
        <input  
          className="task-input"
          placeholder="Location ..."
          value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
        />
        <input
          className="task-input"
          placeholder="Description ..."
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <label style={{ display: 'flex', alignItems: 'center'}}>
          Date:
          <input
            className="task-date"
            type="date"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
          />
        </label>
        <button className="buttonText" onClick={handleAddInterview}>Add Interview</button>
        <button className="buttonText" onClick={handleExportExcel} style={{ marginBottom: 20 }}>
          📄 Export to Excel
        </button>
      </div>

      {/* 面试看板 */}
      <div className="board">
        {STATUSES.map(status => (
          <div
            key={status}
            className="column"
            onDragOver={e => e.preventDefault()}
            onDrop={() => handleDrop(status)}>
            <h3 className="largeText" style={{ fontWeight: 'bold' }}>{`${status.toUpperCase()} (${getInterviewsByStatus(status).length})`}</h3>

            {getInterviewsByStatus(status).map(item => (
              <div
                key={item.id}
                className="task-card"
                draggable={editingId !== item.id}
                onDragStart={() => handleDragStart(item.id)}
                style={{
                  border: `2px solid ${
                    item.status === "interview"
                      ? "#3b82f6"
                      : item.status === "pending"
                      ? "#f97316"
                      : "#10b981"
                  }`,
                }}>
                {editingId === item.id ? (
                  <>
                    <input
                      className="paragraph"
                      value={editForm.company}
                      onChange={e =>
                        setEditForm({ ...editForm, company: e.target.value })
                      }
                      placeholder="Company"
                    />
                    <input
                      className="paragraph"
                      value={editForm.location}
                      onChange={e =>
                        setEditForm({ ...editForm, location: e.target.value })
                      }
                      placeholder="Location"
                    />
                    <input
                      className="paragraph"
                      value={editForm.description}
                      onChange={e =>
                        setEditForm({ ...editForm, description: e.target.value })
                      }
                      placeholder="Description"
                    />
                    <input
                      className="paragraph"
                      type="date"
                      value={editForm.date}
                      onChange={e =>
                        setEditForm({ ...editForm, date: e.target.value })
                      }
                    />

                    <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                      <button className="buttonText" onClick={() => handleEditSave(item.id)}>
                        💾 Save
                      </button>
                      <button className="buttonText" onClick={handleEditCancel}>
                        ❌ Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h4 style={{ fontWeight: 'bold' }}>{item.company}</h4>
                    <p className="paragraph">{item.description}</p>
                    <div className="paragraph" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <small>{item.location} | {item.date}</small>

                        <button
                          className="Editbutton buttonText"
                          onClick={() => handleEditStart(item)}>
                          ✏️ Edit
                        </button>
                    </div>
                  </>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "5px",
                  }}>
                  {item.status === "completed" && !item.offerDecision && (
                    <div className="smallText" style={{ display: "flex", gap: 5 }}>
                      <button onClick={() => handleOfferDecision(item.id, "Rejected")}>
                        Reject Offer
                      </button>
                      <button onClick={() => handleOfferDecision(item.id, "No Offer")}>
                        No Offer
                      </button>
                      <button onClick={() => handleOfferDecision(item.id, "Accepted")}>
                        Accept Offer
                      </button>
                      <button onClick={() => handleOfferDecision(item.id, "No Response")}>
                        No Response
                      </button>
                    </div>
                  )}

                  {item.offerDecision && (
                    <span
                      className="smallText"
                      style={{
                        color:
                          item.offerDecision === "Accepted"
                            ? "green"
                            : item.offerDecision === "Rejected"
                            ? "orange"
                            : item.offerDecision === "No Response"
                            ? "red"
                            : "red",
                      }}>
                      Decision: {item.offerDecision}
                    </span>
                  )}

                  <button
                    className="delete-btn buttonText"
                    onClick={() => handleDeleteInterview(item.id)}>
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
