"use server";
import prisma from "@/lib/db";
import InfoClient from "./info-client";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  boardId: string;
};

const Info = async ({ boardId }: Props) => {

  const board = await prisma.board.findUnique({
    where: {
      id: boardId,
    },
  });

  if (!board) return <InfoSkeleton />;

  return <InfoClient board={board} />;
};

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] w-[280px]">
      <Skeleton />
    </div>
  );
};
export default Info;
