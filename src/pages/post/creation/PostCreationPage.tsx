import { Form, Input, Select, Button, Typography, message } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";
import styles from "./PostCreationPage.module.scss";
import { useCreatePostMutation } from "../../../services/post/mutations";
import type { CreatePostRequest } from "../../../services/post/types";
import {
  validateForbiddenWord,
  validateTagsForbiddenWord,
  validateTitleLength,
  validateBodyLength,
} from "../../../utils/postValidation";
import { CATEGORY_OPTIONS, POST_LIMITS } from "../../../constants/post";
import TagInput from "../../../components/tagInput/TagInput";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const POST_CATEGORY_OPTIONS = CATEGORY_OPTIONS.filter(
  (option) => option.value !== null
);

export default function PostCreationPage() {
  const [form] = Form.useForm<CreatePostRequest>();
  const { mutate: createPost, isPending } = useCreatePostMutation();

  const handleSubmit: FormProps<CreatePostRequest>["onFinish"] = (
    data: CreatePostRequest
  ) => {
    if (!validateTitleLength(data.title)) return;
    if (!validateBodyLength(data.body)) return;
    if (!validateForbiddenWord(data.title, "제목")) return;
    if (!validateForbiddenWord(data.body, "내용")) return;
    if (!validateTagsForbiddenWord(data.tags)) return;

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
          rules={[
            { required: true, message: "제목을 입력해주세요" },
            {
              max: POST_LIMITS.TITLE_MAX_LENGTH,
              message: `제목은 최대 ${POST_LIMITS.TITLE_MAX_LENGTH}자까지 입력 가능합니다.`,
            },
          ]}
        >
          <Input
            placeholder="제목을 입력하세요"
            maxLength={POST_LIMITS.TITLE_MAX_LENGTH}
            showCount
          />
        </Form.Item>

        <Form.Item
          label="카테고리"
          name="category"
          rules={[{ required: true, message: "카테고리를 선택해주세요" }]}
        >
          <Select placeholder="카테고리를 선택하세요">
            {POST_CATEGORY_OPTIONS.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="내용"
          name="body"
          rules={[
            { required: true, message: "내용을 입력해주세요" },
            {
              max: POST_LIMITS.BODY_MAX_LENGTH,
              message: `내용은 최대 ${POST_LIMITS.BODY_MAX_LENGTH}자까지 입력 가능합니다.`,
            },
          ]}
        >
          <TextArea
            rows={10}
            placeholder="내용을 입력하세요"
            maxLength={POST_LIMITS.BODY_MAX_LENGTH}
            showCount
          />
        </Form.Item>

        <Form.Item
          label="태그"
          name="tags"
          tooltip="엔터를 눌러 태그를 추가하세요"
        >
          <TagInput placeholder="태그를 입력하세요 (엔터로 추가)" />
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
