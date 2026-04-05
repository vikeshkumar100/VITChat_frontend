import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserRoundPen } from "lucide-react";

const ProfileSheet = ({ name, email, image }) => {
  const fallbackName = name || "User";
  const initials = fallbackName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "U";

  const hasImage = Boolean(image && image.trim());

  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <div className="p-2 text-lg rounded-lg cursor-pointer flex justify-center lg:justify-normal gap-3 items-center text-white bg-blue-600/70 hover:bg-blue-600/90 transition-colors">
          <UserRoundPen className="w-5 h-5" />
          <span className="hidden lg:flex">Profile</span>
        </div>
      </SheetTrigger>
      <SheetContent className="bg-background/95 backdrop-blur-lg border-gray-200 dark:border-gray-800">
        <SheetHeader className="space-y-8">
          <SheetTitle className="text-2xl font-semibold tracking-tight">
            User Profile
          </SheetTitle>
          
          <div className="flex flex-col items-center space-y-8">
            {/* Profile Picture */}
            <div className="relative">
              {hasImage ? (
                <img
                  src={image}
                  alt="Profile"
                  className="h-32 w-32 rounded-full object-cover border-4 border-gray-100 dark:border-gray-800 shadow-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget.nextElementSibling;
                    if (fallback) fallback.classList.remove("hidden");
                  }}
                />
              ) : null}
              <div
                className={`h-32 w-32 rounded-full border-4 border-gray-100 dark:border-gray-800 shadow-lg bg-blue-600/80 text-white flex items-center justify-center text-3xl font-semibold ${hasImage ? "hidden" : ""}`}
              >
                {initials}
              </div>
            </div>

            {/* User Details */}
            <div className="w-full space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Full Name
                </label>
                <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                  <p className="font-medium text-foreground break-words">{fallbackName}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Email Address
                </label>
                <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                  <p className="font-medium text-foreground break-all">{email || "No email available"}</p>
                </div>
              </div>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ProfileSheet;