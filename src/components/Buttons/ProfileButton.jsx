import React, { useState } from "react";
import ProfileSheet from "../Sections/ProfileSheet";

const ProfileButton = ({ className = "", onAction }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  if (!user) return null;

  return (
    <div className={`w-full ${className}`}>
        <ProfileSheet name={user.name} email={user.email} image={user.image} onAction={onAction} />
    </div>
  );
};

export default ProfileButton;
