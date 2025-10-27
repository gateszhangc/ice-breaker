# 实施计划

本文档将设计转化为可执行的开发任务。每个任务都是独立的代码实现步骤，按照依赖关系组织，确保逐步构建完整的破冰游戏网站。

## 任务列表

- [x] 1. 项目初始化和基础配置



  - 创建 Next.js 14+ 项目，配置 TypeScript
  - 安装和配置 Tailwind CSS
  - 初始化 shadcn/ui 组件库
  - 配置项目目录结构
  - 设置 ESLint 和 Prettier
  - _需求: 1.1, 1.2, 1.3_



- [ ] 1.1 创建 Next.js 项目
  - 使用 `create-next-app` 创建项目，选择 TypeScript 和 App Router
  - 配置 `next.config.js` 支持静态导出
  - 创建基础目录结构（app, components, lib, data, public）

  - _需求: 1.1_

- [ ] 1.2 配置 Tailwind CSS 和 shadcn/ui
  - 安装 Tailwind CSS 依赖
  - 配置 `tailwind.config.ts` 和 `globals.css`
  - 初始化 shadcn/ui（运行 `npx shadcn-ui@latest init`）


  - 配置主题颜色（活力橙色/蓝色）
  - _需求: 7.2_



- [ ] 1.3 安装必需的 shadcn/ui 组件
  - 安装 Button, Card, Input, Badge 组件
  - 安装 Select, Slider, Separator 组件
  - 安装 Skeleton 组件用于加载状态
  - 验证组件可正常导入使用


  - _需求: 7.2_

- [ ] 2. 数据模型和类型定义
  - 创建 TypeScript 类型定义（Game, GameCategory, GameFilters 等）
  - 创建示例游戏数据 JSON 文件（至少 10-15 个游戏）


  - 实现数据验证和类型守卫
  - _需求: 1.1, 1.2, 1.3_

- [x] 2.1 定义核心类型


  - 在 `lib/types/game.ts` 中定义 Game 接口
  - 定义 GameCategory 类型（团队建设、线上会议等）
  - 定义 GameFilters 接口
  - 定义 UserPreferences 接口
  - _需求: 1.1, 1.2_



- [ ] 2.2 创建游戏数据文件
  - 在 `data/games.json` 中创建至少 15 个游戏数据
  - 确保每个分类至少有 2-3 个游戏
  - 包含完整的游戏信息（标题、描述、步骤、提示等）
  - 添加多样化的人数、时长、难度配置
  - _需求: 1.1, 1.2, 1.3_

- [x] 3. 服务层实现


  - 实现 GameService（游戏数据获取和筛选）
  - 实现 StorageService（LocalStorage 操作）
  - 实现工具函数（搜索、筛选、排序）
  - _需求: 1.1, 1.2, 1.3, 3.1, 3.2, 5.1_

- [ ] 3.1 实现 GameService
  - 创建 `lib/services/game-service.ts`
  - 实现 `getAllGames()` 方法
  - 实现 `getGameById(id)` 方法

  - 实现 `getGamesByCategory(category)` 方法

  - 实现 `searchGames(query)` 方法
  - 实现 `filterGames(filters)` 方法
  - 实现 `getRandomGame(filters?)` 方法

  - 实现 `getCategories()` 方法
  - _需求: 1.1, 1.2, 1.3, 3.1, 3.2_

- [ ] 3.2 实现 StorageService
  - 创建 `lib/services/storage-service.ts`
  - 实现 `addFavorite(gameId)` 方法
  - 实现 `removeFavorite(gameId)` 方法
  - 实现 `getFavorites()` 方法
  - 实现 `isFavorite(gameId)` 方法
  - 实现 `addRecentlyViewed(gameId)` 方法
  - 实现 `getRecentlyViewed()` 方法
  - 添加错误处理（LocalStorage 不可用时的降级）


  - _需求: 5.1, 5.2, 5.3_

- [ ] 3.3 实现工具函数
  - 创建 `lib/utils/filter.ts` 实现游戏筛选逻辑
  - 创建 `lib/utils/search.ts` 实现搜索算法（模糊匹配）
  - 实现防抖函数用于搜索输入
  - 实现节流函数用于筛选操作
  - _需求: 1.3, 3.1, 3.2_

