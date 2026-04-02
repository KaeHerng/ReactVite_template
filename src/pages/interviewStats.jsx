import { useState, useEffect } from "react";
import "../styles/interviewStats.css";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const STORAGE_KEY = "interviewsRecords";

export default function interviewStats() {

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const [form, setForm] = useState({
    description: "",
    company: "",
    techStack: "",
    finalResult: "",
    interviews: [],
  });

  const [interviewForm, setInterviewForm] = useState({
    date: "",
    Result: "",
    type: "",
    notes: "",
  });

  const [expandedIndex, setExpandedIndex] = useState(null);

  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState(null);
  // -----------------------------
  // Save to localStorage
  // -----------------------------
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);


  // -----------------------------
  // Add Interview to current form
  // -----------------------------
  const AddInterviews = () => {
    setForm({
      ...form,
      interviews: [...form.interviews, { ...interviewForm }]
    });

    setInterviewForm({
      date: "",
      Result: "",
      type: "",
      notes: "",
    });
  };

  // -----------------------------
  // Add Record
  // -----------------------------
  const addRecord = () => {
    if (!form.description || !form.company) {
      alert("Description and company are required");
      return;
    }

    setRecords([...records, { ...form }]);

    setForm({
      description: "",
      company: "",
      techStack: "",
      finalResult: "",
      interviews: [],
    });
  };

  // -----------------------------
  // Edit / Delete
  // -----------------------------
  const startEdit = (index) => {
    setEditingIndex(index);
    setEditForm(records[index]);
  };

  const saveEdit = () => {
    const updated = records.map((r, i) =>
      i === editingIndex ? editForm : r
    );
    setRecords(updated);
    setEditingIndex(null);
    setEditForm(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditForm(null);
  };

  const deleteRecord = (index) => {
    if (window.confirm("Delete this record?")) {
      setRecords(records.filter((_, i) => i !== index));
    }
  };

  // -----------------------------
  // Render
  // -----------------------------

  console.log('records', records)
  return (
    <div className="interviewStats-page">
      <h2 className="largeText">💰 Interview Stats Tracker</h2>

      <div className="interviewStats-heroSection">
        <h3 className="largeText">Welcome to your Interview Stats Tracker</h3>
        <p className="smallText">💡 Track your interview performance and improve your skills.</p>
      </div>

      {/* Input Form */}
      <div className="interviewStats-input">
        <h3 className="largeText">Add New Record</h3>

        <div className="input-row paragraph">

          <input
            placeholder="Company ..."
            value={form.company}
            onChange={e => setForm({ ...form, company: e.target.value })}
          />

          <input
            placeholder="Description ..."
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />

          <input
            placeholder="techStack ..."
            value={form.techStack}
            onChange={e => setForm({ ...form, techStack: e.target.value })}
          />

          <select
            value={form.finalResult}
            onChange={e => setForm({ ...form, finalResult: e.target.value })}
          >
            <option value="">Result</option>
            <option>Got Offer</option>
            <option>No Offer</option>
          </select>

          <div className="add-interview-button" onClick={AddInterviews}>Add Interview +</div>

          <div className="interview-entry">
            {form.interviews.map((interview, index) => (
              <div key={index} className="flex gap-4">
                <input
                  type="date"
                  placeholder="Interview Date ..."
                  value={interview.date}
                  onChange={e => {
                    const updatedInterviews = [...form.interviews];
                    updatedInterviews[index].date = e.target.value;
                    setForm({ ...form, interviews: updatedInterviews });
                  }}
                />
                <select
                  value={interview.type}
                  onChange={e => {
                    const updatedInterviews = [...form.interviews];
                    updatedInterviews[index].type = e.target.value;
                    setForm({ ...form, interviews: updatedInterviews });
                  }}>
                  <option value="">Type</option>
                  <option>Technical Assessment</option>
                  <option>HR interview</option>
                  <option>Technical interview</option>
                  <option>Director interview</option>
                  <option>Technical test</option>
                </select>
                <select
                  value={interview.result}
                  onChange={e => {
                    const updatedInterviews = [...form.interviews];
                    updatedInterviews[index].result = e.target.value;
                    setForm({ ...form, interviews: updatedInterviews });
                  }}>
                  <option value="">Result</option>
                  <option>Pass</option>
                  <option>Failed</option>
                </select>
                <input
                  placeholder="Notes ..."
                  value={interview.notes}
                  onChange={e => {
                    const updatedInterviews = [...form.interviews];
                    updatedInterviews[index].notes = e.target.value;
                    setForm({ ...form, interviews: updatedInterviews });
                  }}
                />
                <div className="px-3 py-1 bg-red-500 text-white rounded-md cursor-pointer"
                  onClick={() => {
                    const updatedInterviews = form.interviews.filter((_, i) => i !== index);
                    setForm({ ...form, interviews: updatedInterviews });
                  }}
                >
                  -
                </div>
              </div>
            ))}
          </div>


          {/* description: "", */}
            {/* company: "", */}
            {/* techStack: "", */}
            {/* finalResult: "", */}
            {/* interviews: [], */}

          <button className="buttonText" onClick={addRecord}>Add Record</button>
        </div>
      </div>

      {records.length > 0 && (
        <div className="records-table">
          <h3 className="text-xl font-semibold mb-3">📄 Records</h3>
          
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr className="paragraph">
                <th>Company</th>
                <th>Description</th>
                <th>Tech Stack</th>
                <th>Final Result</th>
                <th>Interviews</th>
                <th>Actions</th>
              </tr>
            </thead>
          
            <tbody className="smallText">
              {records.map((record, i) => (
                <>
                  <tr
                    key={i}
                    className="cursor-pointer hover:bg-gray-50">
                    <td>{record.company}</td>
                    <td>{record.description}</td>
                    <td>{record.techStack}</td>
                    <td className={`font-medium ${
                      record.finalResult === "Got Offer"
                        ? "text-green-500"
                        : "text-red-600"
                    }`}>{record.finalResult}</td>
                    <td className="text-center">
                      {record.interviews.length}
                    </td>
                    <td>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // 🔥 防止触发整行 click
                          setExpandedIndex(expandedIndex === i ? null : i);
                        }}
                        className="p-1 rounded hover:bg-gray-200 transition"
                      >
                        <ChevronDown
                          className={`w-3 h-3 transition-transform ${
                            expandedIndex === i ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                       <button
                         onClick={(e) => {
                           e.stopPropagation();
                           startEdit(i);
                         }}
                         className="p-1 rounded hover:bg-blue-100"
                       >
                         ✏️
                       </button>
                       
                       {/* Delete */}
                       <button
                         onClick={(e) => {
                           e.stopPropagation();
                           deleteRecord(i);
                         }}
                         className="p-1 rounded hover:bg-red-100"
                       >
                         🗑️
                       </button>
                    </td>
                  </tr>
                
                  {/* 🔻 Expanded Section */}
                  {expandedIndex === i && ( 
                    <tr>
                      <td colSpan="6" className="bg-gray-50">
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          variants={cardVariants}
                        >
                            {record.interviews.length === 0 ? (
                              <p className="text-gray-500">No interviews</p>
                            ) : (
                              <table className="w-full border">
                                <thead className="bg-gray-200">
                                  <tr className="paragraph">
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Result</th>
                                    <th>Notes</th>
                                  </tr>
                                </thead>
                            
                                <tbody className="smallText sub-table-bg">
                                  {record.interviews.map((interview, idx) => (
                                    <tr key={idx}>
                                      <td>
                                        {interview.date || "-"}
                                      </td>
                                      <td>
                                        {interview.type || "-"}
                                      </td>
                                      <td className={`${
                                        interview.result === "Pass"
                                          ? "text-green-500"
                                          : "text-red-600"
                                      }`}>
                                        {interview.result || "-"}
                                      </td>
                                      <td>
                                        {interview.notes || "-"}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )}
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Records */}
      {/* {records.length > 0 && (
        <div className="records-table">
          <h3 className="largeText">📄 Records</h3>
          <table>
            <thead>
              <tr className="paragraph">
                <th>Description</th>
                <th>Company</th>
                <th>Type</th>
                <th>Bank / Platform</th>
                <th>Invest Type</th>
                <th>Rate</th>
                <th>Risk</th>
                <th>Date</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody className="smallText">
              {records.map((r, i) => (
                <tr key={i}>
                  {editingIndex === i ? (
                    <>
                      <td>
                        <input
                          value={editForm.description}
                          onChange={e =>
                            setEditForm({ ...editForm, description: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editForm.amount}
                          onChange={e =>
                            setEditForm({ ...editForm, amount: e.target.value })
                          }
                        />
                      </td>
                      <td>{editForm.type}</td>
                      <td>{editForm.bank || editForm.investPlatform}</td>
                      <td>{editForm.investType || "-"}</td>
                      <td>{editForm.interestRate || "-"}</td>
                      <td>{editForm.risk || "-"}</td>
                      <td>{editForm.startDate || "-"}</td>
                      <td>{editForm.duration || "-"}</td>
                      <td>
                        <button onClick={saveEdit}>💾</button>
                        <button onClick={cancelEdit}>❌</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{r.description}</td>
                      <td>{Number(r.amount).toFixed(2)}</td>
                      <td>{r.type}</td>
                      <td>{r.bank || r.investPlatform}</td>
                      <td>{r.investType || "-"}</td>
                      <td>{r.interestRate ? r.interestRate + "%" : "-"}</td>
                      <td>{r.risk || "-"}</td>
                      <td>{r.startDate || "-"}</td>
                      <td>{r.duration || "-"}</td>
                      <td>
                        <button onClick={() => startEdit(i)}>✏️</button>
                        <button onClick={() => deleteRecord(i)}>🗑️</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        make a table here where each record is a row, and each interview in the record is a sub-row under the main row, with its date, type, result, and notes displayed. but the sub notes do not show up until the user clicks on the main row to expand it.
      )} */}

    </div>
  );
}
