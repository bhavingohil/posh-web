import React from "react";

export default function Marker({ text }) {
  return (
    <div
      style={{
        position: "absolute",
        width: 40,
        height: 40,
        left: -40 / 2,
        top: -40 / 2,
        border: "5px solid #f44336",
        borderRadius: 40,
        backgroundColor: "white",
        textAlign: "center",
        color: "#3f51b5",
        fontSize: 16,
        fontWeight: "bold",
        padding: 4,
      }}
    >
      {text}
    </div>
  );
}
