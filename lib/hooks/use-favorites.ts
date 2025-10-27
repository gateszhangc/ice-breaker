"use client";

import { useState, useEffect } from "react";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorite,
  toggleFavorite,
} from "@/lib/services/storage-service";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 初始化加载收藏列表
  useEffect(() => {
    setFavorites(getFavorites());
    setIsLoaded(true);
  }, []);

  // 添加收藏
  const add = (gameId: string) => {
    addFavorite(gameId);
    setFavorites(getFavorites());
  };

  // 移除收藏
  const remove = (gameId: string) => {
    removeFavorite(gameId);
    setFavorites(getFavorites());
  };

  // 切换收藏状态
  const toggle = (gameId: string) => {
    const newState = toggleFavorite(gameId);
    setFavorites(getFavorites());
    return newState;
  };

  // 检查是否已收藏
  const checkIsFavorite = (gameId: string) => {
    return isFavorite(gameId);
  };

  return {
    favorites,
    isLoaded,
    addFavorite: add,
    removeFavorite: remove,
    toggleFavorite: toggle,
    isFavorite: checkIsFavorite,
  };
}
