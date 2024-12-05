"use client";

import FriendBox from "@/app/utilcomponents/FriendBox";
import PrimaryHeading from "@/app/utilcomponents/PrimaryHeading";
import React, { useEffect, useState } from "react";

import friend6 from "../../assets/pp2.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateFriend } from "@/app/redux/slices/friendSlice";
import { supabase } from "@/app/utilcomponents/supabaseClient";

const Chats = () => {
  interface Friend {
    id: number;
    username: string;
  }
  const dispatch = useDispatch();

  const [allFriends, setAllFriends] = useState<Friend[]>([]);

  const handleFriendSelect = (friendId: number, friendName: string) => {
    console.log("Clicked on friend");
    dispatch(updateFriend({ friendId, friendName }));
  };

  const getProfilePicture = async (friendId: number) => {
    const { data, error } = await supabase
      .from("profiles") // Assuming you have a 'profiles' table
      .select("profile_picture") // Assuming 'profile_picture' is the column name
      .eq("id", friendId)
      .single();

    if (error) {
      console.error("Error fetching profile picture:", error);
      return null;
    }
    return data.profile_picture;
  };

  useEffect(() => {
    const getFriends = async () => {
      const allFriends = await axios.get("/api/users/all", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const friendsWithPictures = await Promise.all(
        allFriends.data.map(async (friend: Friend) => {
          const profilePicture = await getProfilePicture(friend.id);
          return { ...friend, profilePicture };
        })
      );
      setAllFriends(friendsWithPictures);
      console.log(friendsWithPictures);
    };
    getFriends();
  }, []);

  return (
    <div className=" m-2 h-3/6 w-11/12 overflow-y-auto">
      <PrimaryHeading data="Chats" />
      {allFriends.map((friend) => {
        return (
          <FriendBox
            key={friend.id}
            url={friend.profilePicture || friend6.src} // Use the profile picture if available
            name={friend.username}
            onClick={() => handleFriendSelect(friend.id, friend.username)}
          />
        );
      })}
    </div>
  );
};

export default Chats;
