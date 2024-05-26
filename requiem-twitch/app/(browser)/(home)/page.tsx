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
            <p>{"USer: " + username}</p>
        </div>
      
    );
}
