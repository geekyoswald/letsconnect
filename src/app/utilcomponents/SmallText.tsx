import React from "react";

interface SmallTextType {
  data: string;
}

const SmallText = ({ data }: SmallTextType) => {
  return (
    <div>
      <p className="font-mono text-sm font-black ">{data}</p>
    </div>
  );
};

export default SmallText;
