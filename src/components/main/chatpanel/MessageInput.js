/* eslint-disable */
import React from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import styles from './MessageInput.css';
import { Form, Icon, Input, Button, Divider, message, Tooltip } from 'antd';
import {Modal} from "antd/lib/index";
const FormItem = Form.Item;

function MessageInput({send, form: { getFieldDecorator, validateFields, setFields }}) {
  function handleOk (e) {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // dispatch({
        //   type: 'main/search',
        //   payload: values,
        // });
        send(values);
        setFields({"message":""})
      }
    });
  }
  return (
    <Form>
      <FormItem>
        {getFieldDecorator('message', {
          rules: [{ required: false, }],
        })(
          <Input className="messageinput"/>
        )}
        <Button type="primary" className="inputButton" onClick={handleOk}>
          <span>发送</span>
        </Button>
      </FormItem>
    </Form>
  );
};

export default connect()(Form.create()(MessageInput));
