import React, { useState } from "react";
import SingleMessage from "./SingleMessage";
import Dummymessages from "./DummyMessages";

const MessagesComp = () => {
  return (
    <div className="h-3/4 w-11/12 h-4/6 border-2 p-2 bg-green-400 rounded-2xl overflow-y-auto">
      {/* <SingleMessage text="Hi Nancy, how are youHi Nancy, how are youHi Nancy, how are youHi Nancy, how are youHi Nancy, how are youHi Nancy, how are youHi Nancy, how are youHi Nancy, how are youHi Nancy, how are youHi Nancy, how are youHi Nancy, how are youHi Nancy, how are youHi Nancy, how are youHi Nancy, how are youHi Nancy, how are youHi Nancy, how are youHi Nancy, how are youHi Nancy, how are youHi Nancy, how are youHi Nancy, how are youHi Nancy, how are youHi Nancy, how are you" isSender={true} />
      <SingleMessage/>
      <SingleMessage/>
      <SingleMessage/>
      <SingleMessage/> */}
      {/* console.log(messages); */}
      {Dummymessages.map((message) => (
        <SingleMessage
          key={message.id}
          text={message.text}
          isSender={message.isSender}
        />
      ))}
    </div>
  );
};

export default MessagesComp;
