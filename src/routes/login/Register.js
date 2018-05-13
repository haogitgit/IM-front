import React from 'react';
import { connect } from 'dva';
import styles from './Login.css';
import RegisterComponent from '../../components/login/Register';

function Register() {
  return (
    <RegisterComponent />
  );
}

export default connect()(Register);
