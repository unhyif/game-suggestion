"use client";
import React, { FormEvent, useRef } from "react";
import { atom, useAtom } from "jotai";
import Link from "next/link";
import { Game } from "./vote/page";

export interface GameWithCount extends Game {
  count: number;
}
export interface Poll {
  title: string;
  games: GameWithCount[];
}

export const pollsAtom = atom<Poll[]>([]);

export default function Home() {
  const [polls, setPolls] = useAtom(pollsAtom);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>, poll: Poll) => {
    e.preventDefault();

    const pollTitle = poll.title;
    const checkedElements =
      formRef.current?.querySelectorAll('input[type="checkbox"]:checked') ?? [];
    const checkedGameNames = Array.from(checkedElements).map(
      (element) => element.id
    );

    setPolls((prev) =>
      prev.map((item) =>
        item.title === pollTitle
          ? {
              ...item,
              games: item.games.map((game) =>
                checkedGameNames.includes(game.name)
                  ? { ...game, count: (game.count ?? 0) + 1 }
                  : game
              ),
            }
          : item
      )
    );

    if (e.target instanceof HTMLFormElement) {
      e.target.reset();
    }
  };

  const isTopVotedGame = (games: GameWithCount[], game: GameWithCount) => {
    return games.sort((a, b) => b.count - a.count)[0].name === game.name;
  };

  return (
    <div className="text-center p-5">
      <Link
        href="/vote"
        className="bg-red-400 p-3 text-lg font-bold rounded-xl"
      >
        Create A New Poll
      </Link>

      <ul className="mt-5">
        {polls.map((poll) => (
          <form
            key={poll.title}
            ref={formRef}
            className="border-solid border-2 border-pink-600 rounded p-2"
            onSubmit={(e) => handleSubmit(e, poll)}
          >
            <h4 className="text-2xl">{poll.title}</h4>
            <ul>
              {poll.games.map((game) => (
                <li
                  key={game.name}
                  className={`flex justify-center ${
                    isTopVotedGame(poll.games, game) ? "font-bold" : ""
                  }`}
                >
                  <input type="checkbox" id={game.name} />
                  <label htmlFor={game.name}>
                    {game.name} +{game.count ?? 0}
                  </label>
                </li>
              ))}
            </ul>
            <button className="bg-blue-400 rounded-md p-5">Vote</button>
          </form>
        ))}
      </ul>
    </div>
  );
}
