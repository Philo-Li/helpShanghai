import React from 'react';

import { Button, Spinner } from 'react-bootstrap';
import { Form } from 'formik';

import TextInput from '../../others/TextInput';

const EditCollectionForm = ({ loading }) => (
  <Form>
    <div className="col-item-1">
      <TextInput
        label="Cover"
        name="cover"
        type="text"
        placeholder=""
      />
    </div>

    <div className="col-item-1">
      {!loading && (
        <Button variant="primary" id="edit-collection-button" type="submit" block="true">
          Update
        </Button>
      )}
      {loading && (
        <Button variant="primary" id="edit-collection-button-loading" disabled block="true">
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
