// src/Pages/ComingSoon.jsx
import React from "react";

const ComingSoon = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "12px", letterSpacing: 2 }}>
        Coming Soon
      </h1>
      <p style={{ fontSize: "1.1rem", opacity: 0.9, marginBottom: "24px" }}>
        We are working hard on this page. Stay tuned!
      </p>
      <button
        onClick={() => (window.location.href = "/")}
        style={{
          padding: "10px 24px",
          borderRadius: 999,
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
          background: "#ffd400",
          color: "#000",
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default ComingSoon;
