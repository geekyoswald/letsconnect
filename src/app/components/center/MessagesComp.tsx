import React from "react";
import SingleMessage from "./SingleMessage";
import Messages from "./DummyMessages";

const MessagesComp = () => {
  return (
    <div
      style={{ maxHeight: "640px" }}
      className=" w-11/12 border-2 gap-4 items-center rounded-2xl p-2 flex flex-col overflow-y-auto bg-green-400"
    >
      {Messages.map((message) => {
        return (
          <SingleMessage
            key={message.id}
            text={message.text}
            isSender={message.isSender}
          />
        ); // assuming id is unique for each message.
      })}
    </div>
  );
};

export default MessagesComp;
