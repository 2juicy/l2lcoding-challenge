import "./Thumbnail.css";
import React from "react";

function Thumbnail({ thumbnail }: { thumbnail: string }) {
  return (
    <div className="thumbnail">
      <img src={thumbnail} alt="thumbnail" />
    </div>
  );
}

export default React.memo(Thumbnail);
