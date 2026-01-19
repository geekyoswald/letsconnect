"use client";

import React, { useState, useMemo } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";

interface PasswordValidation {
  isValid: boolean;
  errors: string[];
}

const validatePassword = (password: string): PasswordValidation => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  if (!/[!@#$%^&*()_+\-=\[\]{}|;:'",.<>?/]/.test(password)) {
    errors.push("Password must contain at least one special character (!@#$%^&*...)");
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

const Page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const router = useRouter();

  const passwordValidation = useMemo(() => validatePassword(password), [password]);

  const handleOnCLick = async () => {
    setError(""); // Clear any previous errors
    
    // Validate username
    if (!username || username.trim().length < 3) {
      setError("Username must be at least 3 characters long");
      return;
    }

    // Validate password
    if (!passwordValidation.isValid) {
      setError("Password does not meet requirements. Please check the requirements below.");
      setShowPasswordRequirements(true);
      return;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const resp = await axios.post("/api/signup", {
        username,
        password,
      });
      console.log(resp.data);
      router.push("/signin");
    } catch (e) {
      console.error(e);
      // Handle axios error response
      if (axios.isAxiosError(e) && e.response?.data?.error) {
        setError(e.response.data.error);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };
  return (
    <div className="h-screen w-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md md:w-3/12 h-auto min-h-[500px] border rounded-lg bg-white border-zinc-950 flex flex-col p-6 md:p-5 gap-4 md:gap-6">
        <p className="text-3xl md:text-4xl font-extrabold text-center md:text-left">Sign Up</p>
        
        {error && (
          <div className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded border border-red-200">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <input
            className="w-full border-b focus:outline-none py-2 text-base"
            type="text"
            placeholder="Username (min 3 characters)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {username && username.trim().length > 0 && username.trim().length < 3 && (
            <p className="text-xs text-red-500">Username must be at least 3 characters</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            className={`w-full border-b focus:outline-none py-2 text-base ${
              password && !passwordValidation.isValid ? "border-red-500" : ""
            }`}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setShowPasswordRequirements(true);
            }}
            onFocus={() => setShowPasswordRequirements(true)}
          />
          
          {showPasswordRequirements && password && (
            <div className="text-xs mt-1 space-y-1">
              <p className="font-semibold text-gray-700">Password Requirements:</p>
              <ul className="list-disc list-inside space-y-0.5 text-gray-600">
                <li className={password.length >= 8 ? "text-green-600" : "text-red-500"}>
                  At least 8 characters
                </li>
                <li className={/[A-Z]/.test(password) ? "text-green-600" : "text-red-500"}>
                  One uppercase letter (A-Z)
                </li>
                <li className={/[a-z]/.test(password) ? "text-green-600" : "text-red-500"}>
                  One lowercase letter (a-z)
                </li>
                <li className={/[0-9]/.test(password) ? "text-green-600" : "text-red-500"}>
                  One number (0-9)
                </li>
                <li className={/[!@#$%^&*()_+\-=\[\]{}|;:'",.<>?/]/.test(password) ? "text-green-600" : "text-red-500"}>
                  One special character (!@#$%^&*...)
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            className={`w-full border-b focus:outline-none py-2 text-base ${
              confirmPassword && password !== confirmPassword ? "border-red-500" : ""
            }`}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPassword && password !== confirmPassword && (
            <p className="text-xs text-red-500">Passwords do not match</p>
          )}
          {confirmPassword && password === confirmPassword && passwordValidation.isValid && (
            <p className="text-xs text-green-600">✓ Passwords match</p>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-2">
          <button
            className="text-lg md:text-2xl w-full md:w-48 text-white bg-green-500 border rounded py-3 md:py-2 hover:bg-green-600 active:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={handleOnCLick}
            disabled={!passwordValidation.isValid || password !== confirmPassword || !username || username.trim().length < 3}
          >
            Submit
          </button>

          <button
            className="text-lg md:text-2xl w-full md:w-48 text-white bg-black border rounded py-3 md:py-2 hover:bg-gray-800 active:bg-gray-900 transition-colors"
            onClick={() => {
              router.push("/signin");
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
