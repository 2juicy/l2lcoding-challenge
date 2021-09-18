import React from "react";
import "./Navbar.css";

interface PropTypes {
  children: React.ReactNode;
}
export default function Navbar({ children }: PropTypes) {
  return <header id="header-component">{children}</header>;
}
