import React from 'react';
import styles from './LinkMan.css';
import { Avatar, } from 'antd';

function LinkMan({ time, name, preview, unread, focus, handChat, isOnline }) {

  return (
    <div className={`module-main-feature-linkman${focus ? '-focus' : ''}`} onClick={handChat}>
      <Avatar src="//cdn.suisuijiang.com/fiora/avatar/3.jpg" size={60} />
      <div className={`online${isOnline ? '-on' : '-off'}`}></div>
      <div className="top-bottom">
        <div className="name-time">
          <span className="name">{name}</span>
          <span className="chattime">{time}</span>
        </div>
        <div className="preview-unread">
          <div className="previewdiv">{preview}</div>
          {
            unread > 0 ? <div className="unreaddiv">{unread}</div> : null
          }
        </div>
      </div>
    </div>
  );
};


export default LinkMan;
