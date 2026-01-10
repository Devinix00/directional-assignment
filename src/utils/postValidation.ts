import { message } from "antd";
import { checkForbiddenWords } from "./forbiddenWords";
import { josa } from "es-hangul";
import { POST_LIMITS } from "../constants/post";

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
    return false;
  }
  return true;
};

export const validateTagsForbiddenWord = (tags: string[]): boolean => {
  const tagWithForbiddenWord = tags.find((tag) => checkForbiddenWords(tag));
  if (tagWithForbiddenWord) {
    const forbiddenWord = checkForbiddenWords(tagWithForbiddenWord);
    if (forbiddenWord) {
      message.error(
        `태그에 금지어 ${josa(forbiddenWord, "이/가")} 포함되어 있습니다.`
      );
      return false;
    }
  }
  return true;
};

export const validateTitleLength = (title: string): boolean => {
  if (title.length > POST_LIMITS.TITLE_MAX_LENGTH) {
    message.error(
      `제목은 최대 ${POST_LIMITS.TITLE_MAX_LENGTH}자까지 입력 가능합니다.`
    );
    return false;
  }
  return true;
};

export const validateBodyLength = (body: string): boolean => {
  if (body.length > POST_LIMITS.BODY_MAX_LENGTH) {
    message.error(
      `내용은 최대 ${POST_LIMITS.BODY_MAX_LENGTH}자까지 입력 가능합니다.`
    );
    return false;
  }
  return true;
};

export const validateTagCount = (currentTags: string[]): boolean => {
  if (currentTags.length >= POST_LIMITS.MAX_TAGS) {
    message.warning(
      `태그는 최대 ${POST_LIMITS.MAX_TAGS}개까지 추가할 수 있습니다.`
    );
    return false;
  }
  return true;
};

export const validateTagDuplicate = (
  tag: string,
  currentTags: string[]
): boolean => {
  if (currentTags.includes(tag)) {
    message.warning("이미 추가된 태그입니다.");
    return false;
  }
  return true;
};

export const canAddTag = (
  tag: string,
  currentTags: string[]
): { canAdd: boolean; reason?: string } => {
  if (!tag) {
    return { canAdd: false };
  }

  if (!validateTagCount(currentTags)) {
    return { canAdd: false };
  }

  if (!validateTagDuplicate(tag, currentTags)) {
    return { canAdd: false };
  }

  return { canAdd: true };
};
