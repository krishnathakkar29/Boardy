import Canvas from "@/components/board/canvas";
import Loading from "@/components/board/loading";
import Room from "@/components/room";
import prisma from "@/lib/db";
import React from "react";

type Props = {
  params: { boardId: string };
};

const page = async ({ params }: Props) => {
  const board = await prisma.board.findUnique({
    where: {
      id: params.boardId,
    },
  });

  if (!board) return <div>Board Page not found.............</div>;
  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas boardId={params.boardId} board={board} />
    </Room>
  );
};

export default page;
