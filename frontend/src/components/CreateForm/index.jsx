import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { useCrudContext } from '@/context/crud';
import { selectCreatedItem } from '@/redux/crud/selectors';

import useLanguage from '@/locale/useLanguage';

import { Button, Form, Alert } from 'antd';
import Loading from '@/components/Loading';

export default function CreateForm({ config, formElements, withUpload = false }) {
  let { entity } = config;
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector(selectCreatedItem);
  const { crudContextAction } = useCrudContext();
  const { panel, collapsedBox, readBox } = crudContextAction;
  const [form] = Form.useForm();
  const [validationErrors, setValidationErrors] = useState([]);
  const translate = useLanguage();
  
  const onSubmitFailed = (errorInfo) => {
    // Extract validation error messages
    const errors = errorInfo.errorFields.map(field => {
      return field.errors[0];
    });
    setValidationErrors(errors);
  };
  
  const onSubmit = (fieldsValue) => {
    // Clear validation errors on successful validation
    setValidationErrors([]);
    // Manually trim values before submission

    if (fieldsValue.file && withUpload) {
      fieldsValue.file = fieldsValue.file[0].originFileObj;
    }

    // const trimmedValues = Object.keys(fieldsValue).reduce((acc, key) => {
    //   acc[key] = typeof fieldsValue[key] === 'string' ? fieldsValue[key].trim() : fieldsValue[key];
    //   return acc;
    // }, {});

    dispatch(crud.create({ entity, jsonData: fieldsValue, withUpload }));
  };

  useEffect(() => {
    if (isSuccess) {
      readBox.open();
      collapsedBox.open();
      panel.open();
      form.resetFields();
      dispatch(crud.resetAction({ actionType: 'create' }));
      dispatch(crud.list({ entity }));
    }
  }, [isSuccess]);

  return (
    <Loading isLoading={isLoading}>
      <Form form={form} layout="vertical" onFinish={onSubmit} onFinishFailed={onSubmitFailed} requiredMark={false}>
        {validationErrors.length > 0 && (
          <Alert
            message="Validation Error"
            description={
              <ul style={{ marginBottom: 0, paddingLeft: 20 }}>
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            }
            type="error"
            showIcon
            closable
            onClose={() => setValidationErrors([])}
            style={{ marginBottom: 16 }}
          />
        )}
        {formElements}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {translate('Submit')}
          </Button>
        </Form.Item>
      </Form>
    </Loading>
  );
}
