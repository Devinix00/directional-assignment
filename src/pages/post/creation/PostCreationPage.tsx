import { Form, Input, Select, Button, Typography, message } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";
import styles from "./PostCreationPage.module.scss";
import { useCreatePostMutation } from "../../../services/post/mutations";
import type { CreatePostRequest } from "../../../services/post/types";
import { checkForbiddenWords } from "../../../utils/forbiddenWords";
import { josa } from "es-hangul";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const CATEGORY_OPTIONS = [
  { value: "NOTICE", label: "공지사항" },
  { value: "QNA", label: "Q&A" },
  { value: "FREE", label: "자유게시판" },
] as const;

export default function PostCreationPage() {
  const [form] = Form.useForm<CreatePostRequest>();
  const { mutate: createPost, isPending } = useCreatePostMutation();

  const validateForbiddenWord = (text: string, fieldLabel: string): boolean => {
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

  const validateTags = (tags: string[]): boolean => {
    const tagWithForbiddenWord = tags.find((tag) => checkForbiddenWords(tag));
    if (tagWithForbiddenWord) {
      const tagForbiddenWord = checkForbiddenWords(tagWithForbiddenWord);
      if (tagForbiddenWord) {
        message.error(
          `태그에 금지어 ${josa(tagForbiddenWord, "이/가")} 포함되어 있습니다.`
        );
        return true;
      }
    }
    return false;
  };

  const handleSubmit: FormProps<CreatePostRequest>["onFinish"] = (
    data: CreatePostRequest
  ) => {
    if (validateForbiddenWord(data.title, "제목")) return;
    if (validateForbiddenWord(data.body, "내용")) return;
    if (validateTags(data.tags)) return;

    createPost(data, {
      onSuccess: () => {
        message.success("게시글이 성공적으로 작성되었습니다.");
        form.resetFields();
      },
    });
  };

  return (
    <div className={styles.container}>
      <Title level={2} className={styles.title}>
        <FileTextOutlined /> 게시글 작성
      </Title>
      <Form
        form={form}
        name="post-creation"
        onFinish={handleSubmit}
        layout="vertical"
        size="large"
        initialValues={{
          category: "FREE",
          tags: [],
        }}
      >
        <Form.Item
          label="제목"
          name="title"
          rules={[{ required: true, message: "제목을 입력해주세요" }]}
        >
          <Input placeholder="제목을 입력하세요" />
        </Form.Item>

        <Form.Item
          label="카테고리"
          name="category"
          rules={[{ required: true, message: "카테고리를 선택해주세요" }]}
        >
          <Select placeholder="카테고리를 선택하세요">
            {CATEGORY_OPTIONS.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="내용"
          name="body"
          rules={[{ required: true, message: "내용을 입력해주세요" }]}
        >
          <TextArea rows={10} placeholder="내용을 입력하세요" />
        </Form.Item>

        <Form.Item
          label="태그"
          name="tags"
          tooltip="엔터를 눌러 태그를 추가하세요"
        >
          <Select
            mode="tags"
            placeholder="태그를 입력하세요 (엔터로 추가)"
            tokenSeparators={[","]}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isPending}
            loading={isPending}
            size="large"
            block
          >
            {isPending ? "작성 중..." : "작성하기"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
