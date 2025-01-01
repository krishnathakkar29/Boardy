import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { data } = await req.json();

    const name = `${data.first_name} ${data.last_name}`;

    const user = await prisma.user.upsert({
      where: {
        clerkUserId: data.id,
      },  
      update: {
        clerkUserId: data.id,
        name,
        email: data.email_addresses[0].email_address,
        imageUrl: data.imageUrl,
      },
      create: {
        clerkUserId: data.id,
        name: `${data.first_name} ${data.last_name}`,
        email: data.email_addresses[0].email_address,
        imageUrl: data.imageUrl,
      },
    });
    return new Response("Webhook Received", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error webhook", { status: 400 });
  }
}
