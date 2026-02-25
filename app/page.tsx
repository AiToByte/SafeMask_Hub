"use client"

import { Shield, ChevronRight, Github, LayoutGrid, Zap, Filter } from "lucide-react";
import RuleCard from "@/components/marketplace/RuleCard";
import { CommunityRule } from "@/types/rule";

// 静态模拟数据 - 未来通过 Go 后端获取
const MOCK_RULES: CommunityRule[] = [
  {
    id: "1",
    name: "OpenAI Pro Key",
    author: "XiaoSheng",
    category: "AI_API",
    pattern: "sk-proj-[a-zA-Z0-9]{32,}",
    mask: "<OPENAI_KEY>",
    priority: 80,
    downloads: 1240,
    description: "适配 OpenAI 最新的 Project 级别 API Key 识别逻辑。"
  },
  {
    id: "2",
    name: "IPv4_Full_Range",
    author: "SysAdmin",
    category: "Network",
    pattern: "\\b(?:(?:25[0-5]|2[0-4]\\d|1?\\d{1,2})\\.){3}(?:25[0-5]|2[0-4]\\d|1?\\d{1,2})\\b",
    mask: "<IPv4>",
    priority: 50,
    downloads: 850,
    description: "工业级标准的 IPv4 全段识别正则，防版本号误触。"
  },
  {
    id: "3",
    name: "MySQL_URI",
    author: "DBA_Master",
    category: "Database",
    pattern: "mysql(?:\\+.+)?://[^\\s'\"<>]+",
    mask: "<MYSQL_CONNECTION>",
    priority: 90,
    downloads: 2100,
    description: "精准识别数据库连接字符串，保护敏感的 host 和密码。"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-amber-500/30">
      {/* 顶部背景装饰光 */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-amber-500/[0.03] blur-[120px] pointer-events-none" />

      {/* 导航栏 */}
      <nav className="max-w-7xl mx-auto px-12 h-24 flex items-center justify-between relative z-10 border-b border-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-amber-500/20 flex items-center justify-center shadow-2xl">
            <Shield size={20} className="text-amber-500" />
          </div>
          <div className="flex flex-col">
            <span className="font-black tracking-tighter text-xl leading-none">SafeMask Hub</span>
            <span className="text-[8px] font-black text-amber-500/50 uppercase tracking-[0.3em] mt-1">Rule Ecosystem</span>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <a href="#" className="text-[11px] font-black uppercase tracking-widest text-zinc-500 hover:text-amber-200 transition-colors">Marketplace</a>
          <a href="#" className="text-[11px] font-black uppercase tracking-widest text-zinc-500 hover:text-amber-200 transition-colors">Rewards</a>
          <button className="px-6 py-2.5 bg-amber-500 text-black rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-amber-400 transition-all shadow-xl shadow-amber-900/10">
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-12 pt-24 pb-12 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-gradient-to-br from-amber-50 via-amber-50 to-amber-500/30 bg-clip-text text-transparent">
            赋予 AI 安全的<br />“视觉”界限
          </h1>
          <p className="text-md text-zinc-500 max-w-xl mb-10 leading-relaxed font-medium">
            SafeMask Hub 是全球首个专注于 AI 语义友好的脱敏规则市场。在这里贡献你的智慧，不仅是保护隐私，更是在构建更可靠的人机协作基石。
          </p>
          <div className="flex items-center gap-4">
            <button className="px-8 py-4 bg-amber-500 text-black rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center gap-3 hover:bg-amber-400 transition-all">
              开始贡献 <Zap size={14} fill="currentColor" />
            </button>
            <div className="flex items-center gap-6 ml-4">
              <div className="flex flex-col">
                <span className="text-lg font-mono font-bold leading-none">2,400+</span>
                <span className="text-[9px] font-black text-zinc-600 uppercase mt-1">Rules Live</span>
              </div>
              <div className="w-px h-6 bg-zinc-800" />
              <div className="flex flex-col">
                <span className="text-lg font-mono font-bold leading-none">150k+</span>
                <span className="text-[9px] font-black text-zinc-600 uppercase mt-1">Imports</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 规则广场区域 */}
      <section className="max-w-7xl mx-auto px-12 py-12 relative z-10">
        <div className="flex items-center justify-between mb-10 border-b border-white/[0.02] pb-6">
          <div className="flex items-center gap-3">
            <LayoutGrid size={18} className="text-amber-500/50" />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">精选规则市场</h2>
          </div>
          <div className="flex items-center gap-4">
             <button className="flex items-center gap-2 text-[10px] font-black text-zinc-500 hover:text-amber-400 transition-all uppercase">
               <Filter size={12} /> Filter
             </button>
          </div>
        </div>

        {/* 规则网格布局 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_RULES.map(rule => (
            <RuleCard key={rule.id} rule={rule} />
          ))}
        </div>
      </section>

      {/* 极简页脚 */}
      <footer className="max-w-7xl mx-auto px-12 py-20 opacity-20 text-center">
        <p className="text-[9px] font-mono uppercase tracking-[0.6em]">
          SafeMask Hub · Empowering Private Intelligence
        </p>
      </footer>
    </main>
  );
}