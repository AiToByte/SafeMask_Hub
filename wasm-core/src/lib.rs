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
    #[wasm_bindgen(constructor)]
    pub fn new(rules_json: &str) -> Result<SafeMaskWasm, JsValue> {
        // 设置 panic hook
        console_error_panic_hook::set_once();

        let rules: Vec<Rule> = serde_json::from_str(rules_json)
            .map_err(|e| JsValue::from_str(&format!("JSON 解析失败: {}", e)))?;

        Ok(SafeMaskWasm {
            engine: MaskEngine::new(rules),
        })
    }

    pub fn mask(&self, input: &str) -> String {
        let result = self.engine.mask_line(input.as_bytes());
        String::from_utf8_lossy(&result).to_string()
    }
}