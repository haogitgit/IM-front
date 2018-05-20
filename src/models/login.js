import * as loginService from '../services/login';
import { message, Modal } from "antd";
import { routerRedux } from "dva/router";
import io from "socket.io-client";

var socket;

export default {

  namespace: 'login',

  state: {
    isLogin: false,
    user: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      history.listen((location) => {
        if (location.pathname === '/login') {
          console.log("login sub");
        }
      });
    }

  },

  effects: {

    *login({ payload: values }, { call, put, select }) {
      console.log("loginmodel:" + values);
      const data = yield call(loginService.login, values);
      console.log(data);
      console.log(data.status);
      // const { user } = yield select(state => state.login);
      if (data.status === 0) {
        message.success("登陆成功！");
        socket = io.connect("http://127.0.0.1:8081?clientid="+data.data.accountId);
        // window.location = "/#/";
        yield put({ type: 'save', payload: {user: data.data, isLogin: true } });
        yield put(routerRedux.push("/main"));
      } else {
        Modal.error({
          content: "账号或密码错误！",
        });
        yield put({ type: 'save', payload: {isLogin: false } });
      }
    },
    *logout({}, { call, put, select }) {
      const { user } = yield select(state => state.login);
      console.log("loginmodel:" + user.accountId);
      const data = yield call(loginService.logout, user.accountId);
      console.log(data);
      console.log(data.status);
      if (data.status === 0) {
        message.success("登出成功！");
        socket.disconnect();
        // window.location = "/#/";
        yield put({ type: 'save', payload: {user: null, isLogin: false } });
        yield put(routerRedux.push("/"));
      } else {
        Modal.error({
          content: "网络错误！",
        });
      }
    },
  },

  reducers: {
    save(state, { payload: { user, isLogin } }) {
      return { ...state, isLogin, user };
    },
  },

};
