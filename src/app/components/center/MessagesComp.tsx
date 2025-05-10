"use client";

import React, { useEffect, useState } from "react";
import SingleMessage from "./SingleMessage";

import { ArrowRight } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "@/app/redux/rootState";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import { updateUser } from "@/app/redux/slices/userSlices";

const MessagesComp = () => {
  interface Message {
    id: number;
    senderId: number;
    receiverId: number;
    text: string;
    createdAt: string;
  }
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    if (!input) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    if (data.choices) {
      setMessages([...newMessages, data.choices[0].message]);
    }
  };
  // const SUPABASE_URL = "NEXT_PUBLIC_SUPABASE_URL";
  // const SUPABASE_ANON_KEY = "NEXT_PUBLIC_SUPABASE_ANON_KEY";
  // const SUPABASE_URL =
  //   process.env.NEXT_PUBLIC_SUPABASE_URL || "NEXT_PUBLIC_SUPABASE_URL";
  // const SUPABASE_ANON_KEY =
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  //   "NEXT_PUBLIC_SUPABASE_ANON_KEY";

  // // const [messages, setMessages] = useState<{ role: string; content: string }[]>(
  // //   []
  // // );
  // const [message, setMessage] = useState("");
  // const [input, setInput] = useState("");
  // const sendMessage = async () => {
  //   if (!input) return;

  //   const newMessages = [...messages, { role: "user", content: input }];
  //   setMessages(newMessages);
  //   setInput("");

  //   const res = await fetch("/api/chat", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ messages: newMessages }),
  //   });

  //   const data = await res.json();
  //   if (data.choices) {
  //     setMessages([...newMessages, data.choices[0].message]);
  //   }
  // };

  // const dispatch = useDispatch();
  // const state = useSelector((state: rootState) => state);
  // const [allMessages, setAllMessages] = useState<Message[]>([]);
  // useEffect(() => {
  //   const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  //   dispatch(
  //     updateUser({
  //       id: Number(localStorage.getItem("id")),
  //       name: localStorage.getItem("username"),
  //     })
  //   );
  //   const fetchAllMessages = async () => {
  //     const response = await axios.get(
  //       `/api/messages?friendId=${state.friend.friendId}`,
  //       {
  //         headers: {
  //           userId: state.user.userId,
  //           authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     setAllMessages(response.data);
  //     console.log(response.data, "All Messages");
  //   };
  //   fetchAllMessages();
  //   const handleInserts = (payload: { new: Message }) => {
  //     const newMessage = payload.new;
  //     setAllMessages((prevMessage) => [...prevMessage, newMessage]);
  //   };
  //   const subscription = supabase
  //     .channel("MessageTable")
  //     .on(
  //       "postgres_changes",
  //       { event: "INSERT", schema: "public", table: "Message" },
  //       handleInserts
  //     )
  //     .subscribe();
  //   return () => {
  //     supabase.removeChannel(subscription);
  //   };
  // }, [state.friend]);
  return (
    <>
      <div
        className="w-11/12 h-[calc(100vh-80px)] gap-4 items-center rounded-2xl p-2 flex flex-col overflow-y-auto 
    [&::-webkit-scrollbar]:hidden [&]scrollbar-thin [&]scrollbar-track-transparent [&]scrollbar-thumb-transparent"
      >
        {/* {messages.map((msg, i) => (
          <p
            key={i}
            className={msg.role === "user" ? "text-blue-500" : "text-green-500"}
          >
            {msg.content}
          </p>
        ))} */}
        {messages.map((msg) => (
          <SingleMessage
            // key={msg.id}
            text={msg.content}
            isSender={msg.role === "user"}
          />
        ))}
      </div>
      <div className="fixed bottom-0 border-2 border-black  border-2 w-4/6 h-12 rounded-2xl p-2 flex justify-between bg-stone-200 mx-auto mb-4">
        <input
          type="text"
          className="bg-transparent  outline-none w-10/12"
          placeholder="Please Enter Your Text .."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          // onKeyDown={handleKeyDown}
        />

        <div className="w-8 h-8 flex justify-center rounded-full items-center bg-white">
          <ArrowRight onClick={() => handleSubmit()} />
        </div>
      </div>
    </>
  );
};

// const CenterBottom = () => {
//   const state = useSelector((state: rootState) => state);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async () => {
//     const response = await axios.post(
//       "/api/messages",
//       {
//         senderId: state.user.userId, //remove this & extract in server side
//         receiverId: state.friend.friendId,
//         text: message,
//       }
//       // {
//       //   headers: {
//       //     authorization: `Bearer ${localStorage.getItem("token")}`,
//       //   },
//       // }
//     );
//     setMessage("");
//     console.log(response.data, "Message sent successfully"); // Here you can add the logic to display the message in the chat box.
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       handleSubmit();
//     }
//   };
//   return (
//     <div className="fixed bottom-0   border-2 w-4/6 h-12 rounded-2xl p-2 flex justify-between bg-amber-400 mx-auto mb-4">
//       <input
//         type="text"
//         className="bg-transparent outline-none w-10/12"
//         placeholder="Please Enter Your Text .."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         onKeyDown={handleKeyDown}
//       />

//       <div className="w-8 h-8 flex justify-center rounded-full items-center bg-amber-500">
//         <ArrowRight onClick={() => handleSubmit()} />
//       </div>
//     </div>
//   );
// };

export default MessagesComp;
