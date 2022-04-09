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
  address1: yup
    .string()
    .trim(),
  address2: yup
    .string()
    .trim(),
  fullAddress: yup
    .string()
    .trim(),
  peopleCount: yup
    .number(),
  need: yup
    .string()
    .trim(),
  provide: yup
    .string()
    .trim(),
  surviveDate: yup
    .string()
    .trim(),
  contact: yup
    .string()
    .trim(),
  note: yup
    .string()
    .trim(),
  emergencyRate: yup
    .number(),
  type: yup
    .string()
    .trim(),
  status: yup
    .string()
    .trim(),
});

const CreateContainer = ({
  initialValues, onSubmit, errorInfo, successInfo, loading,
  editorState, setEditorState, type, setType, status, setStatus,
  emergencyRate, setEmergencyRate,
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
          type={type}
          setType={setType}
          status={status}
          setStatus={setStatus}
          emergencyRate={emergencyRate}
          setEmergencyRate={setEmergencyRate}
          errorInfo={errorInfo}
          successInfo={successInfo}
        />
      )}
    </Formik>
  </div>
);

export default CreateContainer;
