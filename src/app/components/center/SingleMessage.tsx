import React from "react";

interface SingleMessageType {
  text: string;
  isSender: boolean; // true if sender, false if receiver
}

const SingleMessage = ({ text, isSender }: SingleMessageType) => {
  return (
    <div
      className={` w-full  flex ${
        isSender ? "justify-end" : "justify-start"
      }  `}
    >
      <p className="max-w-80 bg-amber-400 p-4 rounded-2xl">{text}</p>
    </div>
  );
};

export default SingleMessage;
