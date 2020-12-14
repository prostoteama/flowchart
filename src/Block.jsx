import React from "react";

const Block = ({top, left}) => {
//   const handleMouseOver = (e) => {
//     e.target.classList.toggle("active");
//   };
//   const handleMouseOut = (e) => {
//     if (
//       e.relatedTarget.classList.contains("point") &&
//       e.target.classList.contains("block-elem")
//     ) {
//       return;
//     }
//     e.target.classList.toggle("active");
//   };

  return (
    <div
      className="block-elem"
    //   onMouseOver={handleMouseOver}
    //   onMouseOut={handleMouseOut}
    style={{top, left}}
    >
      <span className="point point-left"></span>
      <span className="point point-right"></span>
      <span className="point point-top"></span>
      <span className="point point-bottom"></span>
    </div>
  );
};

export default Block;
