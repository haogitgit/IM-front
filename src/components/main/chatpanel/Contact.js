
import React from 'react';
import styles from './Contact.css';
import LinkMan from "./LinkMan";

function Contact({ contactList, handChat, currentChat, chatMessage, unRead, onlineState }){

  //time, , preview, unread,
  function renderLinkman(linkman, i) {
    const props = {
      name: linkman.name,
      handChat: () => handChat({ item: linkman }),
      isOnline: onlineState.get(linkman.accountId),
    };
    const num = unRead.get(linkman.accountId);
    if (num != null && num !== undefined){
      props.unread = num;
    } else {
      props.unread = 0;
    }
    if (currentChat !== null && currentChat !== undefined && currentChat.accountId === linkman.accountId){
      props.focus = true;
    } else {
      props.focus = false;
    }
    if (chatMessage !== null && chatMessage !== undefined){
      let chat = chatMessage.get(linkman.accountId);
      if (chat !== null && chat !== undefined){
        chat = chat.slice(0);
        let msg = chat.pop();
        if (msg !== null && msg !== undefined){
          props.preview = msg.msgContent;
          props.time = msg.date;
        }else{
          props.preview = '暂无消息';
        }
      }else{
        props.preview = '暂无消息';
      }
    }else{
      props.preview = '暂无消息';
    }
    console.log(props);
    return (
      <LinkMan {...props} key={i} />
    );
  }

  return (
    <div className="contact">
    {/*<List*/}
      {/*itemLayout="horizontal"*/}
      {/*dataSource={contactList}*/}
      {/*renderItem={item => (*/}
        {/*<List.Item actions={[*/}
          {/*<Button icon="message" className="chatButton" ghost={true} onClick={()=>handChat({item})}>*/}
          {/*</Button>]}>*/}
          {/*<List.Item.Meta*/}
            {/*avatar={<Avatar src="//cdn.suisuijiang.com/fiora/avatar/3.jpg" />}*/}
            {/*title={item.name}*/}
            {/*description="hahahahah"*/}
          {/*/>*/}
        {/*</List.Item>*/}
      {/*)}*/}
    {/*/>*/}
      {
        contactList.map((linkman, i) => (
          renderLinkman(linkman, i)
        ))
      }
    </div>
  );
};

export default Contact;
