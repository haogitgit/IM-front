import React from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import styles from './Login.css';
import { Form, Icon, Input, Button, Checkbox, message, Tooltip } from 'antd';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        fetch("/api/login",{
        	method:"POST",
        	headers: {
        		"Content-Type":"application/json"
        	},
        	body:JSON.stringify(values)
        }).then(data=>data.json()).then(data=>{
        	if(data.result == 1){
            message.success("登陆成功！");
            // window.location = "/#/";
            this.props.dispatch(routerRedux.push("/"));
          }else if(data.result == -1){
            message.error("密码或者账号错误！");
          }else if(data.result == 0){
            message.error("登陆失败！");
          }

        })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (

      <Form onSubmit={this.handleSubmit} className="login-form">
        <div className="logintext">账号密码登陆</div>
        <FormItem>
          {getFieldDecorator('id', {
            rules: [{ required: true, message: '请输入你的账号!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="账号" />
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

          <Button type="primary" htmlType="submit" className="login-form-button">
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
}

const Login = Form.create()(NormalLoginForm);

export default connect()(Login);
