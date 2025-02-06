import React, { useState } from "react";
import { useAppContext } from "../context/context";
import exhale from "../audio.mp3/Exhale.mp3";
import Inhale from "../audio.mp3/start Breathing.mp3";
import HoldBreath from "../audio.mp3/Hold Breath.mp3";

const StartBreathing = new Audio(Inhale);
const Exhale = new Audio(exhale);
const holdBreath = new Audio(HoldBreath);

export default function Progress({ index = 0 }) {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const { levels } = useAppContext();

  const selectedLEVEL = levels[index];

  const breathIn = selectedLEVEL.inn;
  const breathHold = selectedLEVEL.hold;
  const breathOut = selectedLEVEL.out;

  let interval;
  let intervalSecond;
  let timeout;
  let progressValue = 0;

  let timer = breathOut + breathHold + breathOut;

  function runProgress() {
    if (isRunning) return;

    setIsRunning(true);

    const inTime = 100 / (breathIn * 10);
    const holdTime = breathHold * 1000;
    const outTime = 100 / (breathOut * 10);

    StartBreathing.play();

    interval = setInterval(() => {
      if (progressValue >= 100) {
        holdBreath.play();
        clearInterval(interval);

        timeout = setTimeout(() => {
          Exhale.play();
          intervalSecond = setInterval(() => {
            if (progressValue <= 0) {
              clearInterval(intervalSecond);
              setIsRunning(false);
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

  const handleReset = () => {
    setProgress(0);
    setIsRunning(false);

    clearInterval(interval);
    clearInterval(intervalSecond);
    clearTimeout(timeout);
  };

  const handleStart = () => {
    runProgress();

    setInterval(() => {
      runProgress();
    }, timer * 1000 + 1000);
  };

  return (
    <div>
      <h2>Progress</h2>

      <div style={{ margin: "10px" }}>
        Every Cycle is played after a delay of 1 sec
      </div>
      <ProgressBar progress={progress} />
      <button onClick={handleStart} className="start-progress-button">
        {isRunning ? "Running..." : "Start"}
      </button>
      <button
        onClick={handleReset}
        className="start-progress-button"
        style={{ margin: "24px" }}
      >
        Reset
      </button>
    </div>
  );
}

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}>
        {progress}%
      </div>
    </div>
  );
};
