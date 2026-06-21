"use client";

import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

export default function ATSScore({ score }) {
  return (
    <div className="w-48 h-48 mx-auto mt-8">

      <CircularProgressbar
        value={score}
        text={`${score}%`}
        styles={buildStyles({
          textColor: "#fff",
          pathColor:
            score >= 80
              ? "#22c55e"
              : score >= 60
              ? "#eab308"
              : "#ef4444",

          trailColor: "#1e293b"
        })}
      />

      <h3 className="text-center mt-4 text-gray-300">
        ATS Score
      </h3>

    </div>
  );
}