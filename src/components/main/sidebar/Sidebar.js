import React from 'react';
import styles from './Sidebar.css';
import { Form, Icon, Input, Button, Checkbox, message, Tooltip } from 'antd';

function Sidebar({user, logout}) {

  console.log("sidebar" + user);

  return (
    <div className="sidebar">
      <img src="//cdn.suisuijiang.com/fiora/./avatar/1.jpg" className="head" />
      <Button onClick={logout} className="logout" ghost={true}>
        <Icon type="poweroff"  style={{ fontSize: 30, color: '#08c' }} />
      </Button>
    </div>
  );
};


export default Sidebar;
