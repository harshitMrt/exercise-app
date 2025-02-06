import React, { useState, useRef } from "react";
import { useAppContext } from "../context/context";
import exhale from "../audio.mp3/Exhale.mp3";
import Inhale from "../audio.mp3/start Breathing.mp3";
import HoldBreath from "../audio.mp3/Hold Breath.mp3";

const StartBreathing = new Audio(Inhale);
const Exhale = new Audio(exhale);
const holdBreath = new Audio(HoldBreath);

export default function Progress({ index = 0 }) {
  const [progress, setProgress] = useState(0);
  const [btn, setBtn] = useState(true);
  const [cycle, setCycle] = useState(1);

  const { levels } = useAppContext();

  const selectedLEVEL = levels[index];

  const breathIn = selectedLEVEL.inn;
  const breathHold = selectedLEVEL.hold;
  const breathOut = selectedLEVEL.out;

  const interval = useRef(null);
  const intervalSecond = useRef(null);
  const intervalThird = useRef(null);
  const timeout = useRef(null);
  let progressValue = 0;

  let timer = breathIn + breathHold + breathOut;

  function runProgress() {
    if (!btn) return;

    // setBtn((prev) => !prev);

    const inTime = 100 / (breathIn * 10);
    const holdTime = breathHold * 1000;
    const outTime = 100 / (breathOut * 10);

    StartBreathing.play();

    interval.current = setInterval(() => {
      if (progressValue >= 100) {
        holdBreath.play();
        clearInterval(interval.current);

        timeout.current = setTimeout(() => {
          Exhale.play();
          intervalSecond.current = setInterval(() => {
            if (progressValue <= 0) {
              clearInterval(intervalSecond.current);
            } else {
              progressValue -= outTime;
              setProgress(Math.max(0, Math.round(progressValue)));
            }
          }, 100);
        }, holdTime);
      } else {
        progressValue += inTime;
        setProgress(Math.min(100, Math.round(progressValue)));
      }
    }, 100);
  }

  const handleProgress = () => {
    setBtn((prev) => !prev);

    if (btn) {
      runProgress();

      intervalThird.current = setInterval(() => {
        runProgress();
      }, timer * 1000 + cycle * 1000);
    } else {
      //reset logic
      clearInterval(intervalThird.current);
      clearInterval(interval.current);
      clearTimeout(timeout.current);
      clearInterval(intervalSecond.current);

      progressValue = 0;
      setProgress(0);
      setBtn(false);
      setBtn((prev) => !prev);
    }
  };

  return (
    <div>
      <h2>Progress</h2>

      <div
        style={{
          margin: "14px 0",
          padding: "7px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <label
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "8px",
            color: "#ffffff",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          Every Cycle is played after a delay of
        </label>
        <input
          placeholder="Default value set to 1 sec"
          type="number"
          value={cycle}
          onChange={(e) => setCycle(e.target.value)}
          style={{
            padding: "6px",
            fontSize: "14px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            textAlign: "center",
            width: "44%",
            background: "rgba(255, 255, 255, 0.8)",
            boxShadow: "inset 2px 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>
      <ProgressBar progress={progress} />
      <button onClick={handleProgress} className="start-progress-button">
        {!btn ? "Reset" : "Start"}
      </button>
    </div>
  );
}

const ProgressBar = ({ progress }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "25px",
        background: "rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "inset 0px 0px 8px rgba(0, 0, 0, 0.2)",
        position: "relative",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(135deg, #00c6ff, #0072ff)",
          transition: "width 0.4s linear",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          color: "white",
          fontSize: "16px",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
          borderRadius: "12px",
        }}
      >
        {progress > 0 && progress !== 100 ? "Inhale/Exhale" : ""}
        {progress == 100 ? "Hold Breath" : ""}
      </div>
    </div>
  );
};
