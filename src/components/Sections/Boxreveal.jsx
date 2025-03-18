import { Link } from "react-router-dom";
import { BoxReveal } from "../magicui/box-reveal";
import { RainbowButton } from "../magicui/rainbow-button";

const Boxreveal = () => {
  return (
    <div className="size-full max-w-lg items-center justify-center overflow-hidden pt-8 p-6">
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <p className="text-[3.5rem] md:text-7xl font-semibold">
          VITChat<span className="text-blue-500">.</span>
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <h2 className="mt-[.5rem] md:text-5xl text-[1rem]">
          The Future of{" "}
          <span className="text-blue-500">Student Interaction</span>
        </h2>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div className="my-6 text-lg">
          <p>
            -&gt; VITChat is a student-led platform designed exclusively for VIT
            students to
            <span className="font-semibold text-blue-500">interact</span>,
            <span className="font-semibold text-blue-500">share ideas</span>,
            and
            <span className="font-semibold text-blue-500">
              build connections
            </span>
            . <br />
            -&gt; Stay connected with your peers <br />
          </p>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <Link to="/chat">
          <RainbowButton className="md:text-xl">Join Chat Now</RainbowButton>{" "}
        </Link>
      </BoxReveal>
    </div>
  );
};

export default Boxreveal;
