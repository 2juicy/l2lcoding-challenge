import React from "react";
import "./Dropmenu.css";

interface PropTypes {
  label: string;
  params: string[];
  contents: string[];
  setParams: (prev) => void;
}

function Dropmenu({ label, params, contents, setParams }: PropTypes) {
  return (
    <div className={`dropdown ${label}`}>
      <button className="dropbtn">{label}</button>
      <div className="dropdown-content">
        <div className="grid-column">
          {contents.map(content => (
            <label key={content}>
              <input
                type="checkbox"
                checked={params.includes(content)}
                onChange={() => {
                  const check = params.includes(content);
                  setParams(prev =>
                    check
                      ? prev.filter(param => param !== content)
                      : [...prev, content]
                  );
                }}
              />
              {content}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Dropmenu);
