"use client"

import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

// 敏感数据样本
const SENSITIVE_DATA = ["sk-proj-...", "192.168.1.1", "138-0013-...", "password:****", "admin_token"];
// 脱敏后的样本
const MASKED_DATA = ["<API_KEY>", "<IPv4>", "<PHONE>", "<SECRET>", "<TOKEN>"];

export default function HeroAnimation() {
  const [items, setItems] = useState<{ id: number; text: string; type: 'raw' | 'safe' }[]>([]);

  useEffect(() => {
    // 模拟数据流，每秒产生一个新颗粒
    const interval = setInterval(() => {
      const id = Date.now();
      const randomIndex = Math.floor(Math.random() * SENSITIVE_DATA.length);
      
      const newItem = {
        id,
        text: SENSITIVE_DATA[randomIndex],
        type: 'raw' as const
      };

      setItems((prev) => [...prev.slice(-10), newItem]);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
      {/* 🚀 中心处理器：全息盾牌 */}
      <div className="relative z-20">
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
            boxShadow: ["0 0 20px rgba(245,158,11,0.1)", "0 0 40px rgba(245,158,11,0.2)", "0 0 20px rgba(245,158,11,0.1)"]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-20 h-20 rounded-[1.5rem] bg-[#141210] border border-amber-500/30 flex items-center justify-center shadow-2xl"
        >
          <Shield size={32} className="text-amber-500" />
          
          {/* 处理器内部的动态环 */}
          <div className="absolute inset-0 rounded-[1.5rem] border border-amber-500/10 animate-ping"></div>
        </motion.div>
        
        {/* 底部光晕 */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-amber-500/20 blur-xl"></div>
      </div>

      {/* 🚀 数据流颗粒层 */}
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ x: -400, opacity: 0, scale: 0.8 }}
            animate={{ 
              x: [-400, 0, 400], // 从左到处理器，再到右
              opacity: [0, 1, 1, 0],
              scale: [0.8, 1, 0.9],
            }}
            transition={{ 
              duration: 4, 
              times: [0, 0.5, 1],
              ease: "linear"
            }}
            className="absolute flex items-center"
          >
            <DataParticle text={item.text} id={item.id} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function DataParticle({ text, id }: { text: string; id: number }) {
  const [isMasked, setIsMasked] = useState(false);

  useEffect(() => {
    // 在动画进行到一半（飞到盾牌位置）时触发转换
    const timer = setTimeout(() => setIsMasked(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative group">
      <motion.div
        animate={isMasked ? { 
          color: "#10b981", // 变绿
          filter: "drop-shadow(0 0 8px rgba(16,185,129,0.3))"
        } : { 
          color: "#f59e0b" // 原始琥珀色
        }}
        className="text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded border border-white/5 bg-black/40 backdrop-blur-sm whitespace-nowrap transition-colors duration-300"
      >
        {isMasked ? MASKED_DATA[id % MASKED_DATA.length] : text}
      </motion.div>
      
      {/* 转换瞬间的爆炸粒子效果 */}
      {isMasked && (
        <motion.div
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          className="absolute inset-0 border border-emerald-500 rounded animate-ping"
        />
      )}
    </div>
  );
}