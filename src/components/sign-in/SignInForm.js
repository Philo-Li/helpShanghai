import React from 'react';

import { Button, Spinner } from 'react-bootstrap';
import { Form } from 'formik';

import TextInput from '../others/TextInput';

const SignInForm = ({ loading }) => (
  <Form>
    <div className="col-item-1">
      <TextInput
        label="电子邮箱地址"
        name="email"
        type="email"
        placeholder=""
      />
    </div>

    <div className="col-item-1">
      <TextInput
        label="密码"
        name="password"
        type="password"
        placeholder=""
      />
    </div>

    <div className="d-grid margin-tb-2rem">
      {!loading && (
        <Button variant="dark" id="login-button" type="submit" block="true">
          登录
        </Button>
      )}
      {loading && (
        <Button variant="dark" id="login-button-loading" disabled block="true">
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="sr-only">登录中...</span>
        </Button>
      )}
    </div>
  </Form>
);

export default SignInForm;
