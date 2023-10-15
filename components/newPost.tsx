"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export default function NewPost() {
  const [post, setPost] = useState("");
  const [load, setLoad] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const { data: session } = useSession();

  const placeholders = [
    "I just tried my first cup of coffee!",
    "Have you ever thought about how weird the word 'fence' is?",
    "I've finished making my personal website!",
    "I'm going to the beach today!",
    "Ugh, the weather is so bad today.",
    "Rick Astley is my favorite music artist!",
    "Does anyone really understand modern art?",
    "Brooklyn Nine-Nine is the best show ever!",
    "I HATE git merge conflicts!",
    "How often do you think about the Roman Empire?",
  ];

  useEffect(() => {
    setPlaceholder(
      placeholders[Math.floor(Math.random() * placeholders.length)],
    );
  }, [placeholders]);

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
      {!session ? <button onClick={() => signIn()}>Sign in!</button> : "Hello!"}
      <form>
        <input
          className="outline-none"
          placeholder={placeholder}
          onChange={(e) => setPost(e.target.value)}
        />
        <button className="bg-gray-100 rounded-lg p-2" onClick={makePost}>
          Post
        </button>
      </form>
    </div>
  );
}
