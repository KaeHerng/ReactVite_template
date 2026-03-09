import { useState, useEffect, useMemo } from "react";
import "../styles/expenses.css";

export default function Expenses() {
  // -----------------------------
  // State Hooks
  // -----------------------------

  // All expense/income records
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("records");
    return saved ? JSON.parse(saved) : [];
  });

  // Form state for adding a new record
  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: "",
  });

  // ID of the record being edited
  const [editingId, setEditingId] = useState(null);

  // Form state for editing a record
  const [editForm, setEditForm] = useState({
    description: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: "",
  });

  // -----------------------------
  // Filter State
  // -----------------------------

  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Sort state
  const [sortOption, setSortOption] = useState("dateDesc"); // default: newest first

  // -----------------------------
  // Local Storage Sync
  // -----------------------------
  useEffect(() => {
    localStorage.setItem("records", JSON.stringify(records));
  }, [records]);

  // -----------------------------
  // Add New Record
  // -----------------------------
  const handleAddRecord = () => {
    if (!form.description) return alert("Description is required");
    if (!form.amount) return alert("Amount is required");
    if (isNaN(form.amount)) return alert("Amount must be a number");
    if (form.type === "expense" && !form.category) return alert("Category is required");

    setRecords([...records, { id: Date.now().toString(), ...form }]);
    // Reset form
    setForm({ description: "", amount: "", type: "expense", category: "Food", date: "" });
  };

  // -----------------------------
  // Edit Record
  // -----------------------------
  const handleEditStart = (item) => {
    setEditingId(item.id);
    setEditForm({
      description: item.description,
      amount: item.amount,
      type: item.type,
      category: item.category || "Food",
      date: item.date,
    });
  };

  const handleEditSave = (id) => {
    const updated = records.map(item =>
      item.id === id ? { ...item, ...editForm } : item
    );
    setRecords(updated);
    setEditingId(null);
  };

  const handleEditCancel = () => setEditingId(null);

  // -----------------------------
  // Delete Record
  // -----------------------------
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setRecords(records.filter(item => item.id !== id));
    }
  };

  // -----------------------------
  // Filter, Search, and Sort Records
  // -----------------------------
  const filteredRecords = useMemo(() => {
    const result = records
      // Filter by month and year
      .filter(item => {
        if (!filterMonth && !filterYear) return true;
        const date = new Date(item.date);
        const matchesMonth = filterMonth ? date.getMonth() + 1 === parseInt(filterMonth) : true;
        const matchesYear = filterYear ? date.getFullYear() === parseInt(filterYear) : true;
        return matchesMonth && matchesYear;
      })
      // Filter by search term
      .filter(item => item.description.toLowerCase().includes(searchTerm.toLowerCase()));
  
    // Sort
    return result.sort((a, b) => {
      if (sortOption === "dateAsc") return new Date(a.date) - new Date(b.date);
      if (sortOption === "dateDesc") return new Date(b.date) - new Date(a.date);
      if (sortOption === "amountAsc") return parseFloat(a.amount) - parseFloat(b.amount);
      if (sortOption === "amountDesc") return parseFloat(b.amount) - parseFloat(a.amount);
      return 0;
    });
  }, [records, filterMonth, filterYear, searchTerm, sortOption]);

  // -----------------------------
  // Calculate Totals
  // -----------------------------
  const totalExpense = useMemo(() => {
    return filteredRecords
        .filter(r => r.type === "expense")
        .reduce((sum, r) => sum + parseFloat(r.amount), 0);
  }, [filteredRecords])

  const totalIncome = useMemo(() => {
    return filteredRecords
        .filter(r => r.type === "income")
        .reduce((sum, r) => sum + parseFloat(r.amount), 0);
  }, [filteredRecords]);

  // -----------------------------
  // Generate Year Options Dynamically
  // -----------------------------
  const years = Array.from(new Set(records.map(r => new Date(r.date).getFullYear())))
    .sort((a, b) => b - a);

  // -----------------------------
  // JSX Render
  // -----------------------------
  return (
    <div className="expenses-page">
      <h2 className="largeText">💰 Expense Tracker</h2>

      {/* -----------------------------
          Filters: Month, Year, Reset
      ----------------------------- */}
      <div className="expense-form paragraph" style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <select value={filterMonth} onChange={e => setFilterMonth(e.target.value)}>
          <option value="">All Months</option>
          {[...Array(12)].map((_, i) => (
            <option key={i+1} value={i+1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <select value={filterYear} onChange={e => setFilterYear(e.target.value)}>
          <option value="">All Years</option>
          {years.map(year => <option key={year} value={year}>{year}</option>)}
        </select>

        <button className="buttonText" onClick={() => { setFilterMonth(""); setFilterYear(""); }}>Reset Filter</button>
      </div>

      {/* -----------------------------
          Search and Sort
      ----------------------------- */}
      <div className="expense-form paragraph" style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search description..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: 5, flex: "1 1 200px" }}
        />

        <select value={sortOption} onChange={e => setSortOption(e.target.value)} style={{ padding: 5 }}>
          <option value="dateDesc">Date: Newest</option>
          <option value="dateAsc">Date: Oldest</option>
          <option value="amountDesc">Amount: High to Low</option>
          <option value="amountAsc">Amount: Low to High</option>
        </select>
      </div>

      {/* -----------------------------
          Add New Record Form
      ----------------------------- */}
      <div className="expense-form paragraph">
        <input
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <input
          placeholder="Amount"
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
        />
        <select
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {form.type === "expense" && (
          <select
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Sport">Sport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        )}

        <input
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
        />
        <button className="buttonText" onClick={handleAddRecord}>Add Record</button>
      </div>

      {/* -----------------------------
          Totals Display
      ----------------------------- */}
      <div className="totals paragraph">
        <p>Total Income: <b style={{color: "green"}}>RM {totalIncome}</b></p>
        <p>Total Expense: <b style={{color: "red"}}>RM {totalExpense}</b></p>
        <p>Balance: <b>RM {totalIncome - totalExpense}</b></p>
      </div>

      {/* -----------------------------
          Records List
      ----------------------------- */}
      <div className="records-list">
        {filteredRecords.map(item => (
          <div key={item.id} className={`record-card ${item.type}`}>
            {editingId === item.id ? (
              <>
                <input
                  className="paragraph"
                  value={editForm.description}
                  onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Description"
                />
                <input
                  className="paragraph"
                  value={editForm.amount}
                  onChange={e => setEditForm({ ...editForm, amount: e.target.value })}
                  placeholder="Amount"
                />
                <select
                  className="paragraph"
                  value={editForm.type}
                  onChange={e => setEditForm({ ...editForm, type: e.target.value })}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
                {editForm.type === "expense" && (
                  <select
                    className="paragraph"
                    value={editForm.category}
                    onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                  >
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Sport">Sport</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                  </select>
                )}
                <input
                  className="paragraph"
                  type="date"
                  value={editForm.date}
                  onChange={e => setEditForm({ ...editForm, date: e.target.value })}
                />
                <div className="record-buttons buttonText">
                  <button onClick={() => handleEditSave(item.id)}>💾 Save</button>
                  <button onClick={handleEditCancel}>❌ Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h4 className="paragraph">{item.description}</h4>
                <p className="smallText">
                  RM {item.amount} | {item.type} 
                  {item.type === "expense" && ` | ${item.category}`} | {item.date}
                </p>
                <div className="record-buttons buttonText">
                  <button onClick={() => handleEditStart(item)}>✏️ Edit</button>
                  <button onClick={() => handleDelete(item.id)}>❌ Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
