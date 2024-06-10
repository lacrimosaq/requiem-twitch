"use client";
import { Dropdown, Avatar } from "flowbite-react";
import { LogOut, Settings, SquareKanban, User } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export const AvatarMenu = ({setJwtToken}) => {
  // useEffect(() => {
  //     setJwtToken(localStorage.getItem("jwtToken"));
  // }, [localStorage.getItem("jwtToken")]);
    return(
        <Dropdown
        label={<Avatar alt="User settings" img={"data:image/jpeg;base64," + localStorage.getItem("avatar")} rounded />}
        arrowIcon={false}
        inline
        className=" bg-slate-900 text-neutral-100 border-slate-700  px-2"
      >
        <Dropdown.Header className="flex">
          <Image alt="User settings" src={"data:image/jpeg;base64," + localStorage.getItem("avatar")} width={45} height={45}  className="rounded-full " />
          <span className="my-auto mx-2 text-sm">{localStorage.getItem("username")}</span>
        </Dropdown.Header>
        <hr className=" border-slate-500 mb-1"/>
        <Dropdown.Item className="hover:bg-slate-500 rounded my-1 p-0">
          <a href={`${localStorage.getItem("username")}`} className="w-full p-2 text-start flex">
            <User className="w-5 h-5"/>
            <span className="px-1">Channel</span>
          </a>
        </Dropdown.Item>

        <Dropdown.Item className="hover:bg-slate-500 rounded my-1 p-0">
          <a href={`u/${localStorage.getItem("username")}/stream`} className="w-full p-2 text-start flex">
            <SquareKanban className="w-5 h-5 rotate-180"/>
            <span className="px-1">Dashboard</span>
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