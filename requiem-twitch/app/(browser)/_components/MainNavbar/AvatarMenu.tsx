import { Dropdown, Avatar } from "flowbite-react";
import { useEffect } from "react";

export const AvatarMenu = ({setJwtToken}) => {
  // useEffect(() => {
  //     setJwtToken(localStorage.getItem("jwtToken"));
  // }, [localStorage.getItem("jwtToken")]);
    return(
        <Dropdown
        label={<Avatar alt="User settings" img="/default_avatar.jpg" rounded />}
        arrowIcon={false}
        inline
      >
        <Dropdown.Header>
          <span className="block text-sm">{localStorage.getItem("username")}</span>
          <span className="block truncate text-sm font-medium">name@flowbite.com</span>
        </Dropdown.Header>
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => {
          localStorage.clear();
          setJwtToken(localStorage.getItem("jwtToken")); //maybe just refresh)
        }}>Log out</Dropdown.Item>
      </Dropdown>

    );
}