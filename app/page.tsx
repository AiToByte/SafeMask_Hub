"use client"

import { useState } from "react";
import { 
  Shield, Zap, LayoutGrid, Filter, Beaker, Github, 
  ArrowRight, Sparkles, Command
} from "lucide-react";
import dynamic from 'next/dynamic';
import RuleCard from "@/components/marketplace/RuleCard";
import LiveSandbox from "@/components/marketplace/LiveSandbox";
import { CommunityRule } from "@/types/rule";

const MOCK_RULES: CommunityRule[] = [
  {
    id: "rule-01",
    name: "OpenAI Project Key",
    author: "XiaoSheng",
    category: "AI_API",
    pattern: "\\bsk-proj-[a-zA-Z0-9]{32,}\\b",
    mask: "<OPENAI_KEY>",
    priority: 100,
    downloads: 4200,
    description: "适配 OpenAI 最新的项目级密钥识别逻辑，提供物理宇宙级安全隔离。"
  },
  {
    id: "rule-02",
    name: "中国大陆手机号",
    author: "PrivacyGuard",
    category: "PII",
    pattern: "\\b1[3-9]\\d{9}\\b",
    mask: "<PHONE_NUMBER>",
    priority: 80,
    downloads: 12500,
    description: "高精度手机号识别，自动过滤时间戳干扰，确保业务隐私不被 AI 获取。"
  },
  {
    id: "rule-03",
    name: "PostgreSQL URI",
    author: "DBA_Master",
    category: "DATABASE",
    pattern: "postgres(?:ql)?://[^\\s'\"<>]+",
    mask: "<POSTGRES_URI>",
    priority: 90,
    downloads: 2800,
    description: "精准阻断数据库连接串泄露，在 AI 协作排障时保护核心 Host 信息。"
  },
  {
    id: "rule-04",
    name: "IPv4 Address",
    author: "NetSec_Hero",
    category: "NETWORK",
    pattern: "\\b(?:(?:25[0-5]|2[0-4]\\d|1?\\d{1,2})\\.){3}(?:25[0-5]|2[0-4]\\d|1?\\d{1,2})\\b",
    mask: "<IPv4>",
    priority: 50,
    downloads: 8900,
    description: "标准 IPv4 地址识别。保护内部服务器拓扑不被 AI 模型捕获分析。"
  },
  {
    id: "rule-05",
    name: "AWS Access Key",
    author: "CloudArch",
    category: "CLOUD_AUTH",
    pattern: "\\bAKIA[0-9A-Z]{16}\\b",
    mask: "<AWS_ACCESS_ID>",
    priority: 95,
    downloads: 3100,
    description: "识别 AWS 标准 Access Key ID。云安全审计与自动化部署的最佳实践。"
  },
  {
    id: "rule-06",
    name: "Email Address",
    author: "System_Bot",
    category: "PII",
    pattern: "\\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}\\b",
    mask: "<EMAIL_ADDR>",
    priority: 30,
    downloads: 15600,
    description: "通用电子邮箱识别规则。有效防止日志中散落的用户敏感联系方式泄露。"
  }
];

const BackgroundEngine = dynamic(
  () => import('@/components/animations/BackgroundEngine'),
  { ssr: false } // 🚀 关键：关闭服务端渲染
);

