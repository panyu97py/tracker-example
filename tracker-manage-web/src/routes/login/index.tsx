import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { LoginInfo } from '@/service/system-auth-service/types';
import { systemAuthService } from '@/service';  // 引入 Ant Design 样式
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const navigate = useNavigate();


  const handleLogin = async (value: LoginInfo) => {
    try {
      setLoading(true);
      await systemAuthService.login(value);
      navigate('/config')
    } catch {} finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card title="登录" style={{ width: 400 }}>
        <Form name="login" form={form} onFinish={handleLogin}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
