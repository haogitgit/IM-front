import React, { Component } from 'react';
import styles from './Chat.css';
import { Form, Icon, Input, Button, Modal, message, Tooltip } from 'antd';
import MessageInput from "./MessageInput";
import Message from "./Message";

const FormItem = Form.Item;

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  okHandler = () => {
    const { remarkHandler } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        remarkHandler(values);
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

  renderMessage = (user, currentChat, chatmessage, i) => {
    console.log("rendmessage");
    console.log(chatmessage);
    const props = {
      date: chatmessage.date,
      content: chatmessage.msgContent,
    };
    if (currentChat.accountId === chatmessage.targetClientId){
      props.isSelf = true;
      props.nickname = user.name;
    } else {
      props.isSelf = false;
      props.nickname = currentChat.name;
    }
    console.log(props);
    return (
      <Message {...props} key={i} />
    );
  }

  render() {
    const { currentChat, send, currentMessage, user, deleteContact } = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <div className="chat">
        <div className="header" >
          <span className="textspan">
            {currentChat.name}
            <Button className="beizhubutton" type="primary" onClick={this.showModelHandler} size="small" >
            备注
          </Button>
          </span>
          <Button type="primary" className="userdelete" onClick={deleteContact} ghost={true} >
            <Icon type="user-delete" style={{ fontSize: 27  }} />
          </Button>
        </div>
        <div className="messagelist">
          <Modal
            title="添加备注"
            visible={this.state.visible}
            onOk={this.okHandler}
            onCancel={this.hideModelHandler}
          >
            <Form horizontal onSubmit={this.okHandler}>
              <FormItem
                {...formItemLayout}
                label="备注信息"
              >
                {
                  getFieldDecorator('remark', {
                    initialValue: '',
                    rules: [{ required: true, message: '请输入备注！', whitespace: true }],
                  })(<Input />)
                }
              </FormItem>
            </Form>
          </Modal>
          {
            currentMessage.map((chatmessage, i) => (
              this.renderMessage(user, currentChat, chatmessage, i)
            ))}
        </div>
        <div className="messagesend">
          <MessageInput send = {send } />
        </div>
      </div>
    );
  }

};

Chat.propTypes = {
};

export default Form.create()(Chat);
