const { NlpManager } = require('node-nlp');
const natural = require('natural');
const stopword = require('stopword');

const TfIdf = natural.TfIdf;
const manager = new NlpManager({ languages: ['en'] });

async function summarizeText(sanitizedContent) {
  try {
    const lexicalChains = createLexicalChains(sanitizedContent);
    const tfidfSummary = await performTfIdfSummarization(sanitizedContent, 200); 
    const combinedSummary = combineSummaries(tfidfSummary, lexicalChains);

    const evaluationResults = evaluateSummary(sanitizedContent, combinedSummary);
    console.log("Evaluation Results:", evaluationResults);

    if (combinedSummary === sanitizedContent) {
      throw new Error("Generated summary matches the original content.");
    }

    return combinedSummary;
  } catch (error) {
    throw new Error("Error during summarization:", `${error.message}`);
  }
}

function createLexicalChains(sanitizedContent) {
  const tokenizer = new natural.WordTokenizer();
  let words = tokenizer.tokenize(sanitizedContent.toLowerCase());

  words = stopword.removeStopwords(words);

  const wordFrequency = {};
  words.forEach(word => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  });

  const chains = Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(entry => entry[0]);

  return chains.join(', ');
}

function performTfIdfSummarization(sanitizedContent, numSentences) {
  return new Promise((resolve, reject) => {
    const tfidf = new TfIdf();
    tfidf.addDocument(sanitizedContent);

    const sortedSentences = [];
    tfidf.tfidfs(sanitizedContent, function(i, measure) {
      sortedSentences.push({ sentence: sanitizedContent.split('.')[i], score: measure });
    });

    sortedSentences.sort((a, b) => b.score - a.score);
    const topSentences = sortedSentences.slice(0, numSentences).map(s => s.sentence);

    resolve(topSentences.join(". "));
  });
}

function combineSummaries(tfidfSummary, lexicalChains) {
  return `${tfidfSummary}.`;
}

function evaluateSummary(originalsanitizedContent, summary) {
  return {
    originalLength: originalsanitizedContent.length,
    summaryLength: summary.length,
    reductionRatio: ((originalsanitizedContent.length - summary.length) / originalsanitizedContent.length) * 100
  };
}

module.exports = {
  summarizeText,
};