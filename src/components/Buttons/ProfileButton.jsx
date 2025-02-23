import React, { useState } from "react";
import ProfileSheet from "../ProfileSheet/ProfileSheet";

const ProfileButton = () => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });
  return (
    <div className="w-full">
        <ProfileSheet name={user.name} email={user.email} image={user.image} />
    </div>
  );
};

export default ProfileButton;
