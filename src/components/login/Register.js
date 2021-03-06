/* eslint-disable */
import React from 'react';
import { connect } from 'dva';
import {routerRedux} from "dva/router";
import styles from './Register.css';
import { Form, Input, Tooltip, Icon, Modal, DatePicker, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const residences=require('../../assets/cities.js');

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        fetch("/api/register",{
        	method : "POST",
        	headers : {
        		"Content-Type": "application/json"
        	},
        	body:JSON.stringify(values)
        }).then((data)=>data.json()).then((data)=>{if(data.status == 0){
        	Modal.success({
            content: "注册成功,你的账号为"+data.data.accountId ,
          });
       //   this.props.dispatch(routerRedux.push("/login"))
        	// window.location="/#/"

        }else{
        	message.error("注册失败,服务器错误！");

        }});
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value.length < 6) {
      callback('密码长度至少为六位!');
      if(this.state.confirmDirty){
        form.validateFields(['confirm'], { force: true });
      }
    }
    callback();
  }



  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 80 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );


    return (
      <Form onSubmit={this.handleSubmit} className={styles.myForm}>
        <FormItem
          {...formItemLayout}
          label="昵称"
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入你的昵称！', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="性别"
          hasFeedback
        >
          {getFieldDecorator('sex', {
            rules: [{
              required: true, message: '请输入你的性别!',
            }],
          })(
            <Select style={{ width: 80 }} defaultValue="famale">
              <Option value="famale">男</Option>
              <Option value="male">女</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="出生日期"
          hasFeedback
        >
          {getFieldDecorator('birth', {
            rules: [{
              required: true, message: '请选择你的出生日期!',
            }],
          })(
            <DatePicker format="YYYY-MM-DD" placeholder=""/>
          )}

        </FormItem>
        <FormItem
          {...formItemLayout}
          label="电子邮箱"
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '无效的 E-mail地址!',
            }, {
              required: true, message: '请输入你的E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入你的密码!',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="再次输入密码"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请再次输入密码!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="籍贯"
        >
          {getFieldDecorator('homeplace', {
            rules: [{ type: 'array', required: true, message: '请选择你的籍贯!' }],
          })(
            <Cascader options={residences} placeholder=""/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="电话号码"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入你的电话号码!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout} className="text-center">
          <Button type="primary" htmlType="submit">注册</Button>
          <Button type="primary" href="#/login" className="tologin">去登陆<Icon type="right" /></Button>
        </FormItem>

      </Form>
    );
  }
}

const Regist = Form.create()(RegistrationForm);


export default connect()(Regist);
