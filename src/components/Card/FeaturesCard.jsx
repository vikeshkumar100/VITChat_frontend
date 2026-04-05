import React from "react";
import { MagicCard } from "../../components/magicui/magic-card";
import { Link } from "react-router-dom";
const FeaturesCard = ({ route, icon, title, description }) => {
  return (
    <Link to={route} className="w-full sm:w-auto">
      <MagicCard className="rounded-2xl h-full">
        <div className="min-h-[240px] sm:h-[300px] w-full sm:w-80 flex flex-col justify-center gap-4 sm:gap-6 p-4 sm:p-5">
          <h3 className="text-2xl sm:text-3xl font-bold">
            {title}
            {icon}
          </h3>
          <p className="text-base sm:text-lg text-gray-500">{description}</p>
        </div>
      </MagicCard>
    </Link>
  );
};

export default FeaturesCard;
