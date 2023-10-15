import prisma from "@/utils/prisma";
import { NextRequest } from "next/server";
import { getSession } from "next-auth/react";

export async function POST(request: NextRequest, req) {
  const body = await request.json();
  const session = await getSession({ req });

  await prisma.post.create({
    data: {
      content: body.content,
      createdAt: new Date().toISOString(),
      authorId: session?.user.id,
    },
  });

  return new Response(JSON.stringify("serverRes"), { status: 200 });
}
