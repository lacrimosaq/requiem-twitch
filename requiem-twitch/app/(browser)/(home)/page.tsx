"use client"
import { useState, useRef, useEffect } from 'react';
import RegisterForm from "@/app/(browser)/_components/AuthForm/RegisterForm/RegisterForm";
import LoginForm from "@/app/(browser)/_components/AuthForm/LoginForm/LoginForm";
import AuthForm from "@/app/(browser)/_components/AuthForm/AuthForm";
import { StreamsFeed } from './_components/streams-feed';

export default function Home() {
  const [username, setUsername] = useState<string| null>("No auth");

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);


    return (
        <div className='h-full p-8 max-w-screen '>
            <StreamsFeed/>
        </div>
      
    );
}
