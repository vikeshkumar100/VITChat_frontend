import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserRoundPen } from "lucide-react";
const ProfileSheet = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <div className="p-2 text-lg rounded-lg cursor-pointer flex justify-center md:justify-normal gap-3 items-center bg-blue-600/70">
            <UserRoundPen />
            <span className="hidden md:flex">Profile</span>
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Profile</SheetTitle>
            <SheetDescription>
              <div>Name - vikesh</div>
              <div>Email- random123@gmail.com</div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProfileSheet;
