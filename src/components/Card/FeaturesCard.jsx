import React from "react";
import { MagicCard } from "../../components/magicui/magic-card";
import { Link } from "react-router-dom";
const FeaturesCard = ({ route, icon, title, description }) => {
  return (
    <Link to={route} className="block h-full w-full">
      <MagicCard className="rounded-2xl h-full">
        <div className="flex h-full min-h-[250px] w-full flex-col justify-between gap-4 p-5 md:min-h-[280px]">
          <h3 className="flex items-center gap-2 text-2xl font-bold leading-tight md:text-3xl">
            <span>{title}</span>
            <span className="shrink-0">{icon}</span>
          </h3>
          <p className="min-h-[5.5rem] text-base leading-relaxed text-gray-500 md:text-lg">{description}</p>
        </div>
      </MagicCard>
    </Link>
  );
};

export default FeaturesCard;
