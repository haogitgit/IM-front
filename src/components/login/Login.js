/* eslint-disable */
import React from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import styles from './Login.css';
import { Form, Icon, Input, Button, Checkbox, message, Tooltip } from 'antd';
import {Modal} from "antd/lib/index";
const FormItem = Form.Item;

function NormalLoginForm ({loading,dispatch,form: { getFieldDecorator, validateFields,},
}) {
  function handleOk (e) {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch({
          type: 'login/login',
          payload: values,
        });
      }
    });
  }
    return (

      <Form className="login-form">
        <div className="logintext">账号密码登陆</div>
        <FormItem>
          {getFieldDecorator('accountId', {
            rules: [{ required: true, message: '请输入你的账号!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="账号"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入你的密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住我</Checkbox>
          )}
          <Link className="register" to="/login">
            忘记密码
          </Link>

          <Button type="primary" className="login-form-button" onClick={handleOk}>
            登陆
          </Button>
          <div className="other">
            登陆方式
            <Icon className="icon" type="alipay-circle" />
            <Icon className="icon" type="taobao-circle" />
            <Icon className="icon" type="weibo-circle" />
            <Link className="register" to="/register">
              注册账户
            </Link>
          </div>

        </FormItem>
      </Form>
    );
}

const Login = Form.create()(NormalLoginForm);

export default connect()(Login);
