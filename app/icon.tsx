import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

const goldenEraLogo = readFile(
  join(process.cwd(), "public/images/brand/goldeneralogo.png"),
);

export default async function Icon() {
  const logoData = await goldenEraLogo;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#f3efe9",
        }}
      >
        <img
          src={`data:image/png;base64,${logoData.toString("base64")}`}
          alt=""
          width="392"
          height="64"
          style={{
            position: "absolute",
            top: 0,
            left: -2,
            width: 392,
            height: 64,
            objectFit: "contain",
            objectPosition: "left center",
          }}
        />
      </div>
    ),
    size,
  );
}
