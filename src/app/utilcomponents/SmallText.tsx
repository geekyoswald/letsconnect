import React from "react";

interface SmallTextType {
  data: string;
}

const SmallText = ({ data }: SmallTextType) => {
  return (
    <div>
      <p className="font-mono text-sm font-black text-white">{data}</p>
    </div>
  );
};

export default SmallText;
