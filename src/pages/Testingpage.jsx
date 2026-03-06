import React, { useState } from "react";
import "../styles/typespeed.css"; // Reuse the styles from TypeSpeed

export default function Testingpage() {
  // -----------------------------
  // 1️⃣ State
  // -----------------------------
  const [checkbox, setCheckbox] = useState(true);
  const [name, setName] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [chosenButton, setChosenButton] = useState("");

  // -----------------------------
  // 2️⃣ Handlers
  // -----------------------------
  const handleCheckboxChange = () => {
    setCheckbox(!checkbox);
    if (!checkbox) {
      setParagraph(""); // clear paragraph when unchecked
    }
  };

  const handleButtonClick = (type) => {
    if (type === "First") {
      setChosenButton("First button");
    } else {
      setChosenButton("Second button");
    }
  };

  const showParagraph = checkbox;

  // -----------------------------
  // 3️⃣ Render
  // -----------------------------
  return (
    <div className="typespeed-page">
      <h2>🧪 Testing Page</h2>

      {/* Checkbox */}
      <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        Show extra input:
        <input type="checkbox" checked={checkbox} onChange={handleCheckboxChange} />
      </label>

      {/* Name input */}
      <input
        className="input-field"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Conditional paragraph input */}
      {showParagraph && (
        <input
          className="input-field"
          placeholder="Enter extra paragraph"
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
        />
      )}

      {/* Buttons */}
      <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
        <button onClick={() => handleButtonClick("First")}>First button</button>
        <button onClick={() => handleButtonClick("Second")}>Second button</button>
      </div>

      {/* Output chosen button */}
      <p style={{ marginTop: "16px", fontWeight: "bold" }}>Chosen Button: {chosenButton}</p>
    </div>
  );
}
