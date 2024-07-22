import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Countdown from "react-countdown";
import { AnimatePresence, motion } from "framer-motion";
import ChromeDinoGame from "react-chrome-dino";

const renderer = (props) => {
  const urlParams = new URLSearchParams(window.location.search);
  const showPage = urlParams.get("showpage");
  if (props.completed || showPage === "true") {
    // Render a completed state
    return <App />;
  } else {
    // Render a countdown
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
          className="h-[100vh] w-[100vw] flex flex-col gap-8 justify-center items-center text-7xl md:text-8xl font-bold text-white"
          style={{ background: "linear-gradient(to right, #e53935, #e35d5b)" }}
          key={"countdown-element"}
        >
          <div className="text-xl font-medium">P2P launching in</div>
          {props.formatted.hours}:{props.formatted.minutes}:
          {props.formatted.seconds}
        </motion.div>
        <ChromeDinoGame />
      </AnimatePresence>
    );
  }
};

ReactDOM.render(
  <Countdown date={1721651460000} renderer={renderer} zeroPadTime={2} />,
  document.getElementById("root")
);

reportWebVitals();
