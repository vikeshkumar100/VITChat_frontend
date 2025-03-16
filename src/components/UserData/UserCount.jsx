import socket from "../../lib/socket";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NumberTicker } from "../magicui/number-ticker";

const UserCount = () => {
  const apiurl = import.meta.env.VITE_API_URL;
  const [activeUsers, setActiveUsers] = useState(0);
  const [registeredUsers, setRegisteredUsers] = useState(0);

  const fetchRegisteredUsers = async () => {
    try {
      const res = await axios.get(`${apiurl}/users/registered-users`);
      setRegisteredUsers(res.data.registeredUsers);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRegisteredUsers();
    socket.emit("requestActiveUsers");
    socket.on("activeUsers", (count) => {
      setActiveUsers(count);
    });

    return () => {
      socket.off("activeUsers");
    };
  }, []);

  return (
    <div className="text-black text-lg dark:text-white">
      Active Users : {""}
      <NumberTicker
        value={activeUsers}
        className="whitespace-pre-wrap font-medium tracking-tighter text-black dark:text-white"
      />{" "}
      | Registered Users : {""}
      <NumberTicker
        value={registeredUsers}
        className="whitespace-pre-wrap font-medium tracking-tighter text-black dark:text-white"
      />
    </div>
  );
};

export default UserCount;
