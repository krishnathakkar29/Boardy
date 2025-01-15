"use client";
import React from "react";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { useSelf } from "@liveblocks/react/suspense";

type Props = {
  boardId: string;
};

const Canvas = ({ boardId }: Props) => {
  const { name, picture } = useSelf((me) => me.info);

  console.log(name, picture);
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info />
      <Participants />
      <Toolbar />
    </main>
  );
};

export default Canvas;
