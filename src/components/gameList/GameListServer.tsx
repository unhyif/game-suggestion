import React from "react";
import GameList from "./GameList";

const GameListServer = async () => {
  const data = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLIENT_SECRET}`,
    },
    // body: "fields name; where id = 1942;",
    body: "fields *;",
  });
  const games = await data.json();
  return <GameList games={games} />;
};

export default GameListServer;
