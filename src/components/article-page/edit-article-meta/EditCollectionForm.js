import React from 'react';

import { Button, Spinner } from 'react-bootstrap';
import { Form } from 'formik';

import TextInput from '../../others/TextInput';
import Previews from '../../upload/uploadComponent';

const EditCollectionForm = ({
  loading, tabKey, cover, setCover,
}) => (
  <Form>
    {tabKey === 'Link' && (
      <div className="col-item-1">
        <TextInput
          label="Paste cover link here"
          name="cover"
          type="text"
          placeholder=""
        />
      </div>
    )}

    {tabKey === 'Upload' && (
      <div>
        <Previews cover={cover} setCover={setCover} />
      </div>
    )}

    <div className="col-item-1 flex-btn-end flex-btn-end-item">
      {!loading && (
        <Button variant="outline-dark" id="edit-collection-button" type="submit" block="true">
          Update
        </Button>
      )}
      {loading && (
        <Button variant="outline-dark" id="edit-collection-button-loading" disabled block="true">
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
);

export default EditCollectionForm;
