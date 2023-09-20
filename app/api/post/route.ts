import prisma from "@/utils/prisma";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  await prisma.post.create({
    data: {
      content: body.content,
      createdAt: new Date().toISOString(),
    },
  });

  return new Response(JSON.stringify("serverRes"), { status: 200 });
}
