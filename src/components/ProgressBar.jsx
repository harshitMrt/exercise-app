import { useState } from "react";
import { useAppContext } from "../context/context";
import Progress from "./timer";

export default function ProgressBar({ index }) {
  const { levels } = useAppContext();

  const [breathIn, setBreathIn] = useState(0);
  const [breathHold, setBreathHold] = useState(0);
  const [breathOut, setBreathOut] = useState(0);

  if (!levels[index]) {
    return <p>Select Level</p>;
  }

  const { inn, hold, out } = levels[index];

  const handleStart = () => {
    setBreathIn(inn);
    setBreathHold(hold);
    setBreathOut(out);

    console.log(
      `Inhale: ${breathIn}, Hold Breath: ${breathHold}, Exhale: ${breathOut}`
    );
  };

  return (
    <>
      <div className="form-container">
        <h2>Level Details</h2>
        <p>
          Inhale : {inn} s || Hold Breath : {hold} s || Exhale : {out} s
        </p>
        <Progress index={index} />
      </div>
    </>
  );
}
