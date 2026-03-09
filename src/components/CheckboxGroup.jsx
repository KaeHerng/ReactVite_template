import React from "react";
import "../styles/components/CheckboxGroup.css";

const CheckboxGroup = ({
  options = [],
  value = [],
  onChange,
  direction = "vertical",
  variant = "default", // default | card
  selectAll = false,
  disabled = false
}) => {

  const toggleOption = (val) => {
    if (value.includes(val)) {
      onChange(value.filter(v => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  const toggleSelectAll = () => {
    if (value.length === options.length) {
      onChange([]);
    } else {
      onChange(options.map(o => o.value));
    }
  };

  return (
    <div className={`checkbox-group ${direction} ${variant}`}>

      {selectAll && (
        <div className="checkbox-item select-all" onClick={toggleSelectAll}>
          <div className={`checkbox-control ${value.length === options.length ? "checked" : ""}`}>
            <div className="checkbox-check"></div>
          </div>
          <span className="checkbox-label">Select All</span>
        </div>
      )}

      {options.map((opt) => {

        const isChecked = value.includes(opt.value);
        const isDisabled = disabled || opt.disabled;

        return (
          <div
            key={opt.value}
            className={`checkbox-item 
              ${isChecked ? "checked" : ""} 
              ${isDisabled ? "disabled" : ""}`}
            onClick={() => !isDisabled && toggleOption(opt.value)}>

            <div className="checkbox-control">
              <div className="checkbox-check"></div>
            </div>

            <div className="checkbox-content">
              <div className="checkbox-label">{opt.label}</div>

              {opt.description && (
                <div className="checkbox-description">
                  {opt.description}
                </div>
              )}

            </div>

          </div>
        );
      })}
    </div>
  );
};

export default CheckboxGroup;