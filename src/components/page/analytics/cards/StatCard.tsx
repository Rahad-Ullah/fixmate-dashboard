import Image from "next/image";
import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-5 px-8 rounded-lg border hover:shadow-md transition-shadow duration-300">
      <Image src={icon} alt="icon" width={40} height={40} />
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <h3 className="text-xl font-medium text-gray-950">{title}</h3>
          <p className="text-4xl font-bold text-primary">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
