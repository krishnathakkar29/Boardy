import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { data, type } = await req.json();

    if (type == "organizationMembership.created") {
      const organisation = await prisma.organisation.findUnique({
        where: {
          clerkOrgId: data.organization.id,
        },
      });

      if (!organisation) {
        return new Response("Organization not found", { status: 404 });
      }

      const user = await prisma.user.findUnique({
        where: {
          clerkUserId: data.public_user_data.user_id,
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
    } else if (type == "organizationMembership.deleted") {
      const organisation = await prisma.organisation.findUnique({
        where: {
          clerkOrgId: data.organization.id,
        },
      });

      if (!organisation) {
        return new Response("Organization not found", { status: 404 });
      }

      const user = await prisma.user.findUnique({
        where: {
          clerkUserId: data.public_user_data.user_id,
        },
      });

      if (!user) {
        return new Response("User not found", { status: 404 });
      }

      await prisma.organisationMembership.deleteMany({
        where: {
          organisationId: organisation.id,
          userId: user.id,
        },
      });

      return new Response("Organization membership deleted", { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Error webhook", { status: 400 });
  }
}
