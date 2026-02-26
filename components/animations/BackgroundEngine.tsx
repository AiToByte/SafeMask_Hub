"use client"

import { motion, AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

const SENSITIVE_DATA = ["IP:172.21.0.8", "sk-proj-9A2v...", "token:eyJhb...", "pwd:root123", "4403011995...", "secret_key"];
const MASKED_DATA = ["<IPv4>", "<API_KEY>", "<JWT_TOKEN>", "<PWD_HASH>", "<ID_CARD>", "<HIDDEN>"];

export default function BackgroundEngine() {
  const [particles, setParticles] = useState<any[]>([]);
  // 🚀 新增：专门存储随机生成的盾牌节点
  const [nodes, setNodes] = useState<any[]>([]);

  useEffect(() => {
    // 1. 仅在客户端挂载后生成随机节点位置
    const generatedNodes = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 90 + 5}%`,
      left: `${Math.random() * 90 + 5}%`,
      delay: Math.random() * 5
    }));
    setNodes(generatedNodes);

    // 2. 粒子生成逻辑
    const generateParticle = () => {
      const id = Math.random();
      const side = Math.floor(Math.random() * 4);
      let startPos = { x: 0, y: 0 };
      if (side === 0) startPos = { x: Math.random() * 100, y: -10 };
      if (side === 1) startPos = { x: 110, y: Math.random() * 100 };
      if (side === 2) startPos = { x: Math.random() * 100, y: 110 };
      if (side === 3) startPos = { x: -10, y: Math.random() * 100 };

      return {
        id,
        startX: startPos.x,
        startY: startPos.y,
        endX: 100 - startPos.x + (Math.random() * 20 - 10),
        endY: 100 - startPos.y + (Math.random() * 20 - 10),
        speed: 8 + Math.random() * 12,
        size: Math.random() * 0.4 + 0.7,
        depth: Math.floor(Math.random() * 3)
      };
    };

    setParticles(Array.from({ length: 15 }).map(generateParticle));
    const interval = setInterval(() => {
      setParticles(prev => [...prev.slice(-25), generateParticle()]);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#080707] antialiased">
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ backgroundImage: `linear-gradient(#f59e0b 0.5px, transparent 0.5px), linear-gradient(90deg, #f59e0b 0.5px, transparent 0.5px)`, backgroundSize: '50px 50px' }}>
      </div>

      {/* 🚀 渲染 nodes 而不是 PROTECTION_NODES */}
      {nodes.map((node) => (
        <div key={node.id} className="absolute" style={{ top: node.top, left: node.left }}>
          <motion.div 
            animate={{ opacity: [0.1, 0.3, 0.1], rotate: [0, 360] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: node.delay }}
            className="relative flex items-center justify-center w-24 h-24"
          >
            <Shield size={32} className="text-amber-500/10" />
            <div className="absolute inset-0 rounded-full border border-amber-500/5 shadow-[inset_0_0_15px_rgba(245,158,11,0.05)]"></div>
          </motion.div>
        </div>
      ))}

      <AnimatePresence>
        {particles.map((p) => (
          <DataStream key={p.id} config={p} />
        ))}
      </AnimatePresence>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#080707_90%)]"></div>
    </div>
  );
}

// DataStream 函数保持不变...
function DataStream({ config }: { config: any }) {
  const [isMasked, setIsMasked] = useState(false);
  const dataIdx = useMemo(() => Math.floor(Math.random() * SENSITIVE_DATA.length), []);
  
  const getSharpStyle = (masked: boolean) => ({
    color: masked ? "#34d399" : "#fbbf24",
    filter: masked 
      ? "drop-shadow(0 0 5px rgba(52,211,153,0.6))" 
      : "drop-shadow(0 0 5px rgba(251,191,36,0.4))",
    opacity: config.depth === 0 ? 0.2 : config.depth === 1 ? 0.5 : 0.8,
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsMasked(true), (config.speed * 1000) / 2.5);
    return () => clearTimeout(timer);
  }, [config.speed]);

  return (
    <motion.div
      initial={{ left: `${config.startX}%`, top: `${config.startY}%`, opacity: 0, scale: config.size }}
      animate={{ left: `${config.endX}%`, top: `${config.endY}%`, opacity: [0, 1, 1, 0] }}
      transition={{ duration: config.speed, ease: "linear" }}
      className="absolute whitespace-nowrap"
      style={{ zIndex: config.depth }}
    >
      <motion.div
        animate={getSharpStyle(isMasked)}
        className="text-[11px] font-mono font-black tracking-widest italic"
        style={{ textRendering: 'optimizeLegibility' }}
      >
        {isMasked ? MASKED_DATA[dataIdx] : SENSITIVE_DATA[dataIdx]}
        {isMasked && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            className="absolute inset-0 border border-emerald-500/30 rounded-full"
          />
        )}
      </motion.div>
    </motion.div>
  );
}