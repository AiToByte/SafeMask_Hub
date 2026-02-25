use crate::rules::Rule;
use aho_corasick::{AhoCorasick, MatchKind};
use regex::bytes::Regex;
use std::borrow::Cow;
use smallvec::SmallVec;

const LITERAL_PRIORITY: i32 = 999_000_000;

struct CompiledRegex {
    re: Regex,
    mask: Vec<u8>,
    priority: i32,
}

struct MatchSpan<'m> {
    start: usize,
    end: usize,
    priority: i32,
    mask: &'m [u8],
}

pub struct MaskEngine {
    ac_engine: Option<AhoCorasick>,
    ac_masks: Vec<Vec<u8>>,
    regex_rules: Vec<CompiledRegex>,
}

impl MaskEngine {
    pub fn new(mut rules: Vec<Rule>) -> Self {
        rules.retain(|r| r.enabled);
        rules.sort_by(|a, b| b.priority.cmp(&a.priority));

        let mut ac_patterns = Vec::new();
        let mut ac_masks = Vec::new();
        let mut regex_rules = Vec::new();

        for rule in rules {
            if is_literal(&rule.pattern) {
                ac_patterns.push(rule.pattern);
                ac_masks.push(rule.mask.as_bytes().to_vec());
            } else {
                if let Ok(re) = Regex::new(&rule.pattern) {
                    regex_rules.push(CompiledRegex {
                        re,
                        mask: rule.mask.as_bytes().to_vec(),
                        priority: rule.priority,
                    });
                }
            }
        }

        let ac_engine = if ac_patterns.is_empty() {
            None
        } else {
            AhoCorasick::builder()
                .match_kind(MatchKind::LeftmostLongest)
                .build(ac_patterns)
                .ok()
        };

        Self {
            ac_engine,
            ac_masks,
            regex_rules,
        }
    }

    pub fn mask_line<'a>(&self, input: &'a [u8]) -> Cow<'a, [u8]> {
        if input.is_empty() {
            return Cow::Borrowed(input);
        }

        let mut matches: SmallVec<[MatchSpan; 16]> = SmallVec::new();

        if let Some(ref ac) = self.ac_engine {
            for mat in ac.find_iter(input) {
                matches.push(MatchSpan {
                    start: mat.start(),
                    end: mat.end(),
                    priority: LITERAL_PRIORITY,
                    mask: &self.ac_masks[mat.pattern()],
                });
            }
        }

        for rule in &self.regex_rules {
            for mat in rule.re.find_iter(input) {
                matches.push(MatchSpan {
                    start: mat.start(),
                    end: mat.end(),
                    priority: rule.priority,
                    mask: &rule.mask,
                });
            }
        }

        if matches.is_empty() {
            return Cow::Borrowed(input);
        }

        self.apply_replacements(input, matches)
    }

    fn apply_replacements<'a, 'm, I>(&self, input: &'a [u8], matches: I) -> Cow<'a, [u8]>
    where
        I: IntoIterator<Item = MatchSpan<'m>>,
    {
        let mut matches: Vec<MatchSpan<'m>> = matches.into_iter().collect();
        matches.sort_unstable_by(|a, b| {
            a.start.cmp(&b.start)
                .then(b.priority.cmp(&a.priority))
                .then((b.end - b.start).cmp(&(a.end - a.start)))
        });

        let mut output = Vec::with_capacity(input.len());
        let mut last_pos = 0;

        for m in matches {
            if m.start < last_pos {
                continue;
            }
            output.extend_from_slice(&input[last_pos..m.start]);
            output.extend_from_slice(m.mask);
            last_pos = m.end;
        }

        if last_pos < input.len() {
            output.extend_from_slice(&input[last_pos..]);
        }

        Cow::Owned(output)
    }
}

fn is_literal(pattern: &str) -> bool {
    let meta = ['.', '+', '*', '?', '(', ')', '|', '[', ']', '{', '}', '^', '$', '\\'];
    !pattern.chars().any(|c| meta.contains(&c))
}