import React, { Component } from 'react';
import Chat from './chatpanel/Chat';
import Feature from './chatpanel/Feature';
import Sidebar from './sidebar/Sidebar';
import './Main.css';
import { connect } from 'dva';

function Main({dispatch, user, isLogin, contactList, currentChat, chatMessage, currentMessage, unRead, onlineState }) {

  const sidebarProps = {user, isLogin, logout, infoHandler };

  const featureProps = { contactList, handChat, currentChat, chatMessage, unRead, onlineState };

  const chatProps = { currentChat, chatMessage, send, currentMessage, user, deleteContact, remarkHandler };

  console.log("maincurrentMessage" + currentMessage);
  console.log(currentMessage);
  function logout() {
    dispatch({
      type: 'login/logout',
    });
  }

  function remarkHandler(values) {
    dispatch({
      type: 'main/remarkHandler',
      payload: values,
    });
  }

  function infoHandler(values) {
    dispatch({
      type: 'main/infoHandler',
      payload: values,
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
  const { contactList, currentChat, chatMessage, currentMessage, unRead, onlineState } = state.main;
  return {
    user,
    isLogin,
    contactList,
    currentChat,
    chatMessage,
    currentMessage,
    unRead,
    onlineState,
  };
}

export default connect(mapStateToProps)(Main);
