/* eslint-disable */
import React from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import styles from './Contact.css';
import { Form, Avatar, List, Button, Icon, message, Tooltip } from 'antd';
import {Modal} from "antd/lib/index";
const FormItem = Form.Item;

function Contact({contactList, handChat }) {

  return (
    <div className="contact">
    <List
      itemLayout="horizontal"
      dataSource={contactList}
      renderItem={item => (
        <List.Item actions={[
          <Button icon="message" className="chatButton" ghost={true} onClick={()=>handChat({item})}>
          </Button>]}>
          <List.Item.Meta
            avatar={<Avatar src="//cdn.suisuijiang.com/fiora/avatar/3.jpg" />}
            title={item.name}
            description="hahahahah"
          />
        </List.Item>
      )}
    />
    </div>
  );
};

export default connect()(Contact);
