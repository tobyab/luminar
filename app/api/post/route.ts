import prisma from "@/utils/prisma";

export async function POST() {
  /* const user = true; // WARN: this is just a placeholder.

  if (!user) return new Response("Unauthorized", { status: 401 });*/

  await prisma.post.create({
    data: {
      content: "hello world",
      createdAt: new Date().toISOString(),
    },
  });
  return new Response("Hello, Next.js!", {
    status: 200,
  });
}
