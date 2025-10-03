import wordsData from "@/data/words.json";

export interface Word {
  id: number;
  word: string;
  meaning: string;
  example: string;
}

export interface UserSentence {
  wordId: number;
  word: string;
  sentence: string;
  date: string;
  learned: boolean;
}

const STORAGE_KEY = "wordmaster_sentences";
const LEARNED_KEY = "wordmaster_learned";

export const getAllWords = (): Word[] => {
  return wordsData as Word[];
};

export const getDailyWordIndex = (): number => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  const words = getAllWords();
  return dayOfYear % words.length;
};

export const getTodaysWord = (): Word => {
  const words = getAllWords();
  const index = getDailyWordIndex();
  return words[index];
};

export const getWordById = (id: number): Word | undefined => {
  const words = getAllWords();
  return words.find(w => w.id === id);
};

export const saveSentence = (wordId: number, word: string, sentence: string): void => {
  const sentences = getUserSentences();
  const existingIndex = sentences.findIndex(s => s.wordId === wordId);
  
  const newSentence: UserSentence = {
    wordId,
    word,
    sentence,
    date: new Date().toISOString(),
    learned: false,
  };

  if (existingIndex >= 0) {
    sentences[existingIndex] = newSentence;
  } else {
    sentences.push(newSentence);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(sentences));
};

export const getUserSentences = (): UserSentence[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const getSentenceForWord = (wordId: number): UserSentence | undefined => {
  const sentences = getUserSentences();
  return sentences.find(s => s.wordId === wordId);
};

export const markWordAsLearned = (wordId: number, learned: boolean): void => {
  const sentences = getUserSentences();
  const sentence = sentences.find(s => s.wordId === wordId);
  
  if (sentence) {
    sentence.learned = learned;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sentences));
  }
};

export const getLearnedWordsCount = (): number => {
  const sentences = getUserSentences();
  return sentences.filter(s => s.learned).length;
};

export const getTotalWordsWithSentences = (): number => {
  return getUserSentences().length;
};
