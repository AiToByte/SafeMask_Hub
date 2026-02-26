"use client"

import React from 'react';
import { Download, User, Hash, ShieldCheck, Zap, ArrowUpRight } from "lucide-react";
import { CommunityRule } from "@/types/rule";

interface RuleCardProps {
  rule: CommunityRule;
}

export default function RuleCard({ rule }: RuleCardProps) {
  // 🚀 构建一键导入的 Deep Link 协议地址
  const importUrl = `safemask://import?name=${encodeURIComponent(rule.name)}&pattern=${encodeURIComponent(rule.pattern)}&mask=${encodeURIComponent(rule.mask)}&priority=${rule.priority}`;

  return (
    <div className="group relative p-7 rounded-[2rem] bg-[#0d0d0f] border border-white/[0.06] hover:border-amber-500/30 transition-all duration-700 overflow-hidden shadow-2xl flex flex-col justify-between h-full">
      
      {/* 🚀 背景微光：悬浮时产生漫反射感 */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      {/* 顶部：标题与分类 */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-5">
          <div className="space-y-1.5 flex-1 pr-4">
            <div className="flex items-center gap-2">
              <h3 className="text-[17px] font-bold text-amber-50 group-hover:text-amber-400 transition-colors tracking-tight">
                {rule.name}
              </h3>
              <ArrowUpRight size={14} className="text-zinc-800 group-hover:text-amber-500/50 transition-all" />
            </div>
            <div className="flex items-center gap-2 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">
              <User size={10} strokeWidth={3} /> By {rule.author}
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-[8px] font-black text-zinc-500 uppercase tracking-widest group-hover:border-amber-500/40 group-hover:text-amber-500 transition-all shadow-sm">
            {rule.category}
          </div>
        </div>

        {/* 规则描述：提升对比度与行高 */}
        <p className="text-[13px] text-zinc-400 line-clamp-2 mb-8 leading-relaxed font-medium italic">
          "{rule.description}"
        </p>

        {/* 正则预览：模拟精密仪表盘显示屏 */}
        <div className="relative mb-8 p-4 rounded-2xl bg-black/60 border border-white/[0.05] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] group-hover:border-white/10 transition-all overflow-hidden">
          <code className="text-[12px] font-mono text-zinc-500 break-all leading-normal block select-all">
            {rule.pattern}
          </code>
          {/* 右侧装饰图标 */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-40 transition-opacity">
            <Hash size={14} className="text-amber-500" />
          </div>
        </div>
      </div>

      {/* 底部操作区 */}
      <div className="relative z-10 flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-[8px] text-zinc-700 font-black uppercase tracking-[0.2em] mb-1">Target Label</span>
          <span className="text-[13px] font-mono font-bold text-blue-400/90 drop-shadow-[0_0_8px_rgba(96,165,250,0.2)]">
            {rule.mask}
          </span>
        </div>

        <a 
          href={importUrl}
          className="flex items-center gap-2.5 px-5 py-2.5 bg-amber-500 text-black rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-amber-400 active:scale-95 transition-all shadow-xl shadow-amber-900/20"
        >
          <Zap size={14} fill="currentColor" /> 一键导入
        </a>
      </div>

      {/* 🚀 装饰细节：四个角落的极简 L 型刻度 */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/[0.04] group-hover:border-amber-500/20 transition-colors" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/[0.04] group-hover:border-amber-500/20 transition-colors" />
      
      {/* 隐约的大图标背景，增加专业感 */}
      <div className="absolute -right-4 -bottom-4 text-white/[0.01] pointer-events-none group-hover:text-amber-500/[0.03] transition-colors duration-1000">
        <ShieldCheck size={120} strokeWidth={1} />
      </div>
    </div>
  );
}