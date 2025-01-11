import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { data, type } = await req.json();

    const organisation = await prisma.organisation.findUnique({
      where: {
        clerkOrgId: data.organization_id,
      },
    });

    if (!organisation) {
      return new Response("Organization not found", { status: 404 });
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkUserId: userId!,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    await prisma.organisationMembership.create({
      data: {
        organisationId: organisation.id,
        userId: user.id,
        role: data.role,
      },
    });

    return new Response("Organization membership created", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error webhook", { status: 400 });
  }
}
