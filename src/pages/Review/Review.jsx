import SecondaryButton from "../../components/Buttons/SecondaryButton";
import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

// superb memes
import happycat from "../../assets/images/happycat.jpeg";
import happycat2 from "../../assets/images/happycat2.png";
import happycat3 from "../../assets/images/happycat3.jpg";
import happycat4 from "../../assets/images/happycat4.jpeg";
import happykid from "../../assets/images/happykid.jpeg";
import happyman from "../../assets/images/happyman.jpg";

// worst memes
import chalaja from "../../assets/images/chalaja.jpg";
import angryguy from "../../assets/images/angryguy.jpg";
import cryingdog from "../../assets/images/cryingdog.jpg";
import cryingdog2 from "../../assets/images/cryingdog2.jpeg";
import sadcat from "../../assets/images/sadcat.jpeg";
import sadcat2 from "../../assets/images/sadcat2.jpeg";

const superb = [happycat, happycat2, happycat3, happycat4, happykid, happyman];
const worst = [angryguy, cryingdog, cryingdog2, sadcat, sadcat2];

const Review = () => {
  const [random, setRandom] = useState(0);
  const [isSuperb, setIsSuperb] = useState(true);

  const handleDrawerOpen = (isSuperbChoice) => {
    setIsSuperb(isSuperbChoice);
    setRandom(
      Math.floor(
        Math.random() * (isSuperbChoice ? superb.length : worst.length)
      )
    );
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-8 p-8 text-center dark:text-gray-300 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Description */}
      <div className="space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Your Feedback Matters!
        </h1>
        <div className="flex flex-col gap-4 text-gray-600 dark:text-gray-400">
          <p className="text-lg">Help shape VITChat's future</p>
          <div className="flex flex-col justify-center items-center gap-3 text-sm">
            <p>
              Click{" "}
              <span className="bg-green-100 dark:bg-green-900/20 px-3 py-1 rounded-full">
                😻 Superb
              </span>{" "}
              if you're enjoying the platform
            </p>

            <p>
              Click{" "}
              <span className="bg-red-100 dark:bg-red-900/20 px-3 py-1 rounded-full">
                😿 Needs Fixes
              </span>{" "}
              if you have suggestions
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4">
        <Drawer>
          <DrawerTrigger
            onClick={() => handleDrawerOpen(true)}
            className="w-full sm:w-auto"
          >
            <SecondaryButton
              text="Superb 😻"
              className="w-full text-lg px-8 py-4 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50"
            />
          </DrawerTrigger>
          <DrawerContent className="flex flex-col items-center p-6 gap-4 max-h-[70vh]">
            <DrawerTitle className="text-xl font-bold text-center">
              {isSuperb
                ? "Thanks for the positive feedback! 🎉"
                : "We Hear You!"}
            </DrawerTitle>
            <img
              src={isSuperb ? superb[random] : worst[random]}
              alt="feedback meme"
              className="rounded-lg w-full max-w-[300px] aspect-square object-cover"
            />
            <div className="flex flex-col gap-3 w-full max-w-[300px]">
              <Button asChild variant="default" size="sm" className="w-full">
                <Link to="/contact" className="text-sm">
                  Share Feedback
                </Link>
              </Button>
            </div>
          </DrawerContent>
        </Drawer>

        <Drawer>
          <DrawerTrigger
            onClick={() => handleDrawerOpen(false)}
            className="w-full sm:w-auto"
          >
            <SecondaryButton
              text="Need Fixes 😿"
              className="w-full text-lg px-8 py-4 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50"
            />
          </DrawerTrigger>
          <DrawerContent className="flex flex-col items-center p-6 gap-4 max-h-[70vh]">
            <DrawerTitle className="text-xl font-bold text-center">
              We'll Do Better! 🛠️
            </DrawerTitle>
            <img
              src={worst[random]}
              alt="improvement meme"
              className="rounded-lg w-full max-w-[300px] aspect-square object-cover"
            />
            <div className="flex flex-col gap-3 w-full max-w-[300px]">
              <Button asChild variant="default" size="sm" className="w-full">
                <Link to="/contact" className="text-sm">
                  Suggest Improvements
                </Link>
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Footer Note */}
      <p className="text-sm text-gray-500 dark:text-gray-500 mt-8">
        Every feedback helps us create a better experience for 20,000+ VITians
      </p>
    </div>
  );
};

export default Review;
