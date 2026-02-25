use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Rule {
    pub name: String,
    pub pattern: String,
    pub mask: String,
    #[serde(default)]
    pub priority: i32,
    #[serde(default = "default_true")]
    pub enabled: bool,
    #[serde(default)]
    pub is_custom: bool,
}

fn default_true() -> bool {
    true
}

#[allow(dead_code)]
#[derive(Debug, Serialize, Deserialize)]
pub struct RuleGroup {
    pub group: String,
    pub rules: Vec<Rule>,
}