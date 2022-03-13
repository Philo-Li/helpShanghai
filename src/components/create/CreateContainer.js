import React from 'react';
import { Formik } from 'formik';
import { Alert } from 'react-bootstrap';
import * as yup from 'yup';
import CreateForm from './CreateForm';

const validationSchema = yup.object().shape({
  title: yup
    .string(),
});

const CreateContainer = ({
  initialValues, onSubmit, errorInfo, loading, files, setFiles,
}) => (
  <div className="container-col-create">
    {errorInfo && (
    <Alert variant="danger">
      {errorInfo}
    </Alert>
    )}
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <CreateForm
          onSubmit={handleSubmit}
          loading={loading}
          files={files}
          setFiles={setFiles}
        />
      )}
    </Formik>
  </div>
);

export default CreateContainer;
