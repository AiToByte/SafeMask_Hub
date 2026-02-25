"use client"
import { useEffect, useState } from 'react';

export default function WasmTester() {
  const [engine, setEngine] = useState<any>(null);
  const [result, setResult] = useState("");

  useEffect(() => {
    async function init() {
      // 🚀 动态导入编译好的 WASM
      const wasm = await import("@/lib/wasm/safemask_wasm");
      await wasm.default(); // 初始化 WASM 内存

      // 准备几条规则测试
      const testRules = JSON.stringify([
        { name: "Email", pattern: "[a-z]+@[a-z]+\\.com", mask: "<EMAIL>", priority: 10, enabled: true }
      ]);

      const instance = new wasm.SafeMaskWasm(testRules);
      setEngine(instance);
    }
    init();
  }, []);

  const handleTest = (text: string) => {
    if (engine) {
      setResult(engine.mask(text));
    }
  };

  return (
    <div>
      <input onChange={(e) => handleTest(e.target.value)} placeholder="输入测试..." />
      <p>脱敏结果: {result}</p>
    </div>
  );
}