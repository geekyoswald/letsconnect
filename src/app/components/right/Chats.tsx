"use client";

import FriendBox from "@/app/utilcomponents/FriendBox";
import PrimaryHeading from "@/app/utilcomponents/PrimaryHeading";
import React, { useEffect, useState } from "react";
import friend1 from "../../assets/pp7.png";

import friend6 from "../../assets/pp2.png";
import axios from "axios";

const Chats = () => {
  interface Friend {
    id: number;
    username: string;
  }

  const [allFriends, setAllFriends] = useState<Friend[]>([]);

  useEffect(() => {
    const getFriends = async () => {
      const allFriends = await axios.get("http://localhost:3000/api/users/all");
      setAllFriends(allFriends.data);
      console.log(allFriends.data);
    };
    getFriends();
  }, []);

  return (
    <div className=" m-2 h-3/6 w-11/12 ">
      <PrimaryHeading data="Chats" />
      {allFriends.map((friend) => {
        return <FriendBox url={friend6.src} name={friend.username} />;
      })}
    </div>
  );
};

export default Chats;
