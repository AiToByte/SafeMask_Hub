mod engine;
mod rules;

use wasm_bindgen::prelude::*;
use crate::engine::MaskEngine;
use crate::rules::Rule;

#[wasm_bindgen]
pub struct SafeMaskWasm {
    engine: MaskEngine,
}

#[wasm_bindgen]
impl SafeMaskWasm {
    /// 🚀 构造函数：JS 传入 JSON 格式的规则数组
    #[wasm_bindgen(constructor)]
    pub fn new(rules_json: &str) -> Result<SafeMaskWasm, JsValue> {
        // 1. 设置 panic hook（这样 Rust 报错会在浏览器控制台显示）
        console_error_panic_hook::set_once();

        // 2. 解析规则
        let rules: Vec<Rule> = serde_json::from_str(rules_json)
            .map_err(|e| JsValue::from_str(&format!("JSON 解析失败: {}", e)))?;

        // 3. 初始化引擎
        Ok(SafeMaskWasm {
            engine: MaskEngine::new(rules),
        })
    }

    /// 🚀 脱敏模拟：JS 传入文本，返回脱敏后的结果
    pub fn mask(&self, input: &str) -> String {
        let result = self.engine.mask_line(input.as_bytes());
        String::from_utf8_lossy(&result).to_string()
    }
}