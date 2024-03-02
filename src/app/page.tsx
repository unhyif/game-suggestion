"use client";

import { atom, useAtom } from "jotai";
import Link from "next/link";

export interface Game {
  name: string;
  vote: number;
}
export interface Poll {
  title: string;
  games: Game[];
}
export const pollsAtom = atom<Poll[]>([]);

export default function Home() {
  const [polls, setPolls] = useAtom(pollsAtom);
  return (
    <div>
      <Link href="/vote" className="bg-red-400 border mt-10">
        Create new Poll
      </Link>
      {polls.map((poll) => poll.title)}
    </div>
  );
}

// main page: poll list
// poll detail page
// create poll page
