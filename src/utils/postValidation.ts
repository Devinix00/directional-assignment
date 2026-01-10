import { message } from "antd";
import { checkForbiddenWords } from "./forbiddenWords";
import { josa } from "es-hangul";

export const validateForbiddenWord = (
  text: string,
  fieldLabel: string
): boolean => {
  const forbiddenWord = checkForbiddenWords(text);
  if (forbiddenWord) {
    message.error(
      `${fieldLabel}에 금지어 ${josa(
        forbiddenWord,
        "이/가"
      )} 포함되어 있습니다.`
    );
    return true;
  }
  return false;
};

export const validateTags = (tags: string[]): boolean => {
  const tagWithForbiddenWord = tags.find((tag) => checkForbiddenWords(tag));
  if (tagWithForbiddenWord) {
    const forbiddenWord = checkForbiddenWords(tagWithForbiddenWord);
    if (forbiddenWord) {
      message.error(
        `태그에 금지어 ${josa(forbiddenWord, "이/가")} 포함되어 있습니다.`
      );
      return true;
    }
  }
  return false;
};
