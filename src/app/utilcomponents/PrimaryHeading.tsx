import React from "react";

interface PrimaryHeadingType {
  data: string;
}

const PrimaryHeading = ({ data }: PrimaryHeadingType) => {
  return (
    <div>
      <p className="font-mono text-3xl font-black text-white">{data}</p>
    </div>
  );
};

export default PrimaryHeading;
