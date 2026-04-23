/**
 * SEO Analyzer - Analyze content like Yoast SEO
 */

import { SEOAnalysis } from './types';

const TITLE_MIN = 30;
const TITLE_MAX = 60;
const DESCRIPTION_MIN = 120;
const DESCRIPTION_MAX = 160;
const KEYWORD_DENSITY_MIN = 0.5;
const KEYWORD_DENSITY_MAX = 2.5;

/**
 * Analyze SEO for a post
 */
export function analyzeSEO(
  title: string,
  description: string,
  content: string,
  keywords: string[]
): SEOAnalysis {
  const titleAnalysis = analyzeTitle(title);
  const descriptionAnalysis = analyzeDescription(description);
  const keywordsAnalysis = analyzeKeywords(content, keywords);
  const headingsAnalysis = analyzeHeadings(content);
  const readabilityAnalysis = analyzeReadability(content);

  const overallScore = Math.round(
    (titleAnalysis.score +
      descriptionAnalysis.score +
      keywordsAnalysis.score +
      headingsAnalysis.score +
      readabilityAnalysis.score) /
      5
  );

  return {
    title: titleAnalysis,
    description: descriptionAnalysis,
    keywords: keywordsAnalysis,
    headings: headingsAnalysis,
    readability: readabilityAnalysis,
    overallScore,
  };
}

/**
 * Analyze title
 */
function analyzeTitle(title: string): SEOAnalysis['title'] {
  const length = title.length;
  const optimal = length >= TITLE_MIN && length <= TITLE_MAX;

  let score = 0;
  if (length === 0) {
    score = 0;
  } else if (optimal) {
    score = 100;
  } else if (length < TITLE_MIN) {
    score = Math.round((length / TITLE_MIN) * 100);
  } else {
    score = Math.round(100 - ((length - TITLE_MAX) / 20) * 10);
  }

  return {
    length,
    optimal,
    score: Math.max(0, Math.min(100, score)),
  };
}

/**
 * Analyze meta description
 */
function analyzeDescription(description: string): SEOAnalysis['description'] {
  const length = description.length;
  const optimal = length >= DESCRIPTION_MIN && length <= DESCRIPTION_MAX;

  let score = 0;
  if (length === 0) {
    score = 0;
  } else if (optimal) {
    score = 100;
  } else if (length < DESCRIPTION_MIN) {
    score = Math.round((length / DESCRIPTION_MIN) * 100);
  } else {
    score = Math.round(100 - ((length - DESCRIPTION_MAX) / 50) * 10);
  }

  return {
    length,
    optimal,
    score: Math.max(0, Math.min(100, score)),
  };
}

/**
 * Analyze keywords
 */
function analyzeKeywords(
  content: string,
  keywords: string[]
): SEOAnalysis['keywords'] {
  if (keywords.length === 0) {
    return {
      count: 0,
      density: 0,
      score: 0,
    };
  }

  const contentWords = content.toLowerCase().split(/\s+/);
  const totalWords = contentWords.length;

  let keywordCount = 0;
  keywords.forEach((keyword) => {
    const keywordLower = keyword.toLowerCase();
    keywordCount += contentWords.filter((word) =>
      word.includes(keywordLower.replace(/[^\w\s]/g, ''))
    ).length;
  });

  const density = (keywordCount / totalWords) * 100;

  let score = 0;
  if (keywordCount === 0) {
    score = 0;
  } else if (density >= KEYWORD_DENSITY_MIN && density <= KEYWORD_DENSITY_MAX) {
    score = 100;
  } else if (density < KEYWORD_DENSITY_MIN) {
    score = Math.round((density / KEYWORD_DENSITY_MIN) * 100);
  } else {
    score = Math.max(0, 100 - (density - KEYWORD_DENSITY_MAX) * 5);
  }

  return {
    count: keywordCount,
    density: Math.round(density * 100) / 100,
    score: Math.max(0, Math.min(100, score)),
  };
}

/**
 * Analyze headings structure
 */
function analyzeHeadings(content: string): SEOAnalysis['headings'] {
  const h1Regex = /<h1[^>]*>/gi;
  const h1Count = (content.match(h1Regex) || []).length;

  const optimal = h1Count === 1;
  const score = optimal ? 100 : h1Count === 0 ? 0 : 50;

  return {
    h1Count,
    optimal,
    score,
  };
}

/**
 * Analyze readability using Flesch Reading Ease
 */
function analyzeReadability(content: string) {
  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, '');

  // Count sentences, words, and syllables
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const words = text.split(/\s+/).filter((w) => w.length > 0).length;
  const syllables = countSyllables(text);

  if (sentences === 0 || words === 0) {
    return {
      score: 0,
      level: 'Hard' as const,
    };
  }

  // Flesch Reading Ease formula
  const score = Math.round(
    206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
  );

  let level: 'Easy' | 'Medium' | 'Hard' = 'Hard';
  if (score >= 90) level = 'Easy';
  else if (score >= 60) level = 'Medium';

  return {
    score: Math.max(0, Math.min(100, score)),
    level,
  };
}

/**
 * Count syllables in text (simplified algorithm)
 */
function countSyllables(text: string): number {
  let count = 0;
  const words = text.split(/\s+/);

  words.forEach((word) => {
    word = word.toLowerCase();
    if (word.length <= 3) {
      count++;
      return;
    }

    const vowels = word.match(/[aeiouy]/g);
    if (vowels) {
      let vCount = vowels.length;

      // Adjust for silent e
      if (word.endsWith('e')) vCount--;

      // Adjust for consecutive vowels
      const consecutiveVowels = word.match(/[aeiouy]{2,}/g);
      if (consecutiveVowels) {
        vCount -= consecutiveVowels.length - 1;
      }

      count += Math.max(1, vCount);
    }
  });

  return count;
}

/**
 * Get SEO recommendations based on analysis
 */
export function getSEORecommendations(analysis: SEOAnalysis): string[] {
  const recommendations: string[] = [];

  if (!analysis.title.optimal) {
    if (analysis.title.length < 30) {
      recommendations.push(
        'Título muito curto. Aumente para pelo menos 30 caracteres.'
      );
    } else if (analysis.title.length > 60) {
      recommendations.push(
        'Título muito longo. Reduza para no máximo 60 caracteres.'
      );
    }
  }

  if (!analysis.description.optimal) {
    if (analysis.description.length < 120) {
      recommendations.push(
        'Descrição muito curta. Aumente para pelo menos 120 caracteres.'
      );
    } else if (analysis.description.length > 160) {
      recommendations.push(
        'Descrição muito longa. Reduza para no máximo 160 caracteres.'
      );
    }
  }

  if (analysis.keywords.score < 50) {
    recommendations.push(
      'Palavras-chave com densidade ruim. Use palavras-chave mais naturalmente no conteúdo.'
    );
  }

  if (!analysis.headings.optimal) {
    if (analysis.headings.h1Count === 0) {
      recommendations.push('Adicione um H1 ao seu conteúdo.');
    } else if (analysis.headings.h1Count > 1) {
      recommendations.push('Use apenas um H1 por página.');
    }
  }

  if (analysis.readability.level === 'Hard') {
    recommendations.push(
      'Conteúdo difícil de ler. Simplifique o texto e use frases mais curtas.'
    );
  }

  return recommendations;
}
