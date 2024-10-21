import React from "react";

interface SingleMessageType {
  text: string;
  isSender: boolean; // true for sender, false for receiver
}

const SingleMessage = ({ text, isSender }: SingleMessageType) => {
  return (
    <div
      className={`  w-full  flex ${
        isSender ? "justify-end" : "justify-start"
      } my-4 `}
    >
      <p className="max-w-96 border-2 bg-amber-400 p-4 rounded-2xl">{text}</p>
    </div>
  );
};

export default SingleMessage;
