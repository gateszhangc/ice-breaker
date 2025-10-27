# 🎮 Ice Breaker Games

A modern icebreaker games website to help team building, social activities, and meeting organizers quickly find the perfect interactive games.

## ✨ Features

- 🎯 **15+ Curated Games** - Covering team building, online meetings, small groups, and more
- 📱 **Responsive Design** - Perfect support for desktop and mobile
- 🔍 **Smart Search** - Quickly find suitable games
- 🏷️ **Category Browse** - 6 major categories, easy navigation
- 📊 **Detailed Information** - Including game steps, tips, variations, and more
- ⚡ **Fast Loading** - Static generation for instant access
- 🎨 **Modern UI** - Built with shadcn/ui component library
- 🌈 **Sprunkin-Inspired Design** - Colorful, game-like interface

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Deployment**: Vercel (Static Export)

## 📦 Installation

\`\`\`bash
# Install dependencies
npm install

# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## 📁 Project Structure

\`\`\`
ice-breaker-games/
├── app/                    # Next.js App Router pages
│   ├── game/[id]/         # Game detail pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── sitemap.ts         # Sitemap
│   └── robots.ts          # Robots.txt
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utility library
│   ├── services/         # Data services
│   ├── hooks/            # Custom Hooks
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
├── data/                  # Game data
│   └── games.json        # Game data file
└── public/               # Static assets
\`\`\`

## 🎮 Game Categories

- 👥 **Team Building** - Strengthen team cohesion and collaboration
- 💻 **Online Meeting** - Perfect for remote team interactions
- 🤝 **Small Group** - Ideal for small team activities
- 🎨 **Creative Thinking** - Spark creativity and imagination
- ⚡ **Quick Energizer** - Fast-paced games to energize
- 👋 **Get to Know** - Help new members connect

## 📝 Adding New Games

Edit the \`data/games.json\` file and add new games following this format:

\`\`\`json
{
  "id": "game-id",
  "title": "Game Name",
  "description": "Detailed description",
  "shortDescription": "Brief description",
  "category": "team-building",
  "participants": { "min": 5, "max": 20 },
  "duration": { "min": 15, "max": 30 },
  "difficulty": "easy",
  "materials": ["Required materials"],
  "steps": ["Step 1", "Step 2"],
  "tips": ["Tip 1", "Tip 2"],
  "variants": ["Variant 1"],
  "tags": ["tag1", "tag2"],
  "objectives": ["Objective 1", "Objective 2"]
}
\`\`\`

## 🎨 Design Inspiration

This project's homepage design is inspired by [Sprunkin.com](https://sprunkin.com/), featuring:
- Bold, colorful gradients
- Large, game-like category cards
- Clear visual hierarchy
- Engaging, playful interface
- Modern glassmorphism effects

## 🌐 Deployment

The project is configured for static export and can be deployed to any static hosting service:

\`\`\`bash
# Build static files
npm run build

# Output directory: out/
\`\`\`

Recommended platforms:
- Vercel (Recommended)
- Netlify
- GitHub Pages
- Cloudflare Pages

## 📄 License

MIT License

## 🤝 Contributing

Issues and Pull Requests are welcome!

---

**Make every gathering fun and memorable!** 🎉
