import { Form, Input, Button, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";
import styles from "./LoginPage.module.scss";
import { useLoginMutation } from "../../services/auth/mutations";
import useAuthStore from "../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import PATH from "../../router/path";

const { Title } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [form] = Form.useForm();
  const { mutate: login, isPending } = useLoginMutation();
  const setToken = useAuthStore((state) => state.setToken);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const navigate = useNavigate();

  const handleSubmit: FormProps<LoginFormValues>["onFinish"] = ({
    email,
    password,
  }) => {
    login(
      { email, password },
      {
        onSuccess: (data) => {
          setToken(data.token);
          setIsAuthenticated(true);
          navigate(PATH.HOME);
        },
      }
    );
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
            <Button disabled={isPending} type="primary" htmlType="submit" block>
              {isPending ? "로그인 중..." : "로그인"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
