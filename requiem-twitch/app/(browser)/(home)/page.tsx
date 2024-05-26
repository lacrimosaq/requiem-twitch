"use client"
import { useState, useRef, useEffect } from 'react';
import RegisterForm from "@/app/(browser)/_components/RegisterForm/RegisterForm";
import LoginForm from "@/app/(browser)/_components/LoginForm/LoginForm";
import AuthForm from "@/app/(browser)/_components/AuthForm/AuthForm";

export default function Home() {
  const [username, setUsername] = useState<string| null>("No auth");

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);


    return (
        <div>
        {/*  <button onClick={handleLogInButtonClick} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
               Log In
             </button>
             <button onClick={handleSignUpButtonClick} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
               Sign Up
            </button> */}
            <p>{"USer: " + username}</p>
            
        </div>
      
    );
}
