import { getAllGames, getCategoryStats } from "@/lib/services/game-service";
import { CATEGORY_MAP } from "@/lib/types/game";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const games = await getAllGames();
  const categoryStats = await getCategoryStats();
  const featuredGames = games.slice(0, 6);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Hero Section - Sprunkin Style */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 opacity-10"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6 px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
              <span className="text-sm font-semibold text-purple-600">🎮 Ice Breaker Games Collection</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                Break the Ice
              </span>
              <br />
              <span className="text-gray-800">Make Every Gathering Fun</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Discover the perfect icebreaker games for team building,<br />
              online meetings, and social activities
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                🎲 Random Game
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                📚 Browse All Games
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 justify-center text-sm font-medium text-gray-600">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-2xl">✨</span>
                <span>{games.length}+ Games</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-2xl">📚</span>
                <span>6 Categories</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-2xl">👥</span>
                <span>3-100 People</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Game Selection Style */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-800">
            🔥 Choose Your Category
          </h2>
          <p className="text-lg text-gray-600">Select the perfect game type for your event</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(CATEGORY_MAP).map((category, index) => {
            const colors = [
              "from-blue-500 to-blue-600",
              "from-green-500 to-green-600",
              "from-purple-500 to-purple-600",
              "from-orange-500 to-orange-600",
              "from-pink-500 to-pink-600",
              "from-indigo-500 to-indigo-600"
            ];
            return (
              <Link key={category.id} href={`/?category=${category.id}`}>
                <Card className="group hover:scale-105 transition-all duration-300 cursor-pointer border-2 hover:border-purple-400 hover:shadow-2xl bg-white/80 backdrop-blur-sm h-full">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${colors[index]} flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform`}>
                      {category.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold group-hover:text-purple-600 transition-colors">
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge variant="secondary" className="text-lg px-4 py-1 font-semibold">
                      {categoryStats[category.id]} Games
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-800">
            ⭐ Featured Games
          </h2>
          <p className="text-lg text-gray-600">Most popular icebreaker games</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredGames.map((game, index) => {
            const gradients = [
              "from-blue-400 to-blue-500",
              "from-green-400 to-green-500",
              "from-purple-400 to-purple-500",
              "from-orange-400 to-orange-500",
              "from-pink-400 to-pink-500",
              "from-indigo-400 to-indigo-500"
            ];
            return (
              <Link key={game.id} href={`/game/${game.id}`}>
                <Card className="group hover:scale-105 transition-all duration-300 cursor-pointer border-2 hover:border-purple-400 hover:shadow-2xl bg-white/90 backdrop-blur-sm h-full overflow-hidden">
                  <div className={`h-3 bg-gradient-to-r ${gradients[index]}`}></div>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center text-2xl shadow-md`}>
                        {CATEGORY_MAP[game.category].icon}
                      </div>
                      <Badge variant="outline" className="font-semibold">
                        {game.difficulty === "easy" ? "Easy" : game.difficulty === "medium" ? "Medium" : "Hard"}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-purple-600 transition-colors line-clamp-1">
                      {game.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-base mt-2">
                      {game.shortDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3 text-sm font-medium text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <span>👥</span>
                        <span>{game.participants.min}-{game.participants.max}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>⏱️</span>
                        <span>{game.duration.min}-{game.duration.max}min</span>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Play Now →
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
        <div className="text-center">
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 hover:border-purple-600 hover:text-purple-600">
            View All {games.length} Games →
          </Button>
        </div>
      </section>

      {/* All Games Grid */}
      <section className="container mx-auto px-4 py-16 bg-white/40 backdrop-blur-sm rounded-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-800">
            🎮 All Games
          </h2>
          <p className="text-lg text-gray-600">Browse our complete collection</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {games.map((game) => (
            <Link key={game.id} href={`/game/${game.id}`}>
              <Card className="group hover:scale-105 transition-all duration-200 cursor-pointer hover:shadow-xl bg-white h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{CATEGORY_MAP[game.category].icon}</span>
                    <Badge variant="secondary" className="text-xs">
                      {CATEGORY_MAP[game.category].name}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold group-hover:text-purple-600 transition-colors line-clamp-1">
                    {game.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 text-xs text-gray-600 mb-2">
                    <span>👥 {game.participants.min}-{game.participants.max}</span>
                    <span>⏱️ {game.duration.min}-{game.duration.max}min</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {game.difficulty === "easy" ? "Easy" : game.difficulty === "medium" ? "Medium" : "Hard"}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-900 via-blue-900 to-pink-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-3xl font-black mb-3">🎮 Ice Breaker Games</h3>
            <p className="text-lg text-purple-200 mb-6">Make every gathering fun and memorable</p>
            <div className="flex justify-center gap-6 text-sm text-purple-300 mb-6">
              <Link href="#" className="hover:text-white transition-colors">About</Link>
              <Link href="#" className="hover:text-white transition-colors">Contact</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            </div>
            <p className="text-sm text-purple-400">
              © 2024 Ice Breaker Games. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