export default function Home() {
  const [activeRule, setActiveRule] = useState({
    pattern: MOCK_RULES[0].pattern,
    mask: MOCK_RULES[0].mask,
    name: MOCK_RULES[0].name
  });

  const handleSelectRule = (rule: CommunityRule) => {
    setActiveRule({
      pattern: rule.pattern,
      mask: rule.mask,
      name: rule.name
    });
    document.getElementById('sandbox')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#080707] text-amber-50/90 selection:bg-amber-500/30 font-sans overflow-x-hidden relative">
      
      {/* 🚀 背景引擎：提升层级亮度 */}
      <BackgroundEngine />

      <div className="relative z-10 w-full min-h-screen">
        
        {/* 1. 导航栏 */}
        <nav className="max-w-7xl mx-auto px-10 h-24 flex items-center justify-between relative z-50 border-b border-white/[0.05] bg-black/40 backdrop-blur-lg">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#141210] border border-amber-500/20 flex items-center justify-center shadow-2xl">
              <Shield size={22} className="text-amber-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-black tracking-tighter text-2xl leading-none text-white drop-shadow-md">SafeMask Hub</span>
              <span className="text-[9px] font-black text-amber-500/40 uppercase tracking-[0.4em] mt-1.5">Rule Ecosystem</span>
            </div>
          </div>
          
          <div className="flex items-center gap-10">
            <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              <a href="#" className="hover:text-amber-200 transition-colors">Marketplace</a>
              <a href="#" className="hover:text-amber-200 transition-colors">Rewards</a>
              <a href="https://github.com/AiToByte/SafeMask" target="_blank" className="hover:text-amber-200 transition-colors">Docs</a>
            </div>
            <button className="px-7 py-3 bg-amber-500 text-black rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-amber-400 active:scale-95 transition-all shadow-xl">
              Sign In
            </button>
          </div>
        </nav>

        {/* 2. Hero Section */}
        <section className="max-w-7xl mx-auto px-10 pt-32 pb-24 relative">
          <div className="max-w-4xl relative z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8">
              <Sparkles size={12} className="text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-200/80">Version 1.2.3 "Dual Universe" is Live</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.05] text-white">
              <span className="bg-gradient-to-r from-amber-50 via-amber-100 to-amber-400 bg-clip-text text-transparent">
                赋予 AI 安全的
              </span>
              <br />
              <span className="drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">“视觉”界限</span>
            </h1>
            
            <p className="text-xl text-zinc-300 max-w-2xl mb-12 leading-relaxed font-medium drop-shadow-md">
              SafeMask Hub 是全球首个专注于 <span className="text-amber-400 italic font-bold">AI 语义友好</span> 的脱敏规则市场。
              在物理宇宙保留真实，在数字宇宙交换安全。
            </p>
            
            <div className="flex flex-wrap items-center gap-6">
              <button className="px-10 py-5 bg-amber-500 text-black rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-4 hover:bg-amber-400 transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                开始贡献规则 <Zap size={16} fill="currentColor" />
              </button>
              <div className="flex items-center gap-8 pl-6 border-l border-white/10">
                <div className="flex flex-col">
                  <span className="text-3xl font-mono font-bold leading-none text-amber-50">2.4k+</span>
                  <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mt-2">Verified Rules</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-mono font-bold leading-none text-amber-50">150k+</span>
                  <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mt-2">Privacy Audits</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 仿真实验室 (Sandbox) */}
        <section id="sandbox" className="max-w-7xl mx-auto px-10 pb-32 relative z-20">
          <div className="relative group">
            <div className="absolute -inset-[2px] bg-gradient-to-r from-amber-500/20 via-blue-500/20 to-amber-500/20 rounded-[2.6rem] blur-2xl opacity-10 group-hover:opacity-30 transition-opacity duration-1000"></div>
            <div className="relative bg-[#0d0d0f]/95 backdrop-blur-xl border border-white/[0.08] rounded-[2.5rem] p-1 shadow-3xl overflow-hidden">
              <LiveSandbox 
                initialPattern={activeRule.pattern} 
                initialMask={activeRule.mask}
              />
            </div>
          </div>
        </section>

        {/* 4. 规则广场 */}
        <section className="max-w-7xl mx-auto px-10 pb-40 relative z-20">
          <div className="flex items-end justify-between mb-16 border-b border-white/[0.03] pb-10">
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/10 shadow-inner">
                  <LayoutGrid size={22} className="text-amber-500" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white">精选规则广场</h2>
              </div>
              <p className="text-xs text-zinc-400 font-medium tracking-wide">
                由全球极客共同维护的 <span className="text-amber-400 font-bold">高精度</span> 敏感数据识别模式，即点即测
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden lg:block">
                <Command size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
                <input type="text" placeholder="快速搜索模式..." className="bg-white/[0.03] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-[11px] outline-none focus:border-amber-500/40 w-64 transition-all text-white font-medium" />
              </div>
              <button className="flex items-center gap-3 px-5 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-[10px] font-black uppercase text-zinc-400 hover:border-amber-500/30 hover:text-amber-200 transition-all">
                <Filter size={14} /> 筛选
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_RULES.map((rule) => (
              <div key={rule.id} onClick={() => handleSelectRule(rule)} className="cursor-pointer active:scale-95 transition-transform">
                <RuleCard rule={rule} />
              </div>
            ))}
          </div>

          <div className="mt-24 flex flex-col items-center gap-8">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
            <button className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-zinc-500 hover:text-amber-400 transition-all">
              Browse All Discoveries <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </section>

        {/* 5. 页脚 */}
        <footer className="max-w-7xl mx-auto px-10 py-24 border-t border-white/[0.05] relative z-20 bg-black/40 backdrop-blur-xl">
          {/* ... (此处保持之前的 footer 内容不变) ... */}
        </footer>
      </div>
    </main>
  );
}