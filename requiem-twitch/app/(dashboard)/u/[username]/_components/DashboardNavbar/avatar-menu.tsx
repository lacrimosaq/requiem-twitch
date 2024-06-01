import { Dropdown, Avatar } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const AvatarMenu = ({setJwtToken}) => {
  const [username, setUsername] = useState<string| null>();
  useEffect(() => {
      setUsername(localStorage.getItem("username"))
      setJwtToken(localStorage.getItem("jwtToken"));
  }, []); //[localStorage.getItem("jwtToken")]] //error fix(delete this may provide bugs)
    return(
        <Dropdown
        label={<Avatar alt="User settings" img="/default_avatar.jpg" rounded />}
        arrowIcon={false}
        inline
      >
          <Dropdown.Header>
            <span className="block text-sm">{username}</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item><a href={`/`}>Back to Watching</a></Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
              <Link href="/" onClick={() => {
              localStorage.clear();
              setJwtToken(localStorage.getItem("jwtToken")); //maybe just refresh)
            }}>Log out
              </Link> 
            </Dropdown.Item>
        </Dropdown>

    );
}