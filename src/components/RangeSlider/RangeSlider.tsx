import React, { useState } from "react";
import "./RangeSlider.css";

interface PropTypes {
  slider: number;
  setSlider: (arg0) => void;
}

function Range({ slider, setSlider }: PropTypes) {
  const [show, setShow] = useState("");

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSlider(Number(e.target.value));
    setShow("show");
  }

  return (
    <div className="range-wrap">
      <label htmlFor="likes">Likes</label>
      <input
        id="likes"
        name="likes"
        type="range"
        className="range"
        onBlur={() => setShow("")}
        min="0"
        max="500"
        value={slider}
        onInput={handleInput}
      />
      <output className={`bubble ${show}`} style={{ left: slider / 5 + "%" }}>
        {slider}
      </output>
    </div>
  );
}

export default React.memo(Range);
