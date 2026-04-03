import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, rgb(255, 81, 94) 0%, rgb(229, 35, 54) 100%)",
          color: "white",
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: "-0.08em",
          borderRadius: 8,
        }}
      >
        TM
      </div>
    ),
    {
      ...size,
    }
  );
}
