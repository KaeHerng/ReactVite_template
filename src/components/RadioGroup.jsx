import React from "react";
import "../styles/components/RadioGroup.css";

const RadioGroup = ({
  options = [],
  value,
  onChange,
  name = "radio-group",
  direction = "vertical",
  variant = "default", // default | card
  disabled = false,
}) => {

  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      const next = (index + 1) % options.length;
      onChange(options[next].value);
    }

    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      const prev = (index - 1 + options.length) % options.length;
      onChange(options[prev].value);
    }
  };

  return (
    <div
      className={`radio-group ${direction} ${variant}`}
      role="radiogroup"
    >
      {options.map((opt, index) => {

        const isSelected = value === opt.value;
        const isDisabled = disabled || opt.disabled;

        return (
          <div
            key={opt.value}
            className={`radio-item 
              ${isSelected ? "selected" : ""} 
              ${isDisabled ? "disabled" : ""}`}
            tabIndex={isDisabled ? -1 : 0}
            role="radio"
            aria-checked={isSelected}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onClick={() => !isDisabled && onChange(opt.value)}>
            <div className="radio-control">
              <div className="radio-dot"></div>
            </div>

            <div className="radio-content">
              <div className="radio-label">{opt.label}</div>

              {opt.description && (
                <div className="radio-description">
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

export default RadioGroup;