import React, { Component } from 'react';
import Chat from './chatpanel/Chat';
import Feature from './chatpanel/Feature';
import Sidebar from './sidebar/Sidebar';
import './Main.css';
import { connect } from 'dva';

function Main({dispatch, user, isLogin, contactList, currentChat, chatMessage, currentMessage, unRead }) {

  const sidebarProps = {user, isLogin, logout };

  const featureProps = { contactList, handChat, currentChat, chatMessage, unRead };

  const chatProps = { currentChat, chatMessage, send, currentMessage, user, deleteContact };

  console.log("maincurrentMessage" + currentMessage);
  console.log(currentMessage);
  function logout() {
    dispatch({
      type: 'login/logout',
    });
  }

  function handChat({ item }) {
    console.log(item);
    console.log("item"+item.accountId);
    dispatch({
      type: 'main/changeCurrentChat',
      payload: item,
    });
    // console.log("currentchat" + currentChat.accountId);
  }

  function send({ message }) {
    console.log("main com" + message);
    dispatch(
      {
        type: 'main/send',
        payload: {
          message: message,
        },
      },
    );
  }

  function deleteContact() {
    // console.log("main com" + message);
    dispatch(
      {
        type: 'main/deleteContact',
      },
    );
  }

  return (
    <div className="module-main">
        <Sidebar {...sidebarProps} />
        <Feature {...featureProps} />
        <Chat {...chatProps} />
    </div>
  );

}

function mapStateToProps(state) {
  const { user, isLogin } = state.login;
  const { contactList, currentChat, chatMessage, currentMessage, unRead } = state.main;
  return {
    user,
    isLogin,
    contactList,
    currentChat,
    chatMessage,
    currentMessage,
    unRead,
  };
}

export default connect(mapStateToProps)(Main);
