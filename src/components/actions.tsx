"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ConfirmModal from "./confirm-modal";
import { Button } from "./ui/button";
import useFetch from "@/hooks/use-fetch";
import { deleteBoard } from "../../actions/boardActions";
import { useRouter } from "next/navigation";
import { useRenameModal } from "@/store/use-rename-modal";
interface ActionProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  alignOffset?: DropdownMenuContentProps["alignOffset"];
  id: string;
  title: string;
}

const Actions = ({
  children,
  side,
  sideOffset,
  id,
  title,
  alignOffset,
}: ActionProps) => {
  const { onOpen } = useRenameModal();

  const { data, loading, fn: fnDeleteBoard, error } = useFetch(deleteBoard);
  const router = useRouter();

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link copied!"))
      .catch(() => toast.error("Failed to copy link"));
  };

  const onDelete = async () => {
    await fnDeleteBoard(id);
    if (data?.success) {
      toast.success("Board created successssfully!");
    }

    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        align="end"
        className="w-50"
        alignOffset={alignOffset}
      >
        <DropdownMenuItem className="p-2 cursor-pointer" onClick={onCopyLink}>
          <Link2 className="h-4 w-4 mr-2" />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem
          className="p-2 cursor-pointer"
          onClick={() => onOpen(id, title)}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Rename
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <ConfirmModal
          header={`Delete board?`}
          description={
            <div>
              To confirm, type <span className="font-semibold">{title}</span> in
              the box below
            </div>
          }
          onConfirm={onDelete}
          title={title}
          disabled={loading}
        >
          <Button
            variant="ghost"
            className="p-2 cursor-pointer text-rose-600 text-sm w-full justify-start font-normal"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
