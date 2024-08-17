import React, { useState, useEffect, useRef } from "react";
import "./Dropdown.css";
import DropdownButton from "./DropdownButton";
import DropdownContent from "./DropdownContent";

const Dropdown = ({ buttonText, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <DropdownButton open={isOpen} toggle={toggleDropdown}>
        {buttonText}
      </DropdownButton>
      <DropdownContent open={isOpen}>{content}</DropdownContent>
    </div>
  );
};

export default Dropdown;
