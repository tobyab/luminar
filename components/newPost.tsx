"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function NewPost() {
  const [post, setPost] = useState("");
  const [load, setLoad] = useState(false);
  const { data: session } = useSession();

  async function makePost(e: { preventDefault: () => void }) {
    const changes = {
      content: post,
      creator: "Toby",
    };

    try {
      e.preventDefault();
      setLoad(true);
      await fetch("/api/post", {
        method: "POST",
        body: JSON.stringify(changes),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoad(false);
    }
    console.log("Hello! I am a post!");
  }

  return (
    <div>
      {!session ? "SIgn in!" : "Hello!"}
      <form>
        <input
          className="outline-none"
          placeholder="What's on your mind?"
          onChange={(e) => setPost(e.target.value)}
        />
        <button className="bg-gray-100 rounded-lg p-2" onClick={makePost}>
          Post
        </button>
      </form>
    </div>
  );
}
