/* eslint-disable */
import React from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import styles from './Search.css';
import { Form, Icon, Input, Button, Divider, message, Tooltip } from 'antd';
import {Modal} from "antd/lib/index";
const FormItem = Form.Item;

function Search({loading,dispatch,form: { getFieldDecorator, validateFields,},
}) {
  function handleOk (e) {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          dispatch({
            type: 'main/search',
            payload: values,
          });
        }
      });
    }
    return (
      <div>
      <Form>
        <FormItem>
          {getFieldDecorator('accountId', {
            rules: [{ required: true, message: '请输入用户账号!' }],
          })(
            <Input className="searchInput" prefix={<Icon type="search" style={{ fontSize: 13 }} />} placeholder="搜索用户"/>
          )}
          <Button type="primary" className="searchButton" onClick={handleOk} ghost={true} >
            <Icon type="user-add" style={{ fontSize: 27  }} />
          </Button>
        </FormItem>
      </Form>
      </div>
    );
};

export default connect()(Form.create()(Search));
