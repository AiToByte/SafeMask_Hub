"use client"

import { useState, useEffect } from 'react';
import { Beaker, ShieldCheck, Cpu, RefreshCcw } from "lucide-react";
import { useWasmEngine } from "@/hooks/useWasmEngine";

interface LiveSandboxProps {
  initialPattern: string;
  initialMask: string;
}

export default function LiveSandbox({ initialPattern, initialMask }: LiveSandboxProps) {
  const [input, setInput] = useState("测试数据：我的手机号是 13888888888，邮箱 xiaosheng.tech@outlook.com");
  const [output, setOutput] = useState("");
  const { isReady, initEngine, maskText } = useWasmEngine();

  // 🚀 组件挂载时，加载并编译 Rust 内核
  useEffect(() => {
    const rules = JSON.stringify([
      { name: "Preview", pattern: initialPattern, mask: initialMask, priority: 10, enabled: true },
      // 预置几个默认规则让实验室看起来更真实, 这里容易引起歧义, 先注释
      // { name: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", mask: "<EMAIL>", priority: 5, enabled: true }
    ]);
    
    initEngine(rules);
  }, [initialPattern, initialMask, initEngine]);

  // 🚀 实时监听输入变化
  useEffect(() => {
    if (isReady) {
      setOutput(maskText(input));
    }
  }, [input, isReady, maskText]);

  return (
    <div className="w-full bg-[#0d0d0f]/80 border border-white/[0.05] rounded-[2.5rem] overflow-hidden shadow-2xl">
      {/* 顶部状态栏 */}
      <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-lg">
            <Beaker size={18} className="text-amber-500" />
          </div>
          <div>
            <h3 className="font-bold text-amber-50/90 text-sm">脱敏仿真实验室</h3>
            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest leading-none mt-1">Rust Core v2024 (WebAssembly)</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${isReady ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-700'}`}></div>
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-tighter">
            {isReady ? 'Kernel Online' : 'Loading Rust...'}
          </span>
        </div>
      </div>

      {/* 实验操作区 */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[280px]">
        {/* 输入端 */}
        <div className="p-6 border-r border-white/[0.03] flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Source Payload</label>
            <RefreshCcw size={12} className="text-zinc-800 cursor-pointer hover:text-zinc-500 transition-colors" onClick={() => setInput("")} />
          </div>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[13px] font-mono text-zinc-400 resize-none leading-relaxed placeholder:text-zinc-800"
            placeholder="在此粘贴任意文本进行安全性测试..."
          />
        </div>

        {/* 输出端 */}
        <div className="p-6 bg-black/20 flex flex-col gap-4 relative">
          <label className="text-[9px] font-black text-blue-500/80 uppercase tracking-[0.2em]">Safety Stream</label>
          <div className="flex-1 text-[13px] font-mono text-amber-200/90 whitespace-pre-wrap leading-relaxed">
            {!isReady ? (
              <div className="flex items-center gap-2 text-zinc-700">
                <Cpu size={14} className="animate-spin" /> 初始化内核中...
              </div>
            ) : (
              output
            )}
          </div>

          {/* 底部校验标识 */}
          <div className="absolute bottom-6 right-8 flex items-center gap-2 text-emerald-500/30">
             <ShieldCheck size={14} />
             <span className="text-[10px] font-black uppercase tracking-tighter">Verified by SafeMask Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
}