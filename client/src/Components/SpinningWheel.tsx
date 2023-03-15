import React, { useRef } from "react";

function SpinningWheel() {
    const boxRef = useRef(null);
    
  function spinWheel() {
    var min = 1024;
    var max = 9999;
    var deg = Math.floor(Math.random() * (max - min)) + min;
    let box: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> = boxRef.current;
    boxRef && boxRef.current && boxRef.current.style.transform = "rotate(" + deg + "deg)";
  }

  return (
    <div id="mainbox" className="mainbox">
      <div ref={boxRef} className="box">
        <div className="box1">
          <span className="span1">
            <b>Java</b>
          </span>
          <span className="span2">
            <b>Javascript</b>
          </span>
          <span className="span3">
            <b>Dart</b>
          </span>
          <span className="span4">
            <b>Python</b>
          </span>
        </div>
        <div className="box2">
          <span className="span1">
            <b>Typescript</b>
          </span>
          <span className="span2">
            <b>Ruby</b>
          </span>
          <span className="span3">
            <b>Rust</b>
          </span>
          <span className="span4">
            <b>C++</b>
          </span>
        </div>
      </div>
      <button className="spin">
        Spin!
      </button>
    </div>
  );
}

export default SpinningWheel;
