# "Keyword Extractor"

> Extract top keywords and keyphrases from text using TF-IDF scoring. Use when agents need to tag content, optimize SEO, build search indexes, or summarize topics. Returns ranked single words and multi-word phrases with frequency counts.

[![License: MIT-0](https://img.shields.io/badge/License-MIT--0-blue.svg)](LICENSE)
[![Claw0x](https://img.shields.io/badge/Powered%20by-Claw0x-orange)](https://claw0x.com)
[![OpenClaw Compatible](https://img.shields.io/badge/OpenClaw-Compatible-green)](https://openclaw.org)

## What is This?

This is a native skill for **OpenClaw** and other AI agents. Skills are modular capabilities that agents can install and use instantly - no complex API setup, no managing multiple provider keys.

Built for OpenClaw, compatible with Claude, GPT-4, and other agent frameworks.

## Installation

### For OpenClaw Users

Simply tell your agent:

```
Install the ""Keyword Extractor"" skill from Claw0x
```

Or use this connection prompt:

```
Add skill: keyword-extractor
Platform: Claw0x
Get your API key at: https://claw0x.com
```

### For Other Agents (Claude, GPT-4, etc.)

1. Get your free API key at [claw0x.com](https://claw0x.com) (no credit card required)
2. Add to your agent's configuration:
   - Skill name: `keyword-extractor`
   - Endpoint: `https://claw0x.com/v1/call`
   - Auth: Bearer token with your Claw0x API key

### Via CLI

```bash
npx @claw0x/cli add keyword-extractor
```

---


# Keyword Extractor

Extract the most important keywords and keyphrases from any text. Uses TF-IDF scoring with stop word removal and bigram detection. No external API needed.

## How It Works

1. Tokenize text, filter stop words and short tokens
2. Calculate term frequency (TF) for each word
3. Detect significant bigrams (2-word phrases appearing 2+ times)
4. Score phrases with 1.5x bonus over single words
5. Return ranked list with scores and counts

## Use Cases

- SEO optimization (find target keywords)
- Content tagging (auto-label articles)
- Search index building (extract index terms)
- Topic summarization (what is this text about?)
- Competitive analysis (keyword gap detection)

## Prerequisites

1. **Sign up at [claw0x.com](https://claw0x.com)**
2. **Create API key** in Dashboard
3. **Set environment variable**: `export CLAW0X_API_KEY="ck_live_..."`

## Pricing

**FREE.** No charge per call.

- Requires Claw0x API key for authentication
- No usage charges (price_per_call = 0)
- Unlimited calls

## Example

**Input**:
```json
{
  "text": "Machine learning models require large datasets for training. Deep learning neural networks have revolutionized machine learning by enabling automatic feature extraction from raw data.",
  "max_keywords": 10
}
```

**Output**:
```json
{
  "keywords": [
    {"term": "machine learning", "score": 8.5, "count": 2, "type": "phrase"},
    {"term": "learning", "score": 5.2, "count": 3, "type": "word"},
    {"term": "deep", "score": 3.1, "count": 1, "type": "word"}
  ],
  "top_words": ["learning", "deep", "training", "data", "neural"],
  "top_phrases": ["machine learning", "deep learning", "neural networks"]
}
```

## Error Codes

| Code | Meaning |
|------|---------|
| 400 | Text too short (<20 chars) or too long (>100K) |
| 401 | Missing or invalid API key |
| 500 | Extraction failed (not billed) |

## About Claw0x

[Claw0x](https://claw0x.com) is the native skills layer for AI agents.

**GitHub**: [github.com/kennyzir/keyword-extractor](https://github.com/kennyzir/keyword-extractor)


---

## About Claw0x

Claw0x is the native skills layer for AI agents - not just another API marketplace.

**Why Claw0x?**
- **One key, all skills** - Single API key for 50+ production-ready skills
- **Pay only for success** - Failed calls (4xx/5xx) are never charged
- **Built for OpenClaw** - Native integration with the OpenClaw agent framework
- **Zero config** - No upstream API keys to manage, we handle all third-party auth

**For Developers:**
- [Browse all skills](https://claw0x.com/skills)
- [Sell your own skills](https://claw0x.com/docs/sell)
- [API Documentation](https://claw0x.com/docs/api-reference)
- [OpenClaw Integration Guide](https://claw0x.com/docs/openclaw)

## Links

- [Claw0x Platform](https://claw0x.com)
- [OpenClaw Framework](https://openclaw.org)
- [Skill Documentation](https://claw0x.com/skills/keyword-extractor)
