const FAVORITES_KEY = "ice-breaker-favorites";
const RECENTLY_VIEWED_KEY = "ice-breaker-recently-viewed";
const MAX_RECENTLY_VIEWED = 10;

// 检查 localStorage 是否可用
function isLocalStorageAvailable(): boolean {
  try {
    const test = "__localStorage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

// 添加收藏
export function addFavorite(gameId: string): void {
  if (!isLocalStorageAvailable()) {
    console.warn("LocalStorage is not available");
    return;
  }

  try {
    const favorites = getFavorites();
    if (!favorites.includes(gameId)) {
      favorites.push(gameId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error("Error adding favorite:", error);
  }
}

// 移除收藏
export function removeFavorite(gameId: string): void {
  if (!isLocalStorageAvailable()) {
    console.warn("LocalStorage is not available");
    return;
  }

  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter((id) => id !== gameId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error("Error removing favorite:", error);
  }
}

// 获取所有收藏
export function getFavorites(): string[] {
  if (!isLocalStorageAvailable()) {
    return [];
  }

  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
}

// 检查是否已收藏
export function isFavorite(gameId: string): boolean {
  const favorites = getFavorites();
  return favorites.includes(gameId);
}

// 切换收藏状态
export function toggleFavorite(gameId: string): boolean {
  const isCurrentlyFavorite = isFavorite(gameId);

  if (isCurrentlyFavorite) {
    removeFavorite(gameId);
    return false;
  } else {
    addFavorite(gameId);
    return true;
  }
}

// 添加最近查看
export function addRecentlyViewed(gameId: string): void {
  if (!isLocalStorageAvailable()) {
    console.warn("LocalStorage is not available");
    return;
  }

  try {
    let recentlyViewed = getRecentlyViewed();

    // 移除已存在的相同ID
    recentlyViewed = recentlyViewed.filter((id) => id !== gameId);

    // 添加到开头
    recentlyViewed.unshift(gameId);

    // 限制数量
    if (recentlyViewed.length > MAX_RECENTLY_VIEWED) {
      recentlyViewed = recentlyViewed.slice(0, MAX_RECENTLY_VIEWED);
    }

    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentlyViewed));
  } catch (error) {
    console.error("Error adding recently viewed:", error);
  }
}

// 获取最近查看
export function getRecentlyViewed(): string[] {
  if (!isLocalStorageAvailable()) {
    return [];
  }

  try {
    const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error getting recently viewed:", error);
    return [];
  }
}

// 清除所有收藏
export function clearFavorites(): void {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    localStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.error("Error clearing favorites:", error);
  }
}

// 清除浏览历史
export function clearRecentlyViewed(): void {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    localStorage.removeItem(RECENTLY_VIEWED_KEY);
  } catch (error) {
    console.error("Error clearing recently viewed:", error);
  }
}
