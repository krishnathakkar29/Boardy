import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { data, type } = await req.json();
    console.count("here");
    if (type == "organization.created") {
      console.count("here");

      const org = await prisma.organisation.create({
        data: {
          clerkOrgId: data.id,
          name: data.name,
          imageUrl: data.image_url,
        },
      });

      console.count("here");

      const user = await prisma.user.findUnique({
        where: {
          clerkUserId: data.created_by,
        },
      });

      console.count("here");

      if (!user) {
        console.log("yahah huuuuuuu");
        return new Response("User not found", { status: 404 });
      }

      console.count("here");

      await prisma.organisationMembership.create({
        data: {
          organisationId: org.id,
          userId: user.id,
        },
      });

      console.count("here");

      return new Response("Org Created", { status: 200 });
    } else if (type == "organization.updated") {
      const org = await prisma.organisation.update({
        where: {
          clerkOrgId: data.id,
        },
        data: {
          name: data.name,
          imageUrl: data.image_url,
        },
      });
      return new Response("Org Updated", { status: 200 });
    } else if (type == "organization.deleted") {
      const org = await prisma.organisation.delete({
        where: {
          clerkOrgId: data.id,
        },
      });
      return new Response("Org Deleted", { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return new Response("Error webhook", { status: 400 });
  }
}
