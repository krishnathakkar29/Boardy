"use client";
import useFetch from "@/hooks/use-fetch";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import React from "react";
import { createBoard } from "../../../actions/boardActions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  orgId: string;
  disabled?: boolean;
};

const NewBoardButton = ({ orgId, disabled }: Props) => {
  const { data, loading, fn: fnCreateBoard, error } = useFetch(createBoard);
  const router = useRouter();

  const onClick = async () => {
    await fnCreateBoard("Untitled", orgId);

    if (data?.success) {
      toast.success("Board created successssfully!");
    }

    router.refresh();
  };
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center aspect-[100/127] col-span-1 bg-blue-600 rounded-lg hover:bg-blue-800 py-6",
        disabled && "opacity-75 hover:bg-blue-600 cursor-not-allowed"
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">New Board</p>
    </button>
  );
};

export default NewBoardButton;
