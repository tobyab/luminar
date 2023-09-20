import prisma from "@/utils/prisma";
import NewPost from "@/components/newPost";
import { P, S } from "@/components/typography";

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="justify-center grid place-items-center h-screen">
      <div>
        <NewPost />
        <div>
          {posts.map((post) => (
            <div key={post.id}>
              <P>{post.content}</P>
              <S>{post.createdAt.toString()}</S>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
