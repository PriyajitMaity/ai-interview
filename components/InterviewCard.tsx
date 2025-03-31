import { cn, getRandomInterviewCover } from "@/lib/utils";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import TechIcons from "./TechIcons";
import { getFeedbackByInterviewId } from "@/lib/actions/general";

const InterviewCard = async({ interviewId, userId, role, type, techstack, createdAt }: InterviewCardProps) => {
  const feedback = userId && interviewId ? await getFeedbackByInterviewId({ interviewId, userId }) : null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const badgeColor =
    {
      Behavioral: "bg-light-400",
      Mixed: "bg-light-600",
      Technical: "bg-light-800",
    }[normalizedType] || "bg-light-600";

  const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format("MMM D, YYYY");

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          {/* badge type */}
          <div className={cn("absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg", badgeColor)}>
            <p className="badge-text">{normalizedType}</p>
          </div>
          {/* cover image */}
          <Image src={getRandomInterviewCover()} alt="cover-image" height={90} width={90} />
          {/* interview role */}
          <h3 className="mt-5 capitalize">{role} Interview</h3>
          {/* date & score */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row items-center gap-2">
              <Image src="/calendar.svg" height={22} width={22} alt="calender" />
              <p>{formattedDate}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Image src="/star.svg" height={22} width={22} alt="star" />
              <p>{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>
          {/* feedback or placeholder */}
          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment || "You haven't taken this interview yet. Take it now to improve your skills."}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <TechIcons techStack={techstack} />
          <Button className="btn-primary">
            <Link href={feedback ? `/interview/${interviewId}/feedback` : `/interview/${interviewId}`}>
              {feedback ? "check feedback" : "view interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
