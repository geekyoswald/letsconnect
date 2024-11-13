"use client";

import React, { useState } from "react";
import PrimaryHeading from "../utilcomponents/PrimaryHeading";

const Page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="h-screen w-screen bg-slate-100  flex items-center justify-center">
      <div className="h-1/3 w-3/12 border rounded bg-white border-zinc-950 flex flex-col p-5 gap-10">
        <p className="text-4xl font-extrabold">Sign In</p>
        <input
          className="w-3/4 border-b focus:outline-none"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-3/4 border-b focus:outline-none"
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-4">
          <button className="text-2xl w-48 text-white bg-green-500 border rounded ">
            Submit
          </button>

          <button className="text-2xl w-48 text-white bg-black border rounded ">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