- [ ] 4. 自定义 Hooks 实现
  - 实现 useGames Hook（游戏数据管理）
  - 实现 useFavorites Hook（收藏功能）
  - 实现 useSearch Hook（搜索功能）
  - _需求: 1.1, 3.1, 5.1_

- [ ] 4.1 实现 useGames Hook
  - 创建 `lib/hooks/use-games.ts`
  - 管理游戏列表状态
  - 提供筛选和排序功能
  - 处理加载状态
  - _需求: 1.1, 1.3_

- [ ] 4.2 实现 useFavorites Hook
  - 创建 `lib/hooks/use-favorites.ts`
  - 管理收藏列表状态
  - 提供添加/移除收藏功能
  - 同步 LocalStorage
  - _需求: 5.1, 5.2, 5.3_

- [ ] 4.3 实现 useSearch Hook
  - 创建 `lib/hooks/use-search.ts`
  - 管理搜索状态和结果
  - 实现防抖搜索
  - 提供搜索建议
  - _需求: 3.1, 3.2_

- [ ] 5. 布局组件实现
  - 创建 RootLayout（根布局）
  - 创建 Header 组件（导航栏和搜索）
  - 创建 Footer 组件
  - 实现响应式导航
  - _需求: 4.1, 7.1_

- [ ] 5.1 实现 RootLayout
  - 创建 `app/layout.tsx`
  - 配置 Metadata（SEO 优化）
  - 引入全局样式
  - 设置 HTML lang 属性
  - 包含 Header 和 Footer
  - _需求: 7.1, 7.2_

- [ ] 5.2 实现 Header 组件
  - 创建 `components/layout/header.tsx` (Client Component)
  - 实现 Logo 和导航链接
  - 集成搜索框（使用 shadcn/ui Input）
  - 实现响应式菜单（移动端汉堡菜单）
  - 添加收藏页面链接
  - _需求: 3.1, 4.1, 7.1_

- [ ] 5.3 实现 Footer 组件
  - 创建 `components/layout/footer.tsx` (Server Component)
  - 添加版权信息
  - 添加导航链接（关于、联系、隐私政策）
  - 添加社交媒体图标（可选）
  - _需求: 7.1_

- [ ] 6. 游戏展示组件实现
  - 创建 GameCard 组件（游戏卡片）
  - 创建 GameGrid 组件（网格布局）
  - 创建 GameDetail 组件（详情展示）
  - 实现响应式布局
  - _需求: 1.1, 1.2, 2.1_

- [ ] 6.1 实现 GameCard 组件
  - 创建 `components/game/game-card.tsx` (Server Component)
  - 使用 shadcn/ui Card 组件
  - 显示游戏标题、分类、人数、时长、难度
  - 显示简短描述（2行截断）
  - 集成 FavoriteButton
  - 添加"查看详情"链接
  - 实现悬停效果
  - _需求: 1.1, 1.2_

- [ ] 6.2 实现 GameGrid 组件
  - 创建 `components/game/game-grid.tsx` (Server Component)
  - 实现响应式网格布局（桌面4列，平板3列，移动2列）
  - 使用 Tailwind CSS Grid
  - 处理空状态（无游戏时）
  - 添加加载骨架屏
  - _需求: 1.1, 7.1_

- [ ] 6.3 实现 GameDetail 组件
  - 创建 `components/game/game-detail.tsx` (Server Component)
  - 显示完整游戏信息（标题、描述、目标、材料、步骤、提示、变体）
  - 使用图标和徽章展示关键信息
  - 实现步骤编号和格式化
  - 添加打印友好样式
  - _需求: 2.1, 2.2, 2.3, 2.4_

- [ ] 7. 搜索和筛选组件实现
  - 创建 SearchBar 组件
  - 创建 FilterBar 组件
  - 实现快速筛选标签
  - 实现高级筛选面板
  - _需求: 1.3, 3.1, 3.2_

- [ ] 7.1 实现 SearchBar 组件
  - 创建 `components/search/search-bar.tsx` (Client Component)
  - 使用 shadcn/ui Input 组件
  - 实现防抖搜索（300ms）
  - 显示搜索建议（可选）
  - 处理搜索提交
  - _需求: 3.1, 3.2_

- [ ] 7.2 实现 FilterBar 组件
  - 创建 `components/search/filter-bar.tsx` (Client Component)
  - 使用 shadcn/ui Select 和 Slider 组件
  - 实现分类筛选
  - 实现人数范围筛选（滑块）
  - 实现时长筛选（滑块）
  - 实现难度筛选（下拉）
  - 显示筛选结果数量
  - 添加"清除筛选"按钮
  - _需求: 1.3, 3.2_

