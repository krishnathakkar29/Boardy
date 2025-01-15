import React from "react";
import { Skeleton } from "../ui/skeleton";

type Props = {};

const Participants = (props: Props) => {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      Participants
    </div>
  );
};

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] w-[110px]">
      <Skeleton />
    </div>
  );
};

export default Participants;
