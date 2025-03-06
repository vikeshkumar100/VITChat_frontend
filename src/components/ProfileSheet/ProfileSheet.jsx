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
const ProfileSheet = ({ name, email, image }) => {
  return (
    <>
      <Sheet>
        <SheetTrigger className="w-full">
          <div className="p-2 text-lg rounded-lg cursor-pointer flex justify-center lg:justify-normal gap-3 items-center text-white bg-blue-600/70">
            <UserRoundPen />
            <span className="hidden lg:flex">Profile</span>
          </div>
        </SheetTrigger>
        <SheetContent className="bg-zinc-400 dark:bg-zinc-950">
          <SheetHeader>
            <SheetTitle className="text-lg md:text-2xl">Profile</SheetTitle>
            <SheetDescription className="flex flex-col gap-4 bg-gray-600/60 dark:bg-gray-700/90 p-4 rounded-lg">
              <div>
                <img src={image} alt="user image" className="rounded-full" />
              </div>
              <div className="text-xl">Name</div>
              <div className="bg-black text-white py-4 px-2 rounded-md md:text-lg">
                {name}
              </div>
              <div className="text-xl">Email</div>
              <div className="bg-black text-white py-4 px-2 rounded-md md:text-lg">
                {email}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProfileSheet;
