// 游戏分类类型
export type GameCategory =
  | "team-building"
  | "online-meeting"
  | "small-group"
  | "creative-thinking"
  | "energizer"
  | "get-to-know";

// 难度级别
export type GameDifficulty = "easy" | "medium" | "hard";

// 游戏接口
export interface Game {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: GameCategory;
  participants: {
    min: number;
    max: number;
  };
  duration: {
    min: number; // 分钟
    max: number;
  };
  difficulty: GameDifficulty;
  materials: string[];
  steps: string[];
  tips: string[];
  variants?: string[];
  tags: string[];
  objectives: string[];
}

// 游戏筛选条件
export interface GameFilters {
  category?: GameCategory;
  minParticipants?: number;
  maxParticipants?: number;
  maxDuration?: number;
  difficulty?: GameDifficulty;
  tags?: string[];
}

// 用户偏好设置
export interface UserPreferences {
  favorites: string[]; // 游戏ID数组
  recentlyViewed: string[];
}

// 分类信息
export interface CategoryInfo {
  id: GameCategory;
  name: string;
  icon: string;
  description: string;
}

// Category mapping
export const CATEGORY_MAP: Record<GameCategory, CategoryInfo> = {
  "team-building": {
    id: "team-building",
    name: "Team Building",
    icon: "👥",
    description: "Strengthen team cohesion and collaboration",
  },
  "online-meeting": {
    id: "online-meeting",
    name: "Online Meeting",
    icon: "💻",
    description: "Perfect for remote team interactions",
  },
  "small-group": {
    id: "small-group",
    name: "Small Group",
    icon: "🤝",
    description: "Ideal for small team activities",
  },
  "creative-thinking": {
    id: "creative-thinking",
    name: "Creative Thinking",
    icon: "🎨",
    description: "Spark creativity and imagination",
  },
  energizer: {
    id: "energizer",
    name: "Quick Energizer",
    icon: "⚡",
    description: "Fast-paced games to energize",
  },
  "get-to-know": {
    id: "get-to-know",
    name: "Get to Know",
    icon: "👋",
    description: "Help new members connect",
  },
};

// Difficulty mapping
export const DIFFICULTY_MAP: Record<GameDifficulty, { name: string; color: string }> = {
  easy: { name: "Easy", color: "text-green-600" },
  medium: { name: "Medium", color: "text-yellow-600" },
  hard: { name: "Hard", color: "text-red-600" },
};
