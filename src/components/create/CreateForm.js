/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Spinner, Alert } from 'react-bootstrap';
import { Form } from 'formik';
import TextInputTitle from '../others/TextInputTitle';
import TextInput from '../others/TextInput';
import MyEditor from '../editor/draft';
import LicenseButton from '../others/LicenseButton';

const CreateForm = ({
  loading, editorState, setEditorState, setLicense, errorInfo, successInfo,
}) => (
  <Form>
    <div className="container-col-title">
      <TextInputTitle
        name="title"
        type="text"
        placeholder="Title"
      />
    </div>
    <div className="editor-border editor-container">
      <MyEditor editorState={editorState} setEditorState={setEditorState} />
    </div>
    <div className="container-col-tag">
      <TextInput
        name="tag"
        type="text"
        placeholder="add tag..."
      />
    </div>
    <div className="container-row-license">
      <div className="container-row-license-item">
        License:
      </div>
      <div className="container-row-license-item">
        <LicenseButton setLicense={setLicense} />
      </div>
      <div className="container-row-license-item">
        <button
          type="button"
          className="license-btn-info license-btn-item"
          onClick={() => window.open('/license')}
        >
          Info
        </button>
      </div>
    </div>
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
    <div className="container-row-signup">
      {/* <div className="col-item-1">
        {!loading && (
          <Button variant="outline-dark" id="save-button"
          type="submit" onSubmit={console.log('click')} block="true">
            Save
          </Button>
        )}
        {loading && (
          <Button variant="outline-dark" id="save-button-loading" disabled>
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
      </div> */}
      <div className="col-item-1">
        {!loading && (
          <Button variant="outline-dark" id="publish-button" type="submit" block="true">
            Publish
          </Button>
        )}
        {loading && (
          <Button variant="outline-dark" id="publish-button-loading" disabled>
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
    </div>

  </Form>
);

export default CreateForm;
