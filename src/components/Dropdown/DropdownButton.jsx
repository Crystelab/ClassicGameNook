import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import "./DropdownButton.css";

const DropdownButton = ({ children, open, toggle }) => {
  return (
    <div onClick={toggle} className={`dropdown-btn ${open ? "button-open" : ""}`}>
      {children}
      <span className="toggle-icon">
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </span>
    </div>
  );
}

export default DropdownButton;
