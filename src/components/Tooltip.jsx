import { useState } from "react";
import "../styles/tooltip.css";

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && <span className="tooltip">{text}</span>}
    </span>
  );
};

export default Tooltip;
