/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Spinner, Alert } from 'react-bootstrap';
import { Form } from 'formik';
import { AreaSelect, AreaCascader } from 'react-area-linkage';
import pcaa from 'area-data/pcaa';
import TextInputTitle from '../others/TextInputTitle';
import TextInput from '../others/TextInput';
import MyEditor from '../editor/draft';
import TypeButton from '../others/TypeButton';
import StatusButton from '../others/StatusButton';
import EmergencyRateButton from '../others/EmergencyRateButton';
import TextInputDescription from '../others/TextInputDescription';
import 'react-area-linkage/dist/index.css';
// title: '',
//   tag: '',
//   address1: '',
//   address2: '',
//   peopleCount: '',
//   need: '',
//   provide: '',
//   surviveDate: '',
//   contact: '',
//   note: '',
//   emergencyRate: '',
//   type: '物资',
//   status: '待解决',
const CreateForm = ({
  loading, editorState, setEditorState, type, setType, status, setStatus,
  emergencyRate, setEmergencyRate, errorInfo, successInfo,
}) => (
  <Form>
    <div className="container-col-title">
      <TextInputTitle
        name="title"
        type="text"
        placeholder="标题"
      />
    </div>
    {/* <AreaSelect /> */}
    {/* <AreaCascader /> */}
    <div className="container-row-license">
      <div className="container-row-license-item">
        分类:
      </div>
      <div className="container-row-license-item">
        <TypeButton type={type} setType={setType} />
      </div>
    </div>
    <div className="container-row-license">
      <div className="container-row-license-item">
        紧急程度:
      </div>
      <div className="container-row-license-item">
        <EmergencyRateButton emergencyRate={emergencyRate} setEmergencyRate={setEmergencyRate} />
      </div>
    </div>
    <div className="container-row-license">
      <div className="container-row-license-item">
        状态:
      </div>
      <div className="container-row-license-item">
        <StatusButton status={status} setStatus={setStatus} />
      </div>
    </div>
    <div className="container-row-license">
      <div className="container-row-license-item">
        省市区:
      </div>
      <div className="container-row-license-item">
        <AreaCascader type="text" defaultArea={editorState} onChange={setEditorState} level={1} data={pcaa} />
      </div>
    </div>

    <div className="container-col-text-input-create">
      <TextInput
        label="详细地址（为了更好地帮助到你，建议精确到户）："
        name="address2"
        type="text"
        placeholder="add tag..."
      />
    </div>
    <div className="container-col-text-input-create">
      <TextInput
        label="人数"
        name="peopleCount"
        type="number"
        placeholder=""
      />
    </div>
    <div className="container-col-text-input-create">
      <TextInputDescription
        label="需要的物资"
        name="need"
        type="text"
        placeholder=""
      />
    </div>
    <div className="container-col-text-input-create">
      <TextInputDescription
        label="可以提供的物资"
        name="provide"
        type="text"
        placeholder=""
      />
    </div>
    <div className="container-col-text-input-create">
      <TextInput
        label="联系方式（会对未注册用户隐藏）"
        name="contact"
        type="text"
        placeholder=""
      />
    </div>
    <div className="container-col-text-input-create">
      <TextInput
        label="存粮预计可消耗到"
        name="surviveDate"
        type="date"
        placeholder=""
      />
    </div>
    <div className="container-col-text-input-create">
      <TextInput
        label="标签"
        name="tag"
        type="text"
        placeholder="输入标签..."
      />
    </div>
    <div className="container-col-text-input-create">
      <div className="col-item-1">
        <TextInputDescription
          label="备注"
          name="note"
          type="text"
          placeholder=""
        />
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
      <div className="col-item-1">
        {!loading && (
          <Button variant="outline-dark" id="publish-button" type="submit" block="true">
            发布
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
            <span className="sr-only">发布中...</span>
          </Button>
        )}
      </div>
    </div>

  </Form>
);

export default CreateForm;
