import { cn, getTechLogos } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const TechIcons = async ({ techStack }: TechIconProps) => {
  const techIcons = await getTechLogos(techStack);

  return (
    <div className="flex flex-row">
      {techIcons.slice(0, 3).map((ele, index) => (
        <div
          key={ele.tech}
          className={cn("relative group bg-dark-300 rounded-full p-2 flex flex-center", index >= 1 && "-ml-3")}
        >
          <span className="tech-tooltip">{ele.tech}</span>
          <Image src={ele.url} alt={ele.tech} height={100} width={100} className="size-5" />
        </div>
      ))}
    </div>
  );
};

export default TechIcons;
