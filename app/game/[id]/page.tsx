import { getGameById, getAllGames, getRelatedGames } from "@/lib/services/game-service";
import { CATEGORY_MAP, DIFFICULTY_MAP } from "@/lib/types/game";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const games = await getAllGames();
  return games.map((game) => ({
    id: game.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const game = await getGameById(id);

  if (!game) {
    return {
      title: "Game Not Found",
    };
  }

  return {
    title: game.title,
    description: game.description,
    keywords: [game.title, ...game.tags, game.category],
  };
}

export default async function GameDetailPage({ params }: { params: { id: string } }) {
  const game = await getGameById(params.id);

  if (!game) {
    notFound();
  }

  const relatedGames = await getRelatedGames(game.id);
  const categoryInfo = CATEGORY_MAP[game.category];
  const difficultyInfo = DIFFICULTY_MAP[game.difficulty];

  const categoryColors: Record<string, string> = {
    "team-building": "from-blue-500 to-blue-600",
    "online-meeting": "from-green-500 to-green-600",
    "small-group": "from-purple-500 to-purple-600",
    "creative-thinking": "from-orange-500 to-orange-600",
    "energizer": "from-pink-500 to-pink-600",
    "get-to-know": "from-indigo-500 to-indigo-600"
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className={`bg-gradient-to-r ${categoryColors[game.category]} text-white py-16`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl">
                {categoryInfo.icon}
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-1 font-semibold">
                {categoryInfo.name}
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6">{game.title}</h1>
            <p className="text-xl md:text-2xl opacity-95 mb-8 leading-relaxed">{game.shortDescription}</p>

            {/* Key Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">👥</div>
                <div className="font-bold text-lg">{game.participants.min}-{game.participants.max}</div>
                <div className="text-sm opacity-90">People</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">⏱️</div>
                <div className="font-bold text-lg">{game.duration.min}-{game.duration.max}</div>
                <div className="text-sm opacity-90">Minutes</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">📊</div>
                <div className="font-bold text-lg">{difficultyInfo.name}</div>
                <div className="text-sm opacity-90">Difficulty</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">📦</div>
                <div className="font-bold text-sm">{game.materials[0]}</div>
                <div className="text-xs opacity-90">Materials</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Description */}
          <Card className="border-2 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <span className="text-3xl">📝</span>
                About This Game
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 leading-relaxed">{game.description}</p>
            </CardContent>
          </Card>

          {/* Objectives */}
          <Card className="border-2 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <span className="text-3xl">🎯</span>
                Game Objectives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {game.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      ✓
                    </span>
                    <span className="text-gray-700 text-lg">{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Materials */}
          <Card className="border-2 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <span className="text-3xl">📦</span>
                Materials Needed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {game.materials.map((material, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700 text-lg">
                    <span className="text-purple-500">•</span>
                    {material}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Steps */}
          <Card className="border-2 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <span className="text-3xl">🎮</span>
                How to Play
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-6">
                {game.steps.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <span className={`flex-shrink-0 w-10 h-10 bg-gradient-to-r ${categoryColors[game.category]} text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg`}>
                      {index + 1}
                    </span>
                    <p className="text-gray-700 text-lg pt-2 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="border-2 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <span className="text-3xl">💡</span>
                Pro Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {game.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-yellow-500 text-xl">★</span>
                    <span className="text-gray-700 text-lg">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Variants */}
          {game.variants && game.variants.length > 0 && (
            <Card className="border-2 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <span className="text-3xl">🔄</span>
                  Game Variations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {game.variants.map((variant, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-purple-500 text-xl">▸</span>
                      <span className="text-gray-700 text-lg">{variant}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {game.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-base px-4 py-1">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8">
              ♥ Add to Favorites
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-2">
              🔗 Share Game
            </Button>
          </div>
        </div>
      </div>

      {/* Related Games */}
      {relatedGames.length > 0 && (
        <section className="container mx-auto px-4 py-16 bg-white/40 backdrop-blur-sm rounded-3xl mb-12">
          <h2 className="text-4xl font-black mb-8 text-center text-gray-800">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {relatedGames.map((relatedGame) => (
              <Link key={relatedGame.id} href={`/game/${relatedGame.id}`}>
                <Card className="group hover:scale-105 transition-all duration-300 cursor-pointer border-2 hover:border-purple-400 hover:shadow-xl bg-white h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">{CATEGORY_MAP[relatedGame.category].icon}</span>
                      <Badge variant="secondary">
                        {CATEGORY_MAP[relatedGame.category].name}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-purple-600 transition-colors">
                      {relatedGame.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-base mt-2">
                      {relatedGame.shortDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-3 text-sm text-gray-600">
                      <span>👥 {relatedGame.participants.min}-{relatedGame.participants.max}</span>
                      <span>⏱️ {relatedGame.duration.min}-{relatedGame.duration.max}min</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-900 via-blue-900 to-pink-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-black mb-3">🎮 Ice Breaker Games</h3>
          <p className="text-lg text-purple-200 mb-6">Make every gathering fun and memorable</p>
          <p className="text-sm text-purple-400">
            © 2024 Ice Breaker Games. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
