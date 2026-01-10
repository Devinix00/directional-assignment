import { Form, Input, Button, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";
import styles from "./LoginPage.module.scss";

const { Title } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [form] = Form.useForm();

  const handleSubmit: FormProps<LoginFormValues>["onFinish"] = ({
    email,
    password,
  }) => {
    console.log("Login values:", email, password);
  };

  const handleValidationFailed: FormProps<LoginFormValues>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title level={2} className={styles.title}>
          로그인
        </Title>
        <Form
          form={form}
          name="login"
          onFinish={handleSubmit}
          onFinishFailed={handleValidationFailed}
          layout="vertical"
          size="large"
        >
          <Form.Item
            label="이메일"
            name="email"
            rules={[
              { required: true, message: "이메일을 입력해주세요" },
              { type: "email", message: "올바른 이메일 형식이 아닙니다" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="이메일을 입력하세요"
              autoFocus
            />
          </Form.Item>

          <Form.Item
            label="비밀번호"
            name="password"
            rules={[{ required: true, message: "비밀번호를 입력해주세요" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="비밀번호를 입력하세요"
            />
          </Form.Item>

          <Form.Item>
            <Button disabled type="primary" htmlType="submit" block>
              로그인
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
