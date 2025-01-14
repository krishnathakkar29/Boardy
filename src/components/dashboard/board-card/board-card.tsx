"use client";
import Actions from "@/components/actions";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "./footer";
import Overlay from "./overlay";
import useFetch from "@/hooks/use-fetch";
import {
  addToFavorite,
  removeFromFavorite,
} from "../../../../actions/boardActions";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  title: string;
  authorId: string;
  createdAt: Date;
  imageUrl: string;
  isFavorite: boolean;
  clerkUserId: string;
  clerkOrgId: string;
  authorName: string;
};

const BoardCard = ({
  id,
  title,
  authorId,
  createdAt,
  imageUrl,
  isFavorite,
  clerkUserId,
  clerkOrgId,
  authorName,
}: Props) => {
  const { userId } = useAuth();

  const authorNameLabel = clerkUserId == userId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  const router = useRouter();

  const {
    data: addFavData,
    loading: addFavLoading,
    fn: fnAddToFavorite,
    error: addFavError,
  } = useFetch(addToFavorite);

  const {
    data: removeFavData,
    loading: removeFavLoading,
    fn: fnRemoveFromFavorite,
    error: removeFavError,
  } = useFetch(removeFromFavorite);

  const toggleFavorite = async () => {
    if (isFavorite) {
      await fnRemoveFromFavorite({ boardId: id, orgId: clerkOrgId });
    } else {
      await fnAddToFavorite({ boardId: id, orgId: clerkOrgId });
    }

    router.refresh();
  };

  return (
    <Link href={`/board/${id}`}>
      <div className="aspect-[100/127] group border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50 ">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <Overlay />
          <Actions
            id={id}
            title={title}
            side="bottom"
            sideOffset={-15}
            alignOffset={22}
          >
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal
                className="text-white opacity-75 hover:opacity-100 transition-opacity"
                size={24}
              />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorNameLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={addFavLoading || removeFavLoading}
        />
      </div>
    </Link>
  );
};

export default BoardCard;
