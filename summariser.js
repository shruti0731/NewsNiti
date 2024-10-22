const { NlpManager } = require('node-nlp');
const natural = require('natural');
const TfIdf = natural.TfIdf;

const manager = new NlpManager({ languages: ['en'] });

async function summarizeText(text) {
  try {
    const lexicalChains = createLexicalChains(text);
    //const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    //sentences.length
    const tfidfSummary = await performTfIdfSummarization(text, 3);
    const combinedSummary = combineSummaries(tfidfSummary, lexicalChains);

    // Perform evaluation
    const evaluationResults = evaluateSummary(text, combinedSummary);
    console.log("Evaluation Results:", evaluationResults);

    return combinedSummary;
  } catch (error) {
    throw new Error(Error during summarization: ${error.message});
  }
}

function createLexicalChains(text) {
  const tokenizer = new natural.WordTokenizer();
  const words = tokenizer.tokenize(text.toLowerCase());
  const wordFrequency = {};

  words.forEach(word => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  });

  const chains = Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(entry => entry[0]);

  return chains;
}

async function performTfIdfSummarization(text, numSentences) {
  const tfidf = new TfIdf();
  tfidf.addDocument(text);

  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const sentenceScores = sentences.map(sentence => {
    let score = 0;
    tfidf.listTerms(0).forEach(item => {
      if (sentence.toLowerCase().includes(item.term)) {
        score += item.tfidf;
      }
    });
    return { sentence, score };
  });

  const sortedSentences = sentenceScores
    .sort((a, b) => b.score - a.score)
    .slice(0, numSentences)
    .map(item => item.sentence.trim());

  return sortedSentences.join(" ");
}

function combineSummaries(tfidfSummary, lexicalChains) {
  return ${tfidfSummary};
}

// Function to calculate cosine similarity between original text and summary
function calculateCosineSimilarity(text1, text2) {
  const tfidf = new TfIdf();
  tfidf.addDocument(text1);
  tfidf.addDocument(text2);

  const vector1 = tfidf.listTerms(0).map(item => item.tfidf);
  const vector2 = tfidf.listTerms(1).map(item => item.tfidf);

  const dotProduct = vector1.reduce((sum, value, index) => sum + value * (vector2[index] || 0), 0);
  const magnitude1 = Math.sqrt(vector1.reduce((sum, value) => sum + value * value, 0));
  const magnitude2 = Math.sqrt(vector2.reduce((sum, value) => sum + value * value, 0));

  return dotProduct / (magnitude1 * magnitude2);
}

// Function to evaluate the generated summary
function evaluateSummary(originalText, summary) {
  const cosineSimilarity = calculateCosineSimilarity(originalText, summary);
  const compressionRatio = summary.length / originalText.length;
  const keyTermsCoverage = calculateKeyTermsCoverage(originalText, summary);

  return {
    cosineSimilarity: cosineSimilarity.toFixed(2),
    compressionRatio: compressionRatio.toFixed(2),
    keyTermsCoverage: keyTermsCoverage.toFixed(2)
  };
}

// Function to calculate the coverage of key terms in the summary
function calculateKeyTermsCoverage(originalText, summary) {
  const tfidf = new TfIdf();
  tfidf.addDocument(originalText);

  // Extract the top 10 terms from the original text
  const topTerms = tfidf.listTerms(0).slice(0, 10).map(item => item.term);

  // Count how many of these terms are present in the summary
  const summaryWords = new Set(summary.toLowerCase().split(/\s+/));
  const coveredTerms = topTerms.filter(term => summaryWords.has(term)).length;

  return coveredTerms / topTerms.length; // Fraction of terms covered
}

module.exports = { summarizeText };