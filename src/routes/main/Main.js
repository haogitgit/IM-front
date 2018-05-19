import React from 'react';
import { connect } from 'dva';
import MainComponent from '../../components/main/Main';

function Main() {
  return (
      <MainComponent />
  );
}

export default connect()(Main);
