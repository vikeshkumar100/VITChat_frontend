import SecondaryButton from "../../components/Buttons/SecondaryButton";
import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";

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
const worst = [chalaja, angryguy, cryingdog, cryingdog2, sadcat, sadcat2];

const Review = () => {
  const [random, setrandom] = useState(0);
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 p-8 text-center dark:text-gray-400">

    {/* description  */}
      <div>Click on superb if you are happy with our service</div>
      <div>
        Click on worst if you are not smart enough to understand our service
      </div>

    {/* button  */}
      <div className="w-full flex justify-center items-center gap-2">
        <Drawer>
          <DrawerTrigger
            onClick={() => setrandom(Math.floor(Math.random() * superb.length))}
          >
            <SecondaryButton text="Superb" />
          </DrawerTrigger>
          <DrawerContent className="flex justify-center items-center p-6">
            <DrawerTitle className="p-4 text-xl">Thank you</DrawerTitle>
            <img src={superb[random]} alt="" width={350} />
          </DrawerContent>
        </Drawer>

        <Drawer>
          <DrawerTrigger
            onClick={() => setrandom(Math.floor(Math.random() * worst.length))}
          >
            <SecondaryButton text="Worst" />
          </DrawerTrigger>
          <DrawerContent className="flex justify-center items-center p-6">
            <DrawerTitle className="p-4 text-xl">
              We will try to improve , thank you
            </DrawerTitle>
            <img src={worst[random]} alt="" width={350} />
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default Review;
