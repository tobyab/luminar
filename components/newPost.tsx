"use client";
import { useState } from "react";

export default function NewPost() {
  const [post, setPost] = useState("");
  const [load, setLoad] = useState(false);

  async function makePost(e: { preventDefault: () => void }) {
    try {
      e.preventDefault();
      setLoad(true);
      await fetch("/api/post", {
        method: "POST",
        body: JSON.stringify({ post }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoad(false);
    }
  }

  return (
    <div>
      <form>
        <input
          className="outline-none"
          placeholder="Post something!"
          onChange={(e) => setPost(e.target.value)}
        />
        <button className="bg-gray-100 rounded-lg p-2" onClick={makePost}>
          Post
        </button>
      </form>
    </div>
  );
}
