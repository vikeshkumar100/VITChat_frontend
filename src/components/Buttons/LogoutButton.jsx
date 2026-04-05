import { LogOut } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const LogoutButton = ({ className = "", onAction, compactOnMobile = false }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    if (onAction) onAction();
    navigate("/login");
  };

  const triggerClassName = `flex w-full items-center rounded-md bg-red-600/70 text-sm text-white hover:bg-red-700/80 overflow-hidden ${
    compactOnMobile
      ? "justify-center gap-0 px-0 py-2 lg:justify-start lg:gap-2 lg:px-3"
      : "justify-start gap-2 px-3 py-2"
  } ${className}`;
  
  return (
    <AlertDialog>
      <AlertDialogTrigger className={triggerClassName}>
        <LogOut className="h-4 w-4 shrink-0" />
        <span className={compactOnMobile ? "hidden lg:inline" : "inline"}>Logout</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutButton;