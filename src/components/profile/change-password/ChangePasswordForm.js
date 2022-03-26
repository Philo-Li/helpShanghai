import React from 'react';

import { Button, Spinner } from 'react-bootstrap';
import { Form } from 'formik';

import TextInput from '../../others/TextInput';

const ChangePasswordForm = ({ loading }) => (
  <div>
    <Form>
      <div className="col-item-1">
        <TextInput
          label="Current password *"
          info=""
          name="currentPassword"
          type="password"
          placeholder=""
        />
      </div>

      <div className="col-item-1">
        <TextInput
          label="New password *"
          info=" (At least 1 number, 1 uppercase and 1 lowercase letter)"
          name="newPassword"
          type="password"
          placeholder=""
        />
      </div>

      <div className="d-grid gap-2 margin-tb-2rem">
        {!loading && (
          <Button variant="primary" id="change-password-button" type="submit" block="true">
            Update
          </Button>
        )}
        {loading && (
          <Button variant="primary" id="change-password-button-loading" disabled block="true">
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
          </Button>
        )}
      </div>
    </Form>
  </div>
);

export default ChangePasswordForm;