- [ ] 7.3 实现快速筛选标签
  - 创建 `components/search/quick-filters.tsx` (Client Component)
  - 实现 Pill 按钮样式
  - 预设常用筛选条件（5-10人、15分钟内、无需材料等）
  - 支持多选
  - 显示已选择的标签
  - _需求: 1.3_

- [ ] 8. 功能组件实现
  - 创建 FavoriteButton 组件
  - 创建 RandomGameButton 组件
  - 创建 ShareButton 组件（可选）
  - 创建 Breadcrumb 组件
  - _需求: 5.1, 6.1_

- [ ] 8.1 实现 FavoriteButton 组件
  - 创建 `components/game/favorite-button.tsx` (Client Component)
  - 使用 shadcn/ui Button 组件
  - 使用 Heart 图标（lucide-react）
  - 实现收藏/取消收藏功能
  - 添加填充动画效果
  - 集成 useFavorites Hook
  - _需求: 5.1, 5.2_



- [ ] 8.2 实现 RandomGameButton 组件
  - 创建 `components/game/random-game-button.tsx` (Client Component)
  - 使用 shadcn/ui Button 组件
  - 实现随机选择游戏逻辑
  - 支持基于筛选条件的随机推荐
  - 导航到游戏详情页
  - _需求: 6.1, 6.2_


- [ ] 8.3 实现 Breadcrumb 组件
  - 创建 `components/layout/breadcrumb.tsx` (Server Component)
  - 显示当前页面路径
  - 实现动态面包屑（基于路由）
  - 添加 Schema.org 结构化数据
  - _需求: 2.1_

- [ ] 9. 首页实现
  - 创建首页布局（Hero Banner + 分类 + 游戏列表）
  - 实现热门分类卡片
  - 实现精选游戏区域
  - 实现所有游戏网格
  - 实现场景推荐区域
  - _需求: 1.1, 1.2, 1.3, 6.1_

- [ ] 9.1 实现 Hero Banner
  - 在 `app/page.tsx` 中创建 Hero 区域
  - 添加大标题和副标题
  - 添加随机推荐和浏览游戏按钮
  - 显示统计数据（游戏数量、分类数量）
  - 实现渐变背景
  - _需求: 1.1, 6.1_


- [ ] 9.2 实现热门分类区域
  - 创建分类卡片组件
  - 显示 6 个主要分类（团队建设、线上会议等）
  - 每个卡片显示图标和游戏数量
  - 实现点击导航到分类页面
  - 使用 2x3 网格布局（桌面端）
  - _需求: 1.1, 1.2_

- [ ] 9.3 实现快速筛选区域
  - 集成 QuickFilters 组件
  - 显示常用筛选标签
  - 实现筛选状态管理
  - 实时更新游戏列表
  - 显示筛选结果数量
  - _需求: 1.3_

- [ ] 9.4 实现精选游戏区域
  - 创建"最受欢迎"游戏展示区
  - 使用大卡片样式
  - 显示评分星级（可选）
  - 横向滚动或网格布局
  - 添加"查看全部"链接
  - _需求: 1.1_


- [ ] 9.5 实现所有游戏区域
  - 集成 GameGrid 组件
  - 显示所有游戏（或分页/无限滚动）
  - 实现"加载更多"功能
  - 添加排序选项（可选）
  - _需求: 1.1, 1.3_


- [ ] 9.6 实现场景推荐区域
  - 创建场景卡片组件
  - 显示 3-4 个使用场景（新员工入职、年会团建等）
  - 横向滚动布局
  - 每个场景显示推荐游戏数量
  - 实现点击导航到筛选结果
  - _需求: 1.1_


- [ ] 10. 游戏详情页实现
  - 创建游戏详情页面
  - 实现面包屑导航
  - 显示完整游戏信息
  - 集成收藏、分享、打印功能
  - 实现相关游戏推荐
  - 添加结构化数据（SEO）
  - _需求: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 10.1 创建游戏详情页面
  - 创建 `app/game/[id]/page.tsx` (Server Component)
  - 实现 `generateStaticParams` 生成静态路径
  - 实现 `generateMetadata` 动态 SEO
  - 获取游戏数据并传递给组件
  - 处理游戏未找到的情况（404）
  - _需求: 2.1_

