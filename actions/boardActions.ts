"use server";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const images = [
  "/placeholders/1.svg",
  "/placeholders/2.svg",
  "/placeholders/3.svg",
  "/placeholders/4.svg",
  "/placeholders/5.svg",
  "/placeholders/6.svg",
  "/placeholders/7.svg",
  "/placeholders/8.svg",
  "/placeholders/9.svg",
  "/placeholders/10.svg",
];

export async function createBoard(title: string, orgId: string) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    const organisation = await prisma.organisation.findUnique({
      where: {
        clerkOrgId: orgId,
      },
    });

    if (!organisation) {
      throw new Error("User not found");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const board = await prisma.board.create({
      data: {
        title,
        orgId: organisation.id,
        userId: existingUser.id,
        imageUrl: randomImage,
        clerkOrgId: orgId,
        clerkUserId: userId,
      },
    });

    return {
      success: true,
      board,
    };
  } catch (error: any) {
    console.log("Error creating board", error);
    throw new Error("Failed to create board", error.message);
  }
}

export async function deleteBoard(id: string) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const deletedBoard = await prisma.board.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
    };
  } catch (error: any) {
    console.log("Error deleting board", error);
    throw new Error("Failed to delete board", error.message);
  }
}

export async function updateBoard({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    if (!title) {
      throw new Error("Title is required");
    }

    if (title.length > 60) {
      throw new Error("Title should not be more than 60 characters");
    }

    const updatedBoard = await prisma.board.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });

    return {
      success: true,
      board: updatedBoard,
    };
  } catch (error: any) {
    console.log("Error updating board", error);
    throw new Error("Failed to update board", error.message);
  }
}

export async function addToFavorite({
  boardId,
  orgId,
}: {
  boardId: string;
  orgId: string;
}) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    const existingFav = await prisma.favorite.findMany({
      where: {
        boardId: boardId,
        clerkOrgId: orgId,
        clerkUserId: userId,
      },
    });

    const uniqueBoard = existingFav[0];

    if (uniqueBoard) {
      throw new Error("Board already is in the favorites");
    }

    const createdFav = await prisma.favorite.create({
      data: {
        clerkUserId: userId,
        boardId: boardId,
        clerkOrgId: orgId,
        userId: user?.id!,
      },
    });

    return {
      success: true,
      board: createdFav,
    };
  } catch (error: any) {
    console.log("Error adding to favorite ", error);
    throw new Error("Failed to add to favorite", error.message);
  }
}

export async function removeFromFavorite({
  boardId,
  orgId,
}: {
  boardId: string;
  orgId: string;
}) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    //TODO: check if any of the constraint can be removed
    const existingFav = await prisma.favorite.findMany({
      where: {
        boardId: boardId,
        clerkOrgId: orgId,
        clerkUserId: userId,
      },
    });

    const uniqueBoard = existingFav[0];

    if (!uniqueBoard) {
      throw new Error("Favorited Board not found");
    }

    const createdFav = await prisma.favorite.delete({
      where: {
        id: uniqueBoard.id,
      },
    });

    return {
      success: true,
      board: createdFav,
    };
  } catch (error: any) {
    console.log("Error updating board", error);
    throw new Error("Failed to update board", error.message);
  }
}
