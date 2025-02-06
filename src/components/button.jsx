import React, { useState } from "react";
import { useAppContext } from "../context/context";
import "../App.css";

const AddLevelBtn = () => {
  const { addLevel } = useAppContext();

  const [breathin, setBreathin] = useState("");
  const [hold, setHold] = useState("");
  const [out, setOut] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!breathin || !hold || !out || !title) {
      alert("Fill All Fields in Form");
      return;
    }

    addLevel(title, parseInt(breathin), parseInt(hold), parseInt(out));

    setBreathin("");
    setHold("");
    setOut("");
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label className="labels">Level Name:</label>
        <input
          type="text"
          maxLength={12}
          required
          className="inputs"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Name of Your Level"
        />

        <label className="labels">Breath In Time (in seconds):</label>
        <input
          min={1}
          type="number"
          required
          className="inputs"
          value={breathin}
          onChange={(e) => setBreathin(e.target.value)}
          placeholder="Enter Breath In Time in sec"
        />

        <label className="labels">Breath Hold Time (in seconds):</label>
        <input
          min={0}
          type="number"
          required
          className="inputs"
          value={hold}
          onChange={(e) => setHold(e.target.value)}
          placeholder="Enter Breath Hold Time in sec"
        />

        <label className="labels">Breath Out Time (in seconds):</label>
        <input
          type="number"
          min={1}
          required
          className="inputs"
          value={out}
          onChange={(e) => setOut(e.target.value)}
          placeholder="Enter Breath Out Time in sec"
        />
      </div>

      <button type="submit" className="submit-button">
        Add Level
      </button>
    </form>
  );
};

export default AddLevelBtn;
