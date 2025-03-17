import React from "react";
import { MagicCard } from "../../components/magicui/magic-card";
import { Link } from "react-router-dom";
const FeaturesCard = ({ route, icon, title, description }) => {
  return (
    <Link to={route}>
      <MagicCard className="rounded-2xl">
        <div className="h-[300px] w-80 flex flex-col justify-center gap-6 p-4">
          <h3 className="text-4xl font-bold">
            {title}
            {icon}
          </h3>
          <p className="text-lg text-gray-500">{description}</p>
        </div>
      </MagicCard>
    </Link>
  );
};

export default FeaturesCard;
