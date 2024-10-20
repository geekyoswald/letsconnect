import React from "react";

interface CircularImageType {
  url: string;
  dim: string; // in pixels (px)
}

const CircularImage = ({ url, dim }: CircularImageType) => {
  return (
    <div
      style={{ width: dim, height: dim }}
      className="rounded-full overflow-hidden"
    >
      <img src={url} className="w-full h-full" alt="" />
    </div>
  );
};

export default CircularImage;
