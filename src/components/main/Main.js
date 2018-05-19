import React, { Component } from 'react';
import Chat from './chatpanel/Chat';
import Feature from './chatpanel/Feature';
import Sidebar from './sidebar/Sidebar';
import './Main.css';
import { connect } from 'dva';

function Main({dispatch, user, isLogin }) {

  const props = {user, isLogin, logout};

  console.log("main" + user);

  function logout() {
    dispatch({
      type: 'login/logout',
    });
  }

  return (
    <div className="module-main">
        <Sidebar {...props} />
        <Feature />
        <Chat />
    </div>
  );

}

function mapStateToProps(state) {
  const { user, isLogin } = state.login;
  return {
    user,
    isLogin,
  };
}

export default connect(mapStateToProps)(Main);
