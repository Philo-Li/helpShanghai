import React from 'react';

import { Button, Spinner } from 'react-bootstrap';
import { Form } from 'formik';

import TextInputDescription from '../../others/TextInputDescription';

const EditCollectionForm = ({ loading }) => (
  <Form>
    <div className="col-item-1">
      <TextInputDescription
        name="content"
        type="text"
        placeholder="输入评论..."
      />
    </div>
    <div className="col-item-1 container-flex-end item-flex-end">
      {!loading && (
        <Button variant="outline-dark" id="comment-button" type="submit" block="true">
          发布评论
        </Button>
      )}
      {loading && (
        <Button variant="outline-dark" id="comment-button-loading" disabled block="true">
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="sr-only">发布中...</span>
        </Button>
      )}
    </div>
  </Form>
);

export default EditCollectionForm;
