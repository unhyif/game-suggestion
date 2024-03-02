"use client";
import GameListServer from "@/components/gameList/GameListServer";
import React, { useEffect } from "react";

const VotePage = () => {
  const fetch = async () => {
    const data = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLIENT_SECRET}`,
      },
      // body: "fields name; where id = 1942;",
      body: "fields *;",
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <form className="flex">
        <input name="title" placeholder="title" />
        <GameListServer />
        <button>Create a new poll</button>
      </form>
    </div>
  );
};

export default VotePage;
