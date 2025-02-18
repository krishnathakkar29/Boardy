import React from "react";

type Props = {};

const Overlay = (props: Props) => {
  return (
    <div className="opacity-0 group-hover:opacity-50 transition-opacity h-full w-full bg-black absolute" />
  );
};

export default Overlay;
