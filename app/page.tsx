import { Shield, ChevronRight, Github } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-amber-500/30">
      {/* 顶部背景装饰光 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-amber-500/5 blur-[120px] pointer-events-none" />

      {/* 导航栏 */}
      <nav className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Shield size={18} className="text-amber-500" />
          </div>
          <span className="font-bold tracking-tighter text-xl">SafeMask Hub</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-zinc-500 hover:text-amber-200 transition-colors">规则广场</a>
          <a href="#" className="text-sm text-zinc-500 hover:text-amber-200 transition-colors">积分商城</a>
          <button className="px-5 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-bold text-amber-500 hover:bg-amber-500 hover:text-black transition-all">
            用户登录
          </button>
        </div>
      </nav>

      {/* Hero 内容 */}
      <section className="max-w-7xl mx-auto px-8 pt-32 text-center relative z-10">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-b from-amber-50 to-amber-500/20 bg-clip-text text-transparent">
          众包隐私，赋能 AI
        </h1>
        <p className="text-lg text-zinc-500 max-w-2xl mx-auto mb-12 leading-relaxed">
          全球最全的 AI 友好型脱敏规则库。贡献你的正则模式，赚取积分，一键同步到 SafeMask 桌面端。
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <button className="px-8 py-4 bg-amber-500 text-black rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-amber-400 transition-all shadow-[0_0_40px_rgba(245,158,11,0.2)]">
            立即探索规则 <ChevronRight size={16} />
          </button>
          <button className="px-8 py-4 bg-zinc-900 border border-white/5 rounded-2xl font-bold text-xs flex items-center gap-3 hover:bg-zinc-800 transition-all">
            <Github size={16} /> GitHub 开源
          </button>
        </div>
      </section>
    </main>
  );
}