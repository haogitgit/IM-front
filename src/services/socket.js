import io from "socket.io-client";

let socket;

export function connect(accountId) {
  socket = io.connect("http://127.0.0.1:8081?clientid="+accountId);
}

export function disconnect() {
  socket.disconnect();
}

export function emit(event, values) {
  socket.emit(event, values);
}

export function on(event, func) {
  socket.on(event, func);
}
