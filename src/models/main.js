import { routerRedux } from "dva/router";

export default {

  namespace: 'main',

  state: {

  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/main') {
          console.log("main sub");
          dispatch({
            type: 'main/isLogin',
          });
        }
      });
      }
    },

  effects: {
    *isLogin({}, { put, select }){
      const { isLogin } = yield select(state => state.login);
      console.log("main model" + isLogin);
      if (isLogin === undefined || isLogin === false) {
        console.log("not login");
        yield put(routerRedux.push("/"));
      }else{
        //获取好友列表

      }
    }

  },

  reducers: {

  },

};
