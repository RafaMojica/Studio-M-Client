import React from "react";
import Image from "next/image";

export default function Qr_social_networks({
  styles,
  rotation,
  url,
  height = 100,
  width = 100,
  alt,
}) {
  return (
    <div className={`${rotation}`}>
      <Image
        src={"/images/" + url}
        width={width}
        height={height}
        alt={`${alt}`}
        className={`${styles}`}
      ></Image>
    </div>
  );
}
