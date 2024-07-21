import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Countdown from "react-countdown";
import { AnimatePresence } from "framer-motion";

const renderer = (props) => {
  if (props.completed) {
    // Render a completed state
    return <App />;
  } else {
    // Render a countdown
    return (
      <AnimatePresence>
        <div
          className="h-[100vh] w-[100vw] flex flex-col gap-8 justify-center items-center text-7xl md:text-8xl font-bold text-white"
          style={{ background: "linear-gradient(to right, #e53935, #e35d5b)" }}
          key={"countdown-element"}
        >
          <div className="text-xl font-medium">P2P launching in</div>
          {props.formatted.hours}:{props.formatted.minutes}:
          {props.formatted.seconds}
        </div>
      </AnimatePresence>
    );
  }
};

ReactDOM.render(
  <Countdown
    date={1721651460000}
    // date={"2023-07-22T18:01:00+05:30"}
    renderer={renderer}
    zeroPadTime={2}
  />,
  document.getElementById("root")
);

reportWebVitals();
