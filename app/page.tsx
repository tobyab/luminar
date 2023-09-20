import prisma from "@/utils/prisma";
import NewPost from "@/components/newPost";

export default async function Home() {
  const posts = await prisma.post.findMany();

  return (
    <div className="justify-center grid place-items-center h-screen">
      <NewPost />
      {posts.map((post) => (
        <div key={post.id}>{post.content}</div>
      ))}
    </div>
  );
}
