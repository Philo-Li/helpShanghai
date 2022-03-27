import React from 'react';
import { Formik } from 'formik';
import { Alert } from 'react-bootstrap';
import * as yup from 'yup';
import CreateForm from './CreateForm';

const validationSchema = yup.object().shape({
  title: yup
    .string(),
  tag: yup
    .string(),
});

const CreateContainer = ({
  initialValues, onSubmit, errorInfo, successInfo, loading,
  editorState, setEditorState, setLicense,
}) => (
  <div className="container-col-create">
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
        <CreateForm
          onSubmit={handleSubmit}
          loading={loading}
          editorState={editorState}
          setEditorState={setEditorState}
          setLicense={setLicense}
          errorInfo={errorInfo}
          successInfo={successInfo}
        />
      )}
    </Formik>
  </div>
);

export default CreateContainer;
