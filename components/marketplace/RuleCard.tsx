"use client"

import { Download, User, Hash, ShieldCheck } from "lucide-react";

interface RuleCardProps {
  rule: CommunityRule;
}

import { CommunityRule } from "@/types/rule";

export default function RuleCard({ rule }: RuleCardProps) {
  // 构建一键导入的 Deep Link
  const importUrl = `safemask://import?name=${encodeURIComponent(rule.name)}&pattern=${encodeURIComponent(rule.pattern)}&mask=${encodeURIComponent(rule.mask)}&priority=${rule.priority}`;

  return (
    <div className="group relative p-6 rounded-2xl bg-zinc-900/30 border border-white/[0.05] hover:border-amber-500/30 transition-all duration-500 overflow-hidden">
      {/* 顶部信息 */}
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-amber-50/90 group-hover:text-amber-400 transition-colors">
            {rule.name}
          </h3>
          <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
            <User size={10} /> {rule.author}
          </div>
        </div>
        <div className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-[9px] font-black text-amber-500 uppercase">
          {rule.category}
        </div>
      </div>

      {/* 规则描述 */}
      <p className="text-xs text-zinc-500 line-clamp-2 mb-6 h-8 italic leading-relaxed">
        "{rule.description}"
      </p>

      {/* 正则预览区 - 模拟精密仪表盘 */}
      <div className="relative mb-6 p-3 rounded-xl bg-black/40 border border-white/[0.03] shadow-inner overflow-hidden">
        <code className="text-[11px] font-mono text-zinc-400 truncate block">
          {rule.pattern}
        </code>
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/80 to-transparent flex items-center justify-end pr-2">
          <Hash size={12} className="text-zinc-700" />
        </div>
      </div>

      {/* 底部操作区 */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[8px] text-zinc-600 font-black uppercase tracking-tighter">Mask Label</span>
          <span className="text-xs font-mono font-bold text-blue-400/80">{rule.mask}</span>
        </div>

        <a 
          href={importUrl}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-black rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-900/20"
        >
          <Download size={14} strokeWidth={3} /> 一键导入
        </a>
      </div>

      {/* 背景装饰效果 */}
      <div className="absolute -right-2 -bottom-2 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
        <ShieldCheck size={80} />
      </div>
    </div>
  );
}