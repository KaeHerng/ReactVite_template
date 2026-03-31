import React, { useState, useRef, useEffect } from "react";
import "../styles/components/MultiDropDown.css";

const MultiSelectDropdown = ({ options = [], selected = [], onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleOption = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const removeItem = (value, e) => {
    e.stopPropagation();
    onChange(selected.filter((v) => v !== value));
  };

  const selectedItems = options.filter((opt) =>
    selected.includes(opt.value)
  );

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="multiselect-container" ref={dropdownRef}>
      
      {/* INPUT AREA */}
      <div
        className={`multiselect-input ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}>
        {selectedItems.length === 0 && (
          <span className="placeholder">Select options...</span>
        )}

        <div className="selected-tags">
          {selectedItems.map((item) => (
            <span key={item.value} className="tag">
              {item.label}
              <button
                className="remove-btn"
                onClick={(e) => removeItem(item.value, e)}>
                ×
              </button>
            </span>
          ))}
        </div>

        <span className="arrow">{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* DROPDOWN */}
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`dropdown-option ${
                selected.includes(opt.value) ? "selected" : ""
              }`}
              onClick={() => toggleOption(opt.value)}>
              <input
                type="checkbox"
                readOnly
                checked={selected.includes(opt.value)}
              />
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;