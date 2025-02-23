import socket from "../../lib/socket";
import React, { useEffect, useState } from "react";

const UserCount = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [registeredUsers, setRegisteredUsers] = useState(0);

  useEffect(() => {
    socket.on("activeUsers", (count) => {
      setActiveUsers(count);
    });

    socket.on("registeredUsers", (count) => {
      setRegisteredUsers(count);
    });

    return () => {
      socket.off("activeUsers");
      socket.off("registeredUsers");
    };
  }, []);

  return (
    <>
      <div className="text-gray-600 text-lg dark:text-white">
        Active Users: {activeUsers} | Registered Users: {registeredUsers}
      </div>
    </>
  );
};

export default UserCount;