- [ ] 10.2 实现游戏详情布局
  - 集成 Breadcrumb 组件
  - 显示游戏标题和分类标签
  - 显示关键信息卡片（人数、时长、难度、材料）
  - 集成 GameDetail 组件
  - 添加收藏、分享、打印按钮
  - _需求: 2.1, 2.2, 2.3, 2.4_

- [ ] 10.3 实现相关游戏推荐
  - 创建推荐算法（基于分类和标签）
  - 显示 3-4 个相关游戏
  - 使用 GameCard 组件
  - 横向滚动或网格布局
  - _需求: 2.1_

- [ ] 10.4 添加结构化数据
  - 创建 `components/game/game-schema.tsx`
  - 实现 Schema.org HowTo 结构化数据
  - 包含游戏步骤、材料、时长等信息
  - 在游戏详情页中引入
  - _需求: 2.1_

- [ ] 11. 收藏页面实现
  - 创建收藏页面
  - 显示收藏的游戏列表
  - 实现排序和筛选
  - 处理空状态
  - _需求: 5.1, 5.2, 5.3_

- [ ] 11.1 创建收藏页面
  - 创建 `app/favorites/page.tsx` (Client Component)
  - 使用 useFavorites Hook 获取收藏列表
  - 获取收藏的游戏详细信息
  - 处理加载状态
  - _需求: 5.1, 5.3_

- [ ] 11.2 实现收藏列表展示
  - 显示收藏统计（已收藏 X 个游戏）
  - 使用 GameGrid 组件展示游戏
  - 实现排序选项（按分类、人数、时长）
  - 添加"取消收藏"功能
  - _需求: 5.1, 5.2_

- [ ] 11.3 实现空状态
  - 创建空状态组件
  - 显示友好提示信息
  - 添加"浏览游戏"按钮
  - 推荐热门游戏（可选）
  - _需求: 5.3_

- [ ] 12. 搜索结果页面实现
  - 创建搜索结果页面
  - 显示搜索结果列表
  - 实现排序功能
  - 处理无结果状态
  - _需求: 3.1, 3.2, 3.3_

- [ ] 12.1 创建搜索结果页面
  - 创建 `app/search/page.tsx` (Client Component)
  - 从 URL 参数获取搜索关键词
  - 使用 useSearch Hook 执行搜索
  - 处理加载状态

  - _需求: 3.1, 3.2_

- [ ] 12.2 实现搜索结果展示
  - 显示搜索统计（找到 X 个游戏）
  - 使用 GameGrid 组件展示结果
  - 实现排序选项（按相关性、人气、时长）

  - 高亮搜索关键词（可选）
  - _需求: 3.1, 3.2_

- [ ] 12.3 实现无结果状态
  - 显示"未找到相关游戏"提示
  - 提供搜索建议

  - 显示热门搜索关键词
  - 推荐热门游戏
  - _需求: 3.3_

- [ ] 13. SEO 优化实现
  - 配置全局 Metadata
  - 实现动态 Metadata
  - 生成 Sitemap
  - 生成 Robots.txt
  - 添加 Open Graph 图片
  - _需求: 7.1, 7.2_

- [ ] 13.1 配置全局 Metadata
  - 在 `app/layout.tsx` 中配置默认 Metadata
  - 设置标题模板
  - 配置 Open Graph 和 Twitter Card
  - 设置 robots 配置
  - _需求: 7.1_

- [ ] 13.2 实现 Sitemap 生成
  - 创建 `app/sitemap.ts`
  - 包含首页、收藏页
  - 动态生成所有游戏页面 URL
  - 设置优先级和更新频率
  - _需求: 7.1_

- [ ] 13.3 实现 Robots.txt
  - 创建 `app/robots.ts`
  - 允许所有爬虫访问
  - 指向 Sitemap
  - _需求: 7.1_

- [ ] 14. 响应式设计和移动端优化
  - 优化移动端布局
  - 实现触摸交互
  - 优化移动端导航
  - 测试各种屏幕尺寸
  - _需求: 4.1, 4.2, 4.3, 7.1_

- [ ] 14.1 优化移动端首页
  - 调整 Hero Banner 为单列布局
  - 分类卡片改为 2 列网格
  - 游戏网格改为 2 列
  - 实现横向滚动的精选游戏
  - 优化快速筛选标签（横向滚动）
  - _需求: 4.1, 7.1_

