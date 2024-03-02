"use client";
import React, { FormEventHandler, useState } from "react";

interface Props {
  games: any;
}

export default function GameList({ games }: Props) {
  const [display, setDisplay] = useState(games);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = formData.get("game");
    const filter = games.filter((game) => game.name.includes(result));
    setDisplay(filter);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <input placeholder="Search for Game..." name="game" />
          <button type="submit">Search</button>
        </div>
      </form>
      <ul>
        {display.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </>
  );
}
