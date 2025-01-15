"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import useFetch from "@/hooks/use-fetch";
import { createBoard } from "../../../actions/boardActions";
import { useOrganization } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {};

const EmptyBoards = (props: Props) => {
  const { organization } = useOrganization();
  const { data, loading, fn: fnCreateBoard, error } = useFetch(createBoard);
  const router = useRouter();

  async function create() {
    if (!organization) return;

    await fnCreateBoard("Untitled", organization.id);

    if (data?.success) {
      toast.success("Board created successssfully!");
      //TODO: push
    }

    router.refresh();
  }
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" alt="Empty Boards" height={110} width={110} />
      <h2 className="text-2xl font-semibold mt-6">Create your first board!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button disabled={loading} onClick={create} size="lg">
          Create Board
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoards;
