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
      Likes
      <input
        className="range"
        onBlur={() => setShow("")}
        type="range"
        name="likes"
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
