import { useState, useEffect, useCallback } from 'react';

export function useWasmEngine() {
  const [engine, setEngine] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  // 🚀 初始化加载 WASM
  const initEngine = useCallback(async (rulesJson: string) => {
    try {
      // 1. 动态导入 WASM 胶水层
      const wasm = await import("@/lib/wasm/safemask_wasm");
      
      // 2. 初始化 WASM 模块 (加载 .wasm 二进制文件)
      await wasm.default(); 

      // 3. 创建 Rust 引擎实例
      const instance = new wasm.SafeMaskWasm(rulesJson);
      setEngine(instance);
      setIsReady(true);
      return instance;
    } catch (error) {
      console.error("WASM 引擎初始化失败:", error);
      return null;
    }
  }, []);

  // 🚀 执行脱敏逻辑
  const maskText = useCallback((text: string) => {
    if (!engine) return text;
    return engine.mask(text);
  }, [engine]);

  return { isReady, initEngine, maskText };
}