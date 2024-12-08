"use client";

import React, { useEffect, useState } from "react";
import SingleMessage from "./SingleMessage";

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
  const SUPABASE_URL = "NEXT_PUBLIC_SUPABASE_URL";
  const SUPABASE_ANON_KEY = "NEXT_PUBLIC_SUPABASE_ANON_KEY";

  const dispatch = useDispatch();
  const state = useSelector((state: rootState) => state);
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  useEffect(() => {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    dispatch(
      updateUser({
        id: Number(localStorage.getItem("id")),
        name: localStorage.getItem("username"),
      })
    );
    const fetchAllMessages = async () => {
      const response = await axios.get(
        `/api/messages?friendId=${state.friend.friendId}`,
        {
          headers: {
            userId: state.user.userId,
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAllMessages(response.data);
      console.log(response.data, "All Messages");
    };
    fetchAllMessages();
    const handleInserts = (payload: { new: Message }) => {
      const newMessage = payload.new;
      setAllMessages((prevMessage) => [...prevMessage, newMessage]);
    };
    const subscription = supabase
      .channel("MessageTable")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "Message" },
        handleInserts
      )
      .subscribe();
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [state.friend]);
  return (
    <div
      style={{ height: "640px", maxHeight: "640px" }}
      className=" w-11/12 border-2 gap-4 items-center rounded-2xl p-2 flex flex-col overflow-y-auto bg-green-400"
    >
      {allMessages.map((message) => {
        return (
          <SingleMessage
            key={message.id}
            text={message.text}
            isSender={message.senderId === state.user.userId}
          />
        ); // assuming id is unique for each message.
      })}
    </div>
  );
};

export default MessagesComp;
