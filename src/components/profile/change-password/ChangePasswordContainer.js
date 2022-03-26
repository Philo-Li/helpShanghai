/* eslint-disable no-useless-escape */
import React from 'react';
import { Formik } from 'formik';
import { Alert } from 'react-bootstrap';
import * as Yup from 'yup';

import ChangePasswordForm from './ChangePasswordForm';

const validationSchema = Yup.object({
  currentPassword: Yup.string()
    .required('Required'),
  newPassword: Yup.string()
    .min(8, 'Password length must be greater than or equal to 8')
    .matches('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}', 'At least 1 number, 1 uppercase and lowercase letter')
    .required('Required'),
});

const ChangePasswordContainer = ({
  initialValues, onSubmit, errorInfo, successInfo, loading,
}) => (
  <div className="container-col-settings">
    {errorInfo && (
      <Alert variant="danger">
        {errorInfo}
      </Alert>
    )}
    {successInfo && (
      <Alert variant="success">
        {successInfo}
      </Alert>
    )}
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <ChangePasswordForm onSubmit={handleSubmit} loading={loading} />}
    </Formik>
  </div>
);

export default ChangePasswordContainer;
