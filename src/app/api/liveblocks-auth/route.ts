import prisma from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_IEHg5dHie3v4Vvs3itCR8ojTrfRh4OHksR8GZGkyCwA4arnsI8i2t8l45JwAgGvs",
});

export async function POST(request: Request) {
  const authorization = await auth();
  const user = await currentUser();

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { room } = await request.json();

  const board = await prisma.board.findFirst({
    where: {
      id: room,
    },
  });

  if (board?.clerkOrgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userInfo = {
    name: user.firstName || "Anonymous",
    picture: user.imageUrl!,
  };

  const session = liveblocks.prepareSession(user.id, {
    userInfo,
  });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
