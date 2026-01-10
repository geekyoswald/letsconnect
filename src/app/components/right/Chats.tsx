"use client";

import FriendBox from "@/app/utilcomponents/FriendBox";
import PrimaryHeading from "@/app/utilcomponents/PrimaryHeading";
import React, { useEffect, useState, useRef } from "react";

import friend6 from "../../assets/pp2.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateFriend } from "@/app/redux/slices/friendSlice";

const Chats = () => {
  interface Friend {
    id: number;
    username: string;
  }
  const dispatch = useDispatch();
  const hasSelectedRandomFriend = useRef(false);

  const [allFriends, setAllFriends] = useState<Friend[]>([]);

  const handleFriendSelect = (friendId: number, friendName: string) => {
    console.log("Clicked on friend");
    dispatch(updateFriend({ friendId, friendName }));
  };

  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await axios.get("/api/users/all", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        
        setAllFriends(response.data);
        console.log(response.data);
        
        // Select a random friend if friends list is not empty and we haven't selected one yet
        if (response.data.length > 0 && !hasSelectedRandomFriend.current) {
          const randomIndex = Math.floor(Math.random() * response.data.length);
          const randomFriend = response.data[randomIndex];
          dispatch(
            updateFriend({
              friendId: randomFriend.id,
              friendName: randomFriend.username,
            })
          );
          hasSelectedRandomFriend.current = true;
        }
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    getFriends();
  }, [dispatch]);

  return (
    <div className=" m-2 h-3/6 w-11/12 overflow-y-auto">
      <PrimaryHeading data="Chats" />
      {allFriends.map((friend) => {
        return (
          <FriendBox
            key={friend.id}
            url={friend6.src}
            name={friend.username}
            onClick={() => handleFriendSelect(friend.id, friend.username)}
          />
        );
      })}
    </div>
  );
};

export default Chats;
