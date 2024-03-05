"use client";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { Poll, pollsAtom } from "../page";
import { useRouter } from "next/navigation";

export interface Game {
  id: number;
  name: string;
}

const VotePage = () => {
  const router = useRouter();
  const [games, setGames] = useState<Game[]>([]);
  const [newGameName, setNewGameName] = useState<string>("");
  const [poll, setPoll] = useState<Poll>({ title: "", games: [] });
  const [_, setPolls] = useAtom(pollsAtom);

  const isSelected = (game: Game) =>
    !!poll.games.find((item) => item.name === game.name);

  const fetchGames = async () => {
    const data = await fetch("/api/game", {
      method: "POST",
    });
    setGames(await data.json());
  };

  const handleChangeTitle = (title: string) => {
    setPoll((prev) => ({ ...prev, title }));
  };

  const handleClickGame = (game: Game) => {
    const targetGame = poll.games.find(
      (selectedGame) => selectedGame.name === game.name
    );

    if (targetGame === undefined) {
      setPoll((prev) => ({
        ...prev,
        games: [...prev.games, { ...game, count: 0 }],
      }));
    } else {
      setPoll((prev) => ({
        ...prev,
        games: prev.games.filter(
          (selectedGame) => selectedGame.name !== game.name
        ),
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPolls((prev) => [...prev, poll]);
    router.push("/");
  };

  const handleAddNewGame = () => {
    const game = {
      id: Date.now(),
      name: newGameName,
    };
    setGames([...games, game]);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="text-center">
      <form onSubmit={handleSubmit}>
        <input
          className="text-2xl text-center border mt-10"
          name="title"
          placeholder="Enter The Poll Title"
          required
          onChange={(e) => handleChangeTitle(e.target.value)}
        />
        <ul>
          {games.map((game: Game) => (
            <li
              key={game.name}
              className={
                isSelected(game)
                  ? "cursor-pointer text-red-400 my-2"
                  : "cursor-pointer text-black my-2"
              }
              onClick={() => handleClickGame(game)}
            >
              {game.name}
            </li>
          ))}
        </ul>
        <button type="submit" className="bg-blue-400 rounded-md p-5">
          Create A New Poll
        </button>
      </form>

      <div className="text-center">
        <h1 className="mt-10">Add Your Own Game</h1>
        <input
          type="text"
          name={String(Date.now())}
          placeholder="Game Title"
          className="border mt-2"
          onChange={(e) => setNewGameName(e.target.value)}
        ></input>
      </div>
      <button
        onClick={handleAddNewGame}
        className="bg-blue-400 p-2 mt-5 rounded-md"
      >
        Add A Game
      </button>
    </div>
  );
};

export default VotePage;
