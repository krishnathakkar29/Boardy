"use client";
import React from "react";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Hint from "@/components/hint";

type Props = {
  id: string;
  name: string;
  imageUrl: string;
};

const Item = ({ id, imageUrl, name }: Props) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;
  const onClick = () => {
    if (!setActive) return;
    setActive({ organization: id });
  };
  return (
    <div className="aspect-square relative">
      <Hint label={name} side="right" align="start" sideOffset={18}>
        <Image
          fill
          src={imageUrl}
          onClick={onClick}
          alt={name}
          className={cn(
            "rounded-md cursor-pointer opacity-60 hover:opacity-100 transition",
            isActive && "opacity-100"
          )}
        />
      </Hint>
    </div>
  );
};

export default Item;
