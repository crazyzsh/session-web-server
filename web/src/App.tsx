import React, { useState } from 'react';
import { Button, Checkbox, Form, type FormProps, Input, message } from 'antd';

type FieldType = {
  username?: string;
  password?: string;
  verifycode?: string;
  remember?: string;
  codeimage?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = values => {
  console.log('Success:', values);

  fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(re => re.json())
    .then(res => {
      console.log(res);
      if (res.message === '验证码错误') {
        message.error(res.message);
      } else {
        message.success(res.message);
      }
    });
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
  console.log('Failed:', errorInfo);
};

const App: React.FC = () => {
  const [codeUrl, setCodeUrl] = useState('/api/code');
  const resetVerifyCode = () => {
    setCodeUrl('/api/code?' + Math.random());
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {/* 用户名 */}
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      {/* 密码 */}
      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      {/* 验证码 */}
      <Form.Item<FieldType>
        label="VerifyCode"
        name="verifycode"
        rules={[{ required: true, message: 'Please input your vervifyCode!' }]}
      >
        <Input />
      </Form.Item>

      {/* 验证码图片 */}
      <Form.Item<FieldType> label="CodeImage" name="codeimage">
        <img onClick={resetVerifyCode} src={codeUrl} alt="" />
      </Form.Item>

      {/* 记住我 */}
      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      {/* 提交 */}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
