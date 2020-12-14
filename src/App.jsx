import React, { useEffect } from "react";
import Block from "./Block";
import $ from "jquery";

function App() {

  const getFieldPosition = function(field) {
    var diff, o1;
    
    o1 = $(field).offset();
    
    diff = 3;
    o1.top += diff;
    o1.left += diff;
    return o1;
  };


  useEffect(() => {
    let svg = document.querySelector(".forward-arrow");
    let block = document.querySelector(".block-wrapper");
    let point = document.querySelectorAll(".point");
    let pointFrom;
    let pointTo;
    let activeArrow = false;

    let parX;
    let parY;

    function position(event) {
      let pos = $(this).offset();
      let elem_left = pos.left.toFixed(0);
      let elem_top = pos.top.toFixed(0);

      let x = event.pageX - elem_left;
      let y = event.pageY - elem_top;
      let line = document.querySelector("line");

      line.attributes[0].value = x;
      line.attributes[1].value = y;

      line.attributes[2].value = parX;
      line.attributes[3].value = parY;
    }

    for (let el of point) {
      // eslint-disable-next-line no-loop-func
      el.addEventListener("click", (e) => {
        console.log($(e.target).offset());
        if (!activeArrow && e.target.className.includes("point")) {
          let { offsetTop, offsetLeft } = e.target;
          let {
            offsetTop: offsetTopParent,
            offsetLeft: offsetLeftParent,
          } = e.target.offsetParent;
          activeArrow = true;
          parX = offsetLeftParent + offsetLeft;
          parY = offsetTopParent + offsetTop;
          pointFrom = e.target
          block.addEventListener("mousemove", position);

        } else if (activeArrow && e.target.className.includes("point")) {
          let diffx, diffy, f1, f2, min_diff, offset, ofx, ofy, x1, x2, x3, x4, y1, y2, y3, y4;

          let { offsetTop, offsetLeft } = e.target;
          let {
            offsetTop: offsetTopParent,
            offsetLeft: offsetLeftParent,
          } = e.target.offsetParent;
          activeArrow = false;
          pointTo = e.target
          let line = document.querySelector("line");
          block.removeEventListener("mousemove", position);

          line.attributes[0].value = 0;
          line.attributes[1].value = 0;
          line.attributes[2].value = 0;
          line.attributes[3].value = 0;

          f1 = getFieldPosition(pointFrom)
          f2 = getFieldPosition(pointTo)
          offset = $(".block-wrapper").offset();
          ofx = $(".block-wrapper").scrollLeft() - offset.left;
          ofy = $(".block-wrapper").scrollTop() - offset.top;
          x1 = f1.left + ofx;
          y1 = f1.top + ofy;
          x4 = f2.left + ofx;
          y4 = f2.top + ofy;
          min_diff = 42;
          diffx = Math.max(min_diff, x4 - x1);
          diffy = Math.max(min_diff, y4 - y1);
          x2 = x1 + diffx * 0.5;
          y2 = y1;
          x3 = x4 - diffx * 0.5;
          y3 = y4;

          let d = ["M" + x1.toFixed(3), y1.toFixed(3), "C" + x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
          let path = document.createElementNS("http://www.w3.org/2000/svg", "path" )
          let svg = $(".main-arrow")
          path.setAttribute("strokeWidth", "2")
          path.setAttribute("fill", "none")
          path.setAttribute("d", d)
          path.setAttribute("stroke", "#3366ff")
          $(svg).append(path)
        }
      });
    }

    block.addEventListener("click", (e) => {
      let line = document.querySelector("line");
      if (e.target.className.includes("block-wrapper")) {
        activeArrow = false;
        block.removeEventListener("mousemove", position);
        line.attributes[0].value = 0;
        line.attributes[1].value = 0;

        line.attributes[2].value = 0;
        line.attributes[3].value = 0;
      }
    });
  });

  return (
    <div className="App">
      <div className="main-wrapper">
        <div className="svg-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" className="main-arrow">
          </svg>
        </div>
        <div className="block-wrapper">
          <Block />
          <Block top={50} left={250} />
        </div>
        <div className="forward-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" className="forward-arrow">
            <line x1="0" y1="0" x2="0" y2="0" stroke="black" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default App;
