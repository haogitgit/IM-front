import React from 'react';
import styles from './Chat.css';
import { Form, Icon, Input, Button, Divider, message, Tooltip } from 'antd';
import MessageInput from "./MessageInput";
import Message from "./Message";

function Chat({ currentChat, send, currentMessage, user }) {

  function renderMessage(chatmessage, i){
    console.log("rendmessage");
    console.log(chatmessage);
    const props = {
      key: chatmessage.date,
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

  return (
    <div className="chat">
      <div className="header" >
        <span className="textspan">{currentChat.name}</span>
      </div>
      <div className="messagelist">
        {
          currentMessage.map((chatmessage, i) => (
          renderMessage(chatmessage, i)
        ))}
      </div>
      <div className="messagesend">
        <MessageInput send = {send } />
      </div>
    </div>
  );
};

Chat.propTypes = {
};

export default Chat;
