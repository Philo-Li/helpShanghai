import React from 'react';

import { Button, Spinner } from 'react-bootstrap';
import { Form } from 'formik';

import TextInput from '../others/TextInput';

const SignUpForm = ({ loading }) => (
  <div>
    <Form>
      <div className="col-item-1">
        <TextInput
          label="用户名 *"
          info=" (字母或数字或下划线)"
          name="username"
          type="username"
          placeholder=""
        />
      </div>

      <div className="col-item-1">
        <TextInput
          label="邮箱 *"
          name="email"
          type="email"
          placeholder="example@mail.com"
        />
      </div>

      <div className="col-item-1">
        <TextInput
          label="密码 *"
          info=" (至少8个字符)"
          name="password"
          type="password"
          placeholder=""
        />
      </div>

      <div className="col-item-1">
        <TextInput
          label="再次输入密码 *"
          name="confirmPassword"
          type="password"
          placeholder=""
        />
      </div>

      <div className="d-grid margin-tb-2rem">
        {!loading && (
          <Button variant="dark" id="signup-button" type="submit" block>
            注册
          </Button>
        )}
        {loading && (
          <Button variant="dark" id="signup-button-loading" disabled block>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="sr-only">注册中...</span>
          </Button>
        )}
      </div>
    </Form>
  </div>
);

export default SignUpForm;
