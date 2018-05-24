import { routerRedux } from "dva/router";
import * as mainService from '../services/main';
import {message, Modal} from "antd/lib/index";
import * as socketService from '../services/socket';
import * as util from '../utils/util';

export default {

  namespace: 'main',

  state: {
    contactList: [],
    currentChat: {},
    chatMessage: new Map(),
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
      const data = yield call(mainService.fetch, { "accountId": user.accountId });
      if (data.status === 0) {
        // window.location = "/#/";
        yield put({
          type: 'save',
          payload: {
            contactList: data.data,
          },
        });
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
        // console.log("not login");
        // yield put(routerRedux.push("/"));
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
      console.log(item);
      const accountId = item.accountId;
      console.log("accountId");
      console.log(accountId);
      let { chatMessage } = yield select(state => state.main);

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
      const {  currentMessage, chatMessage } = yield select(state => state.main);
      console.log("currentMessage");
      console.log(currentMessage);
      let chat;
      if (sourceClientId === user.accountId){
        chat = currentMessage;
      } else {
        chat = chatMessage.get(sourceClientId);
      }
      chat.push(data);
      chat = chat.slice(0)
      yield put({
        type: 'saveCurrentMessage',
        payload: {
          currentMessage: chat,
        },
      });
      console.log("chatMessage");
      console.log(chatMessage);
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
  },

};

