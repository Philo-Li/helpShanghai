/* eslint-disable max-len */
import React from 'react';
import { Formik } from 'formik';
import { Alert } from 'react-bootstrap';
import * as Yup from 'yup';

import EditCollectionForm from './EditCollectionForm';

const validationSchema = Yup.object().shape({
  cover: Yup
    .string(),
});

const EditCollectionContainer = ({
  initialValues, onSubmit, errorInfo, successInfo, loading, tabKey, cover, setCover,
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
      {({ handleSubmit }) => (
        <EditCollectionForm
          onSubmit={handleSubmit}
          loading={loading}
          tabKey={tabKey}
          cover={cover}
          setCover={setCover}
        />
      )}
    </Formik>
  </div>
);

export default EditCollectionContainer;
