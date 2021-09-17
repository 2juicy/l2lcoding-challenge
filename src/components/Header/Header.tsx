import React from "react";
import "./Header.css";

interface PropTypes {
  children: React.ReactNode;
}
export default function Header({ children }: PropTypes) {
  return (
    <header id="header-component">
      <a href="#0">Link to Learn</a>
      {children}
    </header>
  );
}