- [ ] 14.2 优化移动端游戏详情页
  - 简化标题栏（返回按钮 + 收藏）
  - 关键信息使用紧凑布局
  - 实现可折叠的内容区域（步骤、提示、变体）
  - 底部固定操作栏（分享、打印）
  - 相关游戏横向滚动
  - _需求: 4.1, 7.1_

- [ ] 14.3 实现响应式导航
  - 桌面端：完整导航栏
  - 移动端：汉堡菜单
  - 实现侧边栏抽屉（可选）
  - 优化搜索框展开/收起
  - _需求: 4.1, 7.1_

- [ ] 15. 性能优化
  - 实现代码分割
  - 优化图片加载
  - 添加加载状态
  - 实现防抖和节流
  - 优化 Core Web Vitals
  - _需求: 7.1, 7.2_

- [ ] 15.1 实现加载状态
  - 为所有异步操作添加 Skeleton
  - 使用 shadcn/ui Skeleton 组件
  - 实现页面级别的 Loading 组件

  - 优化感知性能
  - _需求: 7.2_

- [ ] 15.2 优化搜索和筛选性能
  - 实现搜索防抖（300ms）
  - 实现筛选节流
  - 优化大列表渲染
  - 考虑虚拟滚动（如果游戏数量 > 100）
  - _需求: 7.1_

- [ ] 16. 错误处理和边界情况
  - 实现 Error Boundary
  - 创建 404 页面
  - 处理 LocalStorage 不可用
  - 添加错误提示
  - _需求: 7.1_

- [ ] 16.1 实现 Error Boundary
  - 创建 `app/error.tsx`
  - 显示友好的错误信息
  - 提供重试按钮
  - 记录错误日志
  - _需求: 7.1_

- [ ] 16.2 创建 404 页面
  - 创建 `app/not-found.tsx`
  - 显示友好的 404 提示
  - 提供返回首页链接
  - 推荐热门游戏
  - 添加搜索框
  - _需求: 7.1_

- [ ] 17. 部署配置和最终测试
  - 配置静态导出
  - 测试所有功能
  - 性能测试
  - SEO 检查
  - 准备部署到 Vercel
  - _需求: 所有需求_

- [ ] 17.1 配置静态导出
  - 更新 `next.config.js` 设置 `output: 'export'`
  - 配置 `images.unoptimized: true`
  - 测试静态导出构建
  - 验证所有页面正常生成
  - _需求: 7.1_

- [ ] 17.2 功能测试
  - 测试游戏浏览和筛选
  - 测试搜索功能
  - 测试收藏功能
  - 测试随机推荐
  - 测试所有链接和导航
  - 测试响应式布局
  - _需求: 所有需求_

- [ ] 17.3 性能和 SEO 检查
  - 运行 Lighthouse 测试
  - 检查 Core Web Vitals
  - 验证 Metadata 正确性
  - 检查 Sitemap 和 Robots.txt
  - 验证结构化数据
  - 测试社交分享预览
  - _需求: 7.1, 7.2_

- [ ] 17.4 部署到 Vercel
  - 连接 GitHub 仓库
  - 配置 Vercel 项目
  - 设置环境变量（如需要）
  - 执行首次部署
  - 验证生产环境功能
  - 配置自定义域名（可选）
  - _需求: 所有需求_

## 任务执行说明

### 执行顺序
1. 按照任务编号顺序执行
2. 完成父任务前必须完成所有子任务
3. 某些任务可以并行执行（如组件开发）

### 测试要求
- 每完成一个组件，验证其功能正常
- 使用 TypeScript 确保类型安全
- 测试响应式布局
- 验证 SEO 配置

### 代码质量
- 遵循 Next.js 最佳实践
- 使用 Server Components 优先
- 仅在需要交互时使用 Client Components
- 保持代码简洁和可维护性

### 优先级
- **高优先级**：任务 1-12（核心功能）
- **中优先级**：任务 13-15（SEO 和性能）
- **低优先级**：任务 16-17（优化和部署）

## 预估时间

- 项目初始化和配置：2-3 小时
- 数据模型和服务层：3-4 小时
- 组件开发：8-10 小时
- 页面实现：6-8 小时
- SEO 和优化：3-4 小时
- 测试和部署：2-3 小时

**总计：24-32 小时**（约 3-4 个工作日）
