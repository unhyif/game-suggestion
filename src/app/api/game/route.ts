export const POST = async (request: Request) => {
  const data = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
    body: "fields *;",
  });
  const games = await data.json();
  return Response.json(games);
};
