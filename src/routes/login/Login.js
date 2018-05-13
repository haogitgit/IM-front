import React from 'react';
import { connect } from 'dva';
import styles from './Login.css';
import LoginComponent from '../../components/login/Login';

function Login() {
  return (
    <LoginComponent />
  );
}

export default connect()(Login);
