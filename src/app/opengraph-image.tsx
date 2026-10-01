import { ImageResponse } from "next/og";

export const alt = "Rakha Bima | AI Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0d0d0d",
          color: "#f4f1ea",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            padding: "10px 20px",
            background: "#00f5ff",
            color: "#0d0d0d",
            fontSize: 28,
            fontWeight: 900,
          }}
        >
          RAKHA BIMA · AI SOFTWARE ENGINEER
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 900,
            lineHeight: 0.95,
            textShadow: "6px 6px 0 #ff4fea",
          }}
        >
          FROM MESSY WORKFLOWS TO USABLE PRODUCTS.
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#d7ff3f", fontWeight: 700 }}>
          WEB APPS · INTERNAL TOOLS · AI AUTOMATION — JAKARTA
        </div>
      </div>
    ),
    size
  );
}
