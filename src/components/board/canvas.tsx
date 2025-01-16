"use client";
import React, { Suspense } from "react";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { useSelf } from "@liveblocks/react/suspense";
import Info from "./info/info";
import { Loader2 } from "lucide-react";

type Props = {
  boardId: string;
};

const CanvasClient = ({ boardId }: Props) => {
  const { name, picture } = useSelf((me) => me.info);

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar />
    </main>
  );
};

const Canvas = ({ boardId }: Props) => {
  return (
    <Suspense
      fallback={
        <div className="h-full w-full flex items-center justify-center gap-2">
          <Loader2 size={40} className="animate-spin" />
          Loading....
        </div>
      }
    >
      <CanvasClient boardId={boardId} />
    </Suspense>
  );
};

export default Canvas;
