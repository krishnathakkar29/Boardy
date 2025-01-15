import prisma from "@/lib/db";
import EmptyBoards from "./empty-boards";
import { EmptyFavorites } from "./empty-favorites";
import { EmptySearch } from "./empty-search";
import { auth } from "@clerk/nextjs/server";
import NewBoardButton from "./new-board-button";
import BoardCard from "./board-card/board-card";

type Props = {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
};

const BoardList = async ({ orgId, query }: Props) => {
  const { userId } = await auth();
  let data = [];
  let boardsWithFavorites = [];

  if (query.favorites) {
    data = await prisma.favorite.findMany({
      where: {
        clerkOrgId: orgId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        board: true,
      },
    });

    boardsWithFavorites = data.map((board) => ({
      id: board.id,
      title: board.board.title,
      orgId: board.board.orgId,
      userId: board.userId,
      imageUrl: board.board.imageUrl,
      clerkOrgId: board.clerkOrgId,
      clerkUserId: board.clerkUserId,
      createdAt: board.board.createdAt,
      updatedAt: board.board.updatedAt,
      isFavorite: true,
      authorName: board.user.name || "Unknown",
      user: board.user,
    }));
  } else {
    data = await prisma.board.findMany({
      where: {
        clerkOrgId: orgId,
        title: {
          contains: query.search || "",
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Favorite: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    boardsWithFavorites = data.map((board) => ({
      ...board,
      isFavorite: board.Favorite.some(
        (fav) => fav.clerkUserId == userId && fav.boardId == board.id
      ),
      authorName: board.user?.name || "Unknown",
    }));
  }

  if (!data.length && query.search) {
    return <EmptySearch />;
  }
  if (!data.length && query.favorites) {
    return <EmptyFavorites />;
  }
  if (!data.length) {
    return <EmptyBoards />;
  }
  return (
    <div>
      <h2 className="text-2xl">
        {query.favorites ? "Favorite boards" : "Team boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        {boardsWithFavorites.map((board) => (
          <BoardCard
            key={board.id}
            imageUrl={board.imageUrl || ""}
            id={board.id}
            title={board.title}
            clerkUserId={board.clerkUserId}
            authorId={board.userId}
            clerkOrgId={board.clerkOrgId}
            createdAt={board.createdAt}
            isFavorite={board.isFavorite}
            authorName={board.authorName}
          />
        ))}
        <NewBoardButton orgId={orgId} />
      </div>
    </div>
  );
};

export default BoardList;
