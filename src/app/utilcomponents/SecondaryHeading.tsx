import React from "react";

interface SecondaryHeadingType {
  data: string;
}

const SecondaryHeading = ({ data }: SecondaryHeadingType) => {
  return (
    <div>
      <p className="font-mono text-xl font-black text-white">{data}</p>
    </div>
  );
};

export default SecondaryHeading;
