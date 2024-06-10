"use client";
import { Dropdown, Avatar } from "flowbite-react";
import { Home, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const AvatarMenu = ({setJwtToken}) => {
  const [username, setUsername] = useState<string| null>();
  const [avatar, setAvatar] = useState<string| null>();
  useEffect(() => {
      setUsername(localStorage.getItem("username"))
      setJwtToken(localStorage.getItem("jwtToken"));
      setAvatar(localStorage.getItem("avatar"));
  }, []); //[localStorage.getItem("jwtToken")]] //error fix(delete this may provide bugs)
    return(
          <Dropdown
          label={<Avatar alt="User settings" img={"data:image/jpeg;base64," + avatar} rounded />}
          arrowIcon={false}
          inline
          className=" bg-slate-900 text-neutral-100 border-slate-700  px-2"
        >
          <Dropdown.Header className="flex">
            <Image alt="User settings" src={"data:image/jpeg;base64," + avatar} width={45} height={45}  className="rounded-full " />
            <div className="flex flex-col">
            <span className="my-auto mx-2 text-sm">{username}</span>
            <span className="my-auto mx-2 text-xs text-neutral-400">Creator</span>
            </div>
          </Dropdown.Header>
        <hr className=" border-slate-500 mb-1"/>
          <Dropdown.Item className="hover:bg-slate-500 rounded my-1 p-0">
            <a href={`/`} className="w-full p-2 text-start flex">
              <Home className="w-5 h-5"/>
              <span className="px-1">Back to Watching</span>
            </a>
          </Dropdown.Item>
          <Dropdown.Item className="hover:bg-slate-500 rounded my-1 p-0">
            <a href={`/${username}`} className="w-full p-2 text-start flex">
              <User className="w-5 h-5"/>
              <span className="px-1">Channel</span>
            </a>
          </Dropdown.Item>
          <Dropdown.Item className="hover:bg-slate-500 rounded my-1 p-0">
          <a href={``} className="w-full p-2 text-start flex">
            <Settings className="w-5 h-5 "/>
            <span className="px-1">Settings</span>
          </a>
        </Dropdown.Item>
        {/* <Dropdown.Divider /> */}
        <hr className=" border-slate-500 mb-1"/>
        <Dropdown.Item className="hover:bg-slate-500 rounded my-1 p-0"
         onClick={() => {
          localStorage.clear();
          location.reload();
          // setJwtToken(localStorage.getItem("jwtToken")); //maybe just refresh)
        }}>
          <div className="w-full p-2 text-start flex">
            <LogOut className="w-5 h-5 "/>
            <span className="px-1">Log out</span>
          </div>
        </Dropdown.Item>
        </Dropdown>

    );
}