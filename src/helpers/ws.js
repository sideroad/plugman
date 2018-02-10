import uuid from 'uuid-base62';

export default function wsFn(url) {
  const WebSocket = window.WebSocket || window.MozWebsocket;
  if (!WebSocket) {
    console.log('WebSocket is not defined');
    return null;
  }
  const ws = new WebSocket(url);
  ws.id = uuid.v4();
  return ws;
}
