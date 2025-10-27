import type { Game, GameCategory, GameFilters } from "@/lib/types/game";
import gamesData from "@/data/games.json";

// 获取所有游戏
export async function getAllGames(): Promise<Game[]> {
  return gamesData as Game[];
}

// 根据ID获取游戏
export async function getGameById(id: string): Promise<Game | null> {
  const games = await getAllGames();
  return games.find((game) => game.id === id) || null;
}

// 根据分类获取游戏
export async function getGamesByCategory(
  category: GameCategory
): Promise<Game[]> {
  const games = await getAllGames();
  return games.filter((game) => game.category === category);
}

// 搜索游戏
export async function searchGames(query: string): Promise<Game[]> {
  if (!query.trim()) {
    return getAllGames();
  }

  const games = await getAllGames();
  const lowerQuery = query.toLowerCase();

  return games.filter(
    (game) =>
      game.title.toLowerCase().includes(lowerQuery) ||
      game.description.toLowerCase().includes(lowerQuery) ||
      game.shortDescription.toLowerCase().includes(lowerQuery) ||
      game.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

// 筛选游戏
export async function filterGames(filters: GameFilters): Promise<Game[]> {
  let games = await getAllGames();

  if (filters.category) {
    games = games.filter((game) => game.category === filters.category);
  }

  if (filters.minParticipants !== undefined) {
    games = games.filter(
      (game) => game.participants.max >= filters.minParticipants!
    );
  }

  if (filters.maxParticipants !== undefined) {
    games = games.filter(
      (game) => game.participants.min <= filters.maxParticipants!
    );
  }

  if (filters.maxDuration !== undefined) {
    games = games.filter((game) => game.duration.min <= filters.maxDuration!);
  }

  if (filters.difficulty) {
    games = games.filter((game) => game.difficulty === filters.difficulty);
  }

  if (filters.tags && filters.tags.length > 0) {
    games = games.filter((game) =>
      filters.tags!.some((tag) => game.tags.includes(tag))
    );
  }

  return games;
}

// 获取随机游戏
export async function getRandomGame(
  filters?: GameFilters
): Promise<Game | null> {
  const games = filters ? await filterGames(filters) : await getAllGames();

  if (games.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * games.length);
  return games[randomIndex];
}

// 获取所有分类
export function getCategories(): GameCategory[] {
  return [
    "team-building",
    "online-meeting",
    "small-group",
    "creative-thinking",
    "energizer",
    "get-to-know",
  ];
}

// 获取分类统计
export async function getCategoryStats(): Promise<
  Record<GameCategory, number>
> {
  const games = await getAllGames();
  const stats: Record<string, number> = {};

  getCategories().forEach((category) => {
    stats[category] = games.filter((game) => game.category === category).length;
  });

  return stats as Record<GameCategory, number>;
}

// 获取相关游戏推荐
export async function getRelatedGames(
  gameId: string,
  limit: number = 3
): Promise<Game[]> {
  const currentGame = await getGameById(gameId);
  if (!currentGame) return [];

  const allGames = await getAllGames();

  // 过滤掉当前游戏
  const otherGames = allGames.filter((game) => game.id !== gameId);

  // 计算相似度分数
  const gamesWithScore = otherGames.map((game) => {
    let score = 0;

    // 相同分类加分
    if (game.category === currentGame.category) score += 3;

    // 相同难度加分
    if (game.difficulty === currentGame.difficulty) score += 2;

    // 相似人数范围加分
    const participantOverlap =
      Math.min(game.participants.max, currentGame.participants.max) -
      Math.max(game.participants.min, currentGame.participants.min);
    if (participantOverlap > 0) score += 1;

    // 共同标签加分
    const commonTags = game.tags.filter((tag) =>
      currentGame.tags.includes(tag)
    );
    score += commonTags.length;

    return { game, score };
  });

  // 按分数排序并返回前N个
  return gamesWithScore
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.game);
}
