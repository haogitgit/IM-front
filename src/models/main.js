/* eslint-disable */
import { routerRedux } from "dva/router";
import * as mainService from '../services/main';
import {message, Modal} from "antd/lib/index";
import * as socketService from '../services/socket';
import * as util from '../utils/util';
import * as loginService from "../services/login";

export default {

  namespace: 'main',

  state: {
    contactList: [],
    currentChat: {},
    chatMessage: new Map(),
    unRead: new Map(),
    currentMessage: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/main') {
          console.log("main sub");
          dispatch({
            type: 'isLogin',
          });
          const receive = function (data) {
            console.log(data);
            dispatch({
              type: 'receive',
              payload: data,
            });
          };
          const connect = function (data) {
            console.log("connect success");
          };
          socketService.on("connect", connect);
          socketService.on("messageevent", receive);
        }
      });
      }
    },

  effects: {
    *fetch({}, { call, put, select }) {
      console.log("main eff fetch");
      const { user } = yield select(state => state.login);
      const { currentChat } = yield select(state => state.main);
      const data = yield call(mainService.fetch, { "accountId": user.accountId });
      if (data.status === 0) {
        // window.location = "/#/";
        yield put({
          type: 'save',
          payload: {
            contactList: data.data,
          },
        });
        if (currentChat.accountId == null || currentChat.accountId === undefined) {
          let current = data.data[0];
          if (current != null && current !== undefined){
            yield put({
              type: 'changeCurrentChat',
              payload: current,
            });
          };
        }
      } else {
        Modal.error({
          content: "网络错误！",
        });
      }

    },
    *isLogin({}, { put, select }){
      const { isLogin } = yield select(state => state.login);
      console.log("main model" + isLogin);
      if (isLogin === undefined || isLogin === false) {
        console.log("not login");
        yield put(routerRedux.push("/"));
      }else{
        //获取好友列表
        yield put({
          type: 'fetch',
        });
      }
    },
    *send({ payload: values }, { call, put, select }) {
      console.log(values.message);
      const { user } = yield select(state => state.login);
      const sourceClientId = user.accountId;
      const { currentChat, chatMessage } = yield select(state => state.main);
      const targetClientId = currentChat.accountId;
      let jsonObject = {sourceClientId: sourceClientId,
        targetClientId: targetClientId,
        msgType: 'chat',
        msgContent: values.message,
        date: util.getNowFormatDate(),
      };
      console.log("send" + jsonObject);
      yield socketService.emit("messageevent", jsonObject);
    },
    *changeCurrentChat({ payload: item }, { call, put, select }) {
      yield put({
        type: 'saveCurrentChat',
        payload: {
          currentChat: item,
        },
      });
      console.log("changeCurrentChat");
      console.log(item);
      const accountId = item.accountId;
      console.log("accountId");
      console.log(accountId);
      const { chatMessage, unRead } = yield select(state => state.main);
      unRead.set(accountId, 0);
      let messageList = chatMessage.get(accountId);
      if (messageList != null && undefined !== messageList){
        yield put({
          type: 'saveCurrentMessage',
          payload: {
            currentMessage: messageList,
          },
        });
      } else {
        messageList = [];
        chatMessage.set(accountId, messageList);
        yield put({
          type: 'saveCurrentMessage',
          payload: {
            currentMessage: messageList,
          },
        });
      }
    },
    *receive({ payload: data }, { call, put, select }) {
      console.log("receive" + data);
      const { user } = yield select(state => state.login);
      const sourceClientId = data.sourceClientId;
      const targetClientId = data.targetClientId;
      const {  currentMessage, chatMessage, currentChat, unRead } = yield select(state => state.main);
      console.log("currentMessage");
      console.log(currentMessage);
      let chat;
      if (sourceClientId === user.accountId) {
        chat = chatMessage.get(targetClientId);
        if (chat == null || chat === undefined) {
          chat = [];
        }
        chat.push(data);
        chatMessage.set(targetClientId, chat);
      } else {
        chat = chatMessage.get(sourceClientId);
        if (chat == null || chat === undefined) {
          chat = [];
        }
        chat.push(data);
        chatMessage.set(sourceClientId, chat);
      }
      if (currentChat.accountId == sourceClientId || sourceClientId === user.accountId){
        chat = chat.slice(0)
        yield put({
          type: 'saveCurrentMessage',
          payload: {
            currentMessage: chat,
          },
        });
      }
      if (targetClientId === user.accountId) {
        if (sourceClientId !== currentChat.accountId) {
          let num = unRead.get(sourceClientId);
          if (num != null && num !== undefined) {
            num += 1;
          } else {
            num = 1;
          }
          unRead.set(sourceClientId, num);
          let numMap = new Map();
          for (let x of unRead) {
            numMap.set(x[0], x[1]);
          }
          yield put({
            type: 'saveUnRead',
            payload: {
              unRead: numMap,
            },
          });
        }
      }
      console.log("unRead");
      console.log(unRead);
    },
    *search({ payload: values }, { call, put, select }) {
      const contactAccountId = values.accountId;
      const { user } = yield select(state => state.login);
      const userAccountId = user.accountId;
      const data = yield call(mainService.searchContact, { "contactAccountId": contactAccountId, "userAccountId": userAccountId });
      if (data.status === 0) {
        // window.location = "/#/";
        Modal.success({
          content: data.msg,
        });
        yield put({
          type: 'fetch',
        });
      } else {
        Modal.error({
          content: data.msg,
        });
      }
    },
    *deleteContact({}, { call, put, select }) {
      const {  currentChat, chatMessage } = yield select(state => state.main);
      const contactAccountId = currentChat.accountId;
      chatMessage.set(contactAccountId, []);
      const { user } = yield select(state => state.login);
      const userAccountId = user.accountId;
      const data = yield call(mainService.deleteContact, { "contactAccountId": contactAccountId, "userAccountId": userAccountId });
      if (data.status === 0) {
        // window.location = "/#/";
        Modal.success({
          content: data.msg,
        });
        yield put({
          type: 'saveCurrentChat',
          payload: {
            currentChat: {},
          },
        });
        yield put({
          type: 'saveCurrentMessage',
          payload: {
            currentMessage: [],
          },
        });
        yield put({
          type: 'fetch',
        });
      } else {
        Modal.error({
          content: data.msg,
        });
      }
    },
    *remarkHandler({ payload: values }, { call, put, select }) {
      const {  currentChat } = yield select(state => state.main);
      values.contactAccountId = currentChat.accountId;
      const { user } = yield select(state => state.login);
      values.userAccountId = user.accountId;
      const data = yield call(mainService.updateRemark, values);
      console.log(data);
      console.log(data.status);
      // const { user } = yield select(state => state.login);
      if (data.status === 0) {
        message.success("添加备注成功！");
        yield put({
          type: 'fetch',
        });
      } else {
        Modal.error({
          content: data.msg,
        });
      }
    },
    *infoHandler({ payload: values }, { call, put, select }) {
      const data = yield call(mainService.updateInfo, values);
      console.log(data);
      console.log(data.status);
      if (data.status === 0) {
        message.success("修改资料成功！");
        yield put({
          type: 'login/save',
          payload: {
            user: data.data,
            isLogin: true,
          },
        });
      } else {
        Modal.error({
          content: data.msg,
        });
      }
    },
  },

  reducers: {
    save(state, { payload: { contactList } }) {
      return { ...state, contactList };
    },
    saveCurrentChat(state, { payload: { currentChat } }) {
      return { ...state, currentChat };
    },
    saveCurrentMessage(state, { payload: { currentMessage } }) {
      return { ...state, currentMessage };
    },
    saveChatMessage(state, { payload: { chatMessage } }) {
      return { ...state, chatMessage };
    },
    saveUnRead(state, { payload: { unRead } }) {
      return { ...state, unRead };
    },
  },

};
