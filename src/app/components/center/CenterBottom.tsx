"use client";

import { rootState } from "@/app/redux/rootState";
import axios from "axios";
import React, { useState } from "react";
import { ArrowRight, Image, Smile } from "react-feather";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const CenterBottom = () => {
  const state = useSelector((state: rootState) => state);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [image, setImage] = useState<File | null>(null);

  const handleEmojiClick = (event: any, emojiObject: any) => {
    setSelectedEmoji(emojiObject);
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("senderId", state.user.userId.toString());
    formData.append("receiverId", state.friend.friendId.toString());
    formData.append("text", message);
    if (image) {
      formData.append("imageUrl", image);
    }
    if (selectedEmoji) {
      formData.append("emoji", selectedEmoji.emoji);
    }

    const response = await axios.post("/api/messages", formData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    setMessage("");
    setImage(null);
    setSelectedEmoji(null);
    console.log(response.data, "Message sent successfully");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="border-2 w-11/12 h-12 rounded-2xl p-2 flex justify-between bg-amber-200">
      <input
        type="text"
        className=" bg-transparent outline-none w-8/12"
        placeholder="Please Enter Your Text .."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="flex items-center gap-2">
        <Smile onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
        {showEmojiPicker && (
          <div className="absolute bottom-16">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        <label htmlFor="image-upload">
          <Image />
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <div className="w-8 h-8 flex justify-center rounded-full items-center bg-amber-500">
          <ArrowRight onClick={() => handleSubmit()} />
        </div>
      </div>
    </div>
  );
};

export default CenterBottom;
