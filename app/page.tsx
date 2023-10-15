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
    <div className="justify-center grid place-items-center">
      <div>
        <NewPost />
        <div className="mt-8">
          {posts.map((post) => (
            <div key={post.id}>
              <P>{post.content}</P>
              <S>{post.authorId}</S>
              <S>{post.createdAt.toString()}</S>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
