import { useState, useEffect } from "react";
import "../styles/savings.css";

const STORAGE_KEY = "savingsRecords";

export default function Savings() {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "savings",
    bank: "",
    investType: "",
    investPlatform: "",
    interestRate: "",
    risk: "no risk",
    startDate: "",
    duration: "",
  });

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
  // Add Record
  // -----------------------------
  const addRecord = () => {
    if (!form.description || !form.amount) {
      alert("Description and amount are required");
      return;
    }

    setRecords([...records, { ...form }]);

    setForm({
      description: "",
      amount: "",
      type: "savings",
      bank: "",
      investType: "",
      investPlatform: "",
      interestRate: "",
      risk: "no risk",
      startDate: "",
      duration: "",
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
  // Summary
  // -----------------------------
  const totalSavings = records
    .filter(r => r.type === "savings")
    .reduce((sum, r) => sum + Number(r.amount || 0), 0);

  const totalInvests = records
    .filter(r => r.type === "invest")
    .reduce((sum, r) => sum + Number(r.amount || 0), 0);

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="Savings-page">
      <h2>💰 Savings & Investment Tracker</h2>

      <div className="savings-heroSection">
        <h3>Welcome to your Savings & Investments Tracker</h3>
        <p>💡 Track safe savings, low-risk investments and grow your wealth.</p>
      </div>

      {/* Input Form */}
      <div className="savings-input">
        <h3>💸 Add New Record</h3>

        <div className="input-row">
          <input
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={e => setForm({ ...form, amount: e.target.value })}
          />

          <select
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
          >
            <option value="savings">Savings</option>
            <option value="invest">Investment</option>
          </select>

          {form.type === "savings" && (
            <select
              value={form.bank}
              onChange={e => setForm({ ...form, bank: e.target.value })}
            >
              <option value="">Select Bank</option>
              <option>Hong Leong Bank</option>
              <option>Maybank</option>
              <option>CIMB</option>
              <option>Public Bank</option>
              <option>Affin Bank</option>
              <option>Other Bank</option>
            </select>
          )}

          {form.type === "invest" && (
            <>
              <select
                value={form.investType}
                onChange={e => setForm({ ...form, investType: e.target.value })}
              >
                <option value="">Investment Type</option>
                <option>FD</option>
                <option>Digital Bank Pot</option>
                <option>Stock</option>
                <option>ETF</option>
                <option>Other</option>
              </select>

              <input
                placeholder="Platform / Bank"
                value={form.investPlatform}
                onChange={e => setForm({ ...form, investPlatform: e.target.value })}
              />

              {["FD", "Digital Bank Pot", "Other"].includes(form.investType) && (
                <input
                  type="number"
                  step="0.01"
                  placeholder="Interest Rate %"
                  value={form.interestRate}
                  onChange={e => setForm({ ...form, interestRate: e.target.value })}
                />
              )}

              <div className="risk-radio">
                {["no risk", "low risk", "medium risk", "high risk"].map(risk => (
                  <label key={risk}>
                    <input
                      type="radio"
                      name="risk"
                      value={risk}
                      checked={form.risk === risk}
                      onChange={e => setForm({ ...form, risk: e.target.value })}
                    />
                    {risk}
                  </label>
                ))}
              </div>
            </>
          )}

          <input
            type="date"
            value={form.startDate}
            onChange={e => setForm({ ...form, startDate: e.target.value })}
          />

          <select
            value={form.duration}
            onChange={e => setForm({ ...form, duration: e.target.value })}
          >
            <option value="">Duration</option>
            <option>1 month</option>
            <option>6 months</option>
            <option>1 year</option>
            <option>2 years</option>
            <option>3 years</option>
            <option>4 years</option>
            <option>Infinite</option>
          </select>

          <button onClick={addRecord}>Add Record</button>
        </div>
      </div>

      {/* Records */}
      {records.length > 0 && (
        <div className="records-table">
          <h3>📄 Records</h3>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
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

            <tbody>
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
      )}

      {/* Summary */}
      <div className="summary">
        <h3>📊 Summary</h3>
        <p>💰 Total Savings: RM {totalSavings.toFixed(2)}</p>
        <p>💹 Total Investments: RM {totalInvests.toFixed(2)}</p>
        <p>💵 Overall Total: RM {(totalSavings + totalInvests).toFixed(2)}</p>
      </div>
    </div>
  );
}
