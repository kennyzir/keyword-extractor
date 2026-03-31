// ClawHub Local Skill - runs entirely in your agent, no API key required
// Keyword Extractor - Extract keywords and keyphrases using TF-IDF scoring

const STOP_WORDS = new Set([
  'a','an','the','and','or','but','in','on','at','to','for','of','with','by','from',
  'is','are','was','were','be','been','being','have','has','had','do','does','did',
  'will','would','could','should','may','might','shall','can','need','dare',
  'it','its','this','that','these','those','i','me','my','we','our','you','your',
  'he','him','his','she','her','they','them','their','what','which','who','whom',
  'when','where','why','how','not','no','nor','as','if','then','than','too','very',
  'just','about','above','after','again','all','also','am','any','because','before',
  'between','both','each','few','get','got','here','into','more','most','new','now',
  'only','other','out','over','own','same','so','some','still','such','take','there',
  'through','under','up','use','used','using','well','while',
]);

interface Keyword { term: string; score: number; count: number; type: 'word' | 'phrase'; }

function extractKeywords(text: string, max: number = 20): Keyword[] {
  const lower = text.toLowerCase();
  const words = lower.match(/\b[a-z][a-z'-]*[a-z]\b|\b[a-z]\b/g) || [];
  const totalWords = words.length || 1;
  const freq: Record<string, number> = {};
  for (const w of words) { if (STOP_WORDS.has(w) || w.length < 3) continue; freq[w] = (freq[w] || 0) + 1; }
  const tfScores: Keyword[] = Object.entries(freq)
    .map(([term, count]) => ({ term, score: Math.round((count / totalWords) * 10000) / 100, count, type: 'word' as const }))
    .sort((a, b) => b.score - a.score);
  const bigrams: Record<string, number> = {};
  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i], w2 = words[i + 1];
    if (STOP_WORDS.has(w1) || STOP_WORDS.has(w2) || w1.length < 3 || w2.length < 3) continue;
    const phrase = `${w1} ${w2}`; bigrams[phrase] = (bigrams[phrase] || 0) + 1;
  }
  const phraseScores: Keyword[] = Object.entries(bigrams)
    .filter(([, c]) => c >= 2)
    .map(([term, count]) => ({ term, score: Math.round((count / totalWords) * 10000 * 1.5) / 100, count, type: 'phrase' as const }))
    .sort((a, b) => b.score - a.score);
  return [...phraseScores, ...tfScores].sort((a, b) => b.score - a.score).slice(0, max);
}

export async function run(input: { text: string; max_keywords?: number }) {
  if (!input.text || typeof input.text !== 'string' || input.text.length < 20) throw new Error('text required (min 20 chars)');
  if (input.text.length > 100000) throw new Error('Text too long (max 100,000 chars)');
  const startTime = Date.now();
  const max = Math.min(input.max_keywords || 20, 50);
  const keywords = extractKeywords(input.text, max);
  return {
    keywords, total_keywords: keywords.length,
    top_words: keywords.filter(k => k.type === 'word').slice(0, 10).map(k => k.term),
    top_phrases: keywords.filter(k => k.type === 'phrase').slice(0, 5).map(k => k.term),
    _meta: { skill: 'keyword-extractor', latency_ms: Date.now() - startTime, text_length: input.text.length, word_count: input.text.split(/\s+/).length },
  };
}
export default run;
