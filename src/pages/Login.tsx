// src/pages/Login.tsx
import React, { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authApi"; // your API call
import { useAuth } from "../context/auth-context";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { refresh } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await loginUser(values.username, values.password); // API call
      await refresh(); // update auth context
      message.success("Logged in successfully");
      console.log("navigating to dashboard");
      navigate("/dashboard");
    } catch (err: any) {
      message.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <Card title="Login" style={{ width: 350 }}>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="username"
            rules={[
              { required: true, message: "Please input your username/email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
