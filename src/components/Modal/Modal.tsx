import React from "react";
import "./Modal.css";

export default function Modal({ children }: { children: React.ReactNode }) {
  return <div className="modal">{children}</div>;
}
