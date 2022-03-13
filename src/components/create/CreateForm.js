/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Form } from 'formik';
import TextInput from '../others/TextInput';
import TextInputTitle from '../others/TextInputTitle';
import MyEditor from '../editor/draft';
import EditorConvertToJSON from '../editor/rawDraftContent';

const CreateForm = ({ loading, files, setFiles }) => (
  <Form>
    <div className="container-col-title">
      <TextInputTitle
        name="title"
        type="text"
        placeholder="Title"
      />
    </div>
    <div className="editor-border">
      <MyEditor />
    </div>
    <div className="container-row-signup">
      <div className="col-item-1">
        {!loading && (
          <Button variant="outline-dark" id="create-button" type="submit" block="true">
            Save
          </Button>
        )}
        {loading && (
          <Button variant="outline-dark" id="create-button-loading" disabled>
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
      <div className="col-item-1">
        {!loading && (
          <Button variant="outline-dark" id="create-button" type="submit" block="true">
            Publish
          </Button>
        )}
        {loading && (
          <Button variant="outline-dark" id="create-button-loading" disabled>
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
