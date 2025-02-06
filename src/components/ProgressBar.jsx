import { useAppContext } from "../context/context";
import Progress from "./timer";

export default function ProgressBar({ index }) {
  const { levels } = useAppContext();

  // const [breathIn, setBreathIn] = useState(0);
  // const [breathHold, setBreathHold] = useState(0);
  // const [breathOut, setBreathOut] = useState(0);

  if (!levels[index]) {
    return (
      <p style={{ fontSize: "18px", color: "#e74c3c", textAlign: "center" }}>
        Select Level
      </p>
    );
  }

  const { inn, hold, out } = levels[index];

  return (
    <div
      style={{
        marginTop: "8px",
        marginBottom: "20px",
        maxWidth: "450px",
        background: "linear-gradient(135deg, #ffffff, #f9f9f9)",
        padding: "25px",
        borderRadius: "18px",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        transition: "transform 0.3s ease-in-out",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <h3
        style={{
          fontWeight: "bold",
          color: "#2c3e50",
          marginBottom: "4px",
        }}
      >
        Breathing Level Details
      </h3>

      <div
        style={{
          background: "rgba(0, 123, 255, 0.39)",
          padding: "1px",
          borderRadius: "14px",
          fontSize: "14px",
          color: "#333",
          fontWeight: "bold",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          boxShadow: "inset 0px 0px 8px rgba(0, 123, 255, 0.2)",
          width: "100%",
        }}
      >
        <p>
          <span style={{ color: "#007bff", fontWeight: "bold" }}>Inhale:</span>{" "}
          {inn} s
        </p>
        <p>
          <span style={{ color: "#007bff", fontWeight: "bold" }}>Hold:</span>{" "}
          {hold} s
        </p>
        <p>
          <span style={{ color: "#007bff", fontWeight: "bold" }}>Exhale:</span>{" "}
          {out} s
        </p>
      </div>

      <div
        style={{
          width: "100%",
          padding: "15px",
          background: "rgba(238, 169, 104, 0.72)",
          borderRadius: "10px",
          boxShadow: "inset 0px 0px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Progress index={index} />
      </div>
    </div>
  );
}
