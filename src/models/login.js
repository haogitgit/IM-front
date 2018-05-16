import * as loginService from '../services/login';
import { message, Modal } from "antd";
import { routerRedux } from "dva/router";

export default {

  namespace: 'login',

  state: {
    isLogin: undefined,
    user: {},
  },

  subscriptions: {

  },

  effects: {
    *login({ payload: values }, { call, put }) {
      console.log("loginmodel:" + values);
      const data = yield call(loginService.login, values);
      console.log(data);
      console.log(data.status);
      if (data.status === 0) {
        message.success("登陆成功！");
        // window.location = "/#/";
        yield put({ type: 'save', payload: {user: data.data, isLogin: true } });
        yield put(routerRedux.push("/"));
      } else {
        Modal.error({
          content: "账号或密码错误！",
        });
        yield put({ type: 'save', payload: {isLogin: false } });
      }
    },
  },

  reducers: {
    save(state, { payload: { user, isLogin } }) {
      return { ...state, isLogin, user };
    },
  },

};
