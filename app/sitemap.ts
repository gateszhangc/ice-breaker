import { MetadataRoute } from "next";
import { getAllGames } from "@/lib/services/game-service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const games = await getAllGames();

  const gameUrls = games.map((game) => ({
    url: `https://your-domain.com/game/${game.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://your-domain.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...gameUrls,
  ];
}
