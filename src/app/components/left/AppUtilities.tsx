"use client";

import FeatureBox from "@/app/utilcomponents/FeatureBox";
import React from "react";
import { Trash, Calendar, LogOut } from "react-feather";
import { useDispatch } from "react-redux";
import { logout } from "@/app/redux/slices/userSlices";
import { resetFriend } from "@/app/redux/slices/friendSlice";
import { useRouter } from "next/navigation";
import SmallText from "@/app/utilcomponents/SmallText";

const AppUtilities = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("id");

    // Reset Redux state
    dispatch(logout());
    dispatch(resetFriend());

    // Redirect to signin page
    router.push("/signin");
  };

  return (
    <div className=" m-2 flex flex-col h-52 w-11/12">
      <FeatureBox icon={Trash} text="Bin" />
      <FeatureBox icon={Calendar} text="Calendar" />
      <button
        onClick={handleLogout}
        className="w-11/12 h-8 m-2 flex justify-between items-center cursor-pointer hover:opacity-80 transition-opacity"
      >
        <div className="flex gap-2 items-center">
          <LogOut className="text-white" />
          <SmallText data="Logout" />
        </div>
      </button>
    </div>
  );
};

export default AppUtilities;
