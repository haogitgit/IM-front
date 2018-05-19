import { routerRedux } from "dva/router";

export default {

  namespace: 'main',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      history.listen((location) => {
        if (location.pathname === '/main') {
          var isLogin = select(state => state.login.isLogin);
          console.log(isLogin);
          if (!isLogin){
             put(routerRedux.push("/"));
          }
        }
        }
      });
  }

  effects: {

  }

  reducers: {

  }
};
