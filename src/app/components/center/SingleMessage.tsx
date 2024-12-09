import React from "react";

interface SingleMessageType {
  text?: string;
  imageUrl?: string;
  emoji?: string;
  isSender: boolean; // true if sender, false if receiver
}

const SingleMessage = ({ text, imageUrl, emoji, isSender }: SingleMessageType) => {
  return (
    <div
      className={` w-full  flex ${
        isSender ? "justify-end" : "justify-start"
      }  `}
    >
      {text && <p className="max-w-80 bg-amber-400 p-4 rounded-2xl">{text}</p>}
      {imageUrl && <img src={imageUrl} alt="sent image" className="max-w-80 p-4 rounded-2xl" />}
      {emoji && <p className="max-w-80 bg-amber-400 p-4 rounded-2xl">{emoji}</p>}
    </div>
  );
};

export default SingleMessage;
