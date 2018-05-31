import React, { Component } from 'react';
import styles from './Sidebar.css';
import { Form, Input, Tooltip, Icon, Modal, DatePicker, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const residences=require('../../../assets/cities.js');

class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  okHandler = () => {
    const { infoHandler } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        infoHandler(values);
        this.hideModelHandler();
      }
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  }

  showModelHandler = (e) => {
    console.log("show model");
    if (e) {
      e.stopPropagation();
    }
    this.setState({
      visible: true,
    });
  };

  render() {
    const {user, logout } = this.props;
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
      <div className="sidebar">
        <Modal
          title="修改资料"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
          destroyOnClose={true}
        >
          <Form onSubmit={this.okHandler} className={styles.myForm}>
            <FormItem
              {...formItemLayout}
              label="账号"
              hasFeedback
            >
              {getFieldDecorator('accountId', {
                initialValue: user.accountId,
              })(
                <Input disabled={true} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="昵称"
              hasFeedback
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入你的昵称！', whitespace: true }],
                initialValue: user.name,
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
                initialValue: user.sex,
              })(
                <Select style={{ width: 80 }}>
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
                initialValue:moment(user.birth, 'YYYY-MM-DD'),
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
                initialValue: user.email,
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="籍贯"
            >
              {getFieldDecorator('homeplace', {
                rules: [{ type: 'array', required: true, message: '请选择你的籍贯!' }],
                initialValue: [user.province, user.city, user.county],
              })(
                <Cascader options={residences} placeholder=""/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="电话号码"
            >
              {getFieldDecorator('phone', {
                initialValue: user.phone,
                rules: [{ required: true, message: '请输入你的电话号码!' }],
              })(
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
              )}
            </FormItem>
          </Form>
        </Modal>
        <img src="//cdn.suisuijiang.com/fiora/avatar/3.jpg" className="head" onClick={this.showModelHandler} />
        <Button onClick={logout} className="logout" ghost={true}>
          <Icon type="poweroff"  style={{ fontSize: 30, color: '#08c' }} />
        </Button>
      </div>
    );
  }
};


export default Form.create()(Sidebar);
