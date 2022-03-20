import React from 'react';
import { Formik } from 'formik';
import { Alert } from 'react-bootstrap';
import * as Yup from 'yup';

import EditCollectionForm from './EditCollectionForm';

const validationSchema = Yup.object().shape({
  content: Yup
    .string(),
});

const EditCollectionContainer = ({
  initialValues, onSubmit, errorInfo, successInfo, loading,
}) => (
  <div className="p-3">
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
      {({ handleSubmit }) => <EditCollectionForm onSubmit={handleSubmit} loading={loading} />}
    </Formik>
  </div>
);

export default EditCollectionContainer;
