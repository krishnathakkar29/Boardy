import Canvas from "@/components/board/canvas";
import Loading from "@/components/board/loading";
import Room from "@/components/room";
import React from "react";

type Props = {
  params: { boardId: string };
};

const page = ({ params }: Props) => {
  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
};

export default page;
