import React from 'react';
import styles from './Message.css';
import { Avatar, } from 'antd';

function Message({ isSelf, nickname, date, content }) {

  return (
    <div className={`chat-message${isSelf ? '-self' : ''} `}>
      <Avatar className={`avatar${isSelf ? '-self' : ''} `} src="//cdn.suisuijiang.com/fiora/avatar/3.jpg" size={55}  />
      <div className={`right${isSelf ? '-self' : ''} `}>
        <div className={`nickname-time${isSelf ? '-self' : ''} `}>
          <span className={`nickname${isSelf ? '-self' : ''} `}>{nickname}</span>
          <span className={`time${isSelf ? '-self' : ''} `}>{date}</span>
        </div>
        <div className={`content${isSelf ? '-self' : ''} `}>{content}</div>
        <div className={`arrow${isSelf ? '-self' : ''} `} />
      </div>
    </div>
  );
};


export default Message;
