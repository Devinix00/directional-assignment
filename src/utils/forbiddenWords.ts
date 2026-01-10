import FORBIDDEN_WORDS from "../constants/forbiddenWords";

export const checkForbiddenWords = (text: string): string | null => {
  return FORBIDDEN_WORDS.find((word) => text.includes(word)) || null;
};
