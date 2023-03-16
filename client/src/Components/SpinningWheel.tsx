import { useEffect, useRef } from "react";
import "./SpinningWheel.css";
import KebabDiningIcon from "@mui/icons-material/KebabDining";
import EggIcon from "@mui/icons-material/Egg";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import SetMealIcon from "@mui/icons-material/SetMeal";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import IcecreamIcon from "@mui/icons-material/Icecream";

interface SpinningWheelProps {
  getRecipe(): Promise<void>;
  trigger: number;
}
function SpinningWheel(props: SpinningWheelProps) {
  const boxRef = useRef<any>(null);

  function spinWheel() {
    var min = 1024;
    var max = 9999;
    var deg = Math.floor(Math.random() * (max - min)) + min;
    boxRef.current.style.transform = "rotate(" + deg + "deg)";
  }

  useEffect(() => {
    if (props.trigger) {
      spinWheel();
      setTimeout(() => {
        props.getRecipe();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.trigger]);

  return (
    <div id="mainbox" className="mainbox col-span-full mx-auto">
      <div ref={boxRef} className="box">
        <div className="box1">
          <span className="span1 span">
            <b>
              <KebabDiningIcon sx={{ color: "whitesmoke", fontSize: 60 }} />
            </b>
          </span>
          <span className="span2 span">
            <b>
              <IcecreamIcon sx={{ color: "blue", fontSize: 60 }} />
            </b>
          </span>
          <span className="span3 span">
            <b>
              <RamenDiningIcon sx={{ color: "red", fontSize: 60 }} />
            </b>
          </span>
          <span className="span4 span">
            <b>
              <LocalPizzaIcon sx={{ color: "gold", fontSize: 60 }} />
            </b>
          </span>
        </div>
        <div className="box2">
          <span className="span1 span">
            <b>
              <EggIcon sx={{ color: "whitesmoke", fontSize: 60 }} />
            </b>
          </span>
          <span className="span2 span">
            <b>
              <SetMealIcon sx={{ color: "blue", fontSize: 60 }} />
            </b>
          </span>
          <span className="span3 span">
            <b>
              <LunchDiningIcon sx={{ color: "red", fontSize: 60 }} />
            </b>
          </span>
          <span className="span4 span">
            <b>
              <LocalBarIcon sx={{ color: "gold", fontSize: 60 }} />
            </b>
          </span>
        </div>
      </div>
      <button className="spin" onClick={() => spinWheel()}>
        Spin!
      </button>
    </div>
  );
}

export default SpinningWheel;
