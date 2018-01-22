const RESET = 'ws/RESET';
const CONNECT = 'ws/CONNECT';
const DISCONNECT = 'ws/DISCONNECT';

const initialState = {
  sockets: [],
  connected: false,
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESET:
      return {
        ...state,
        sockets: [],
        connected: false,
      };
    case CONNECT:
      return {
        ...state,
        sockets: state.sockets.concat([action.ws]),
        connected: true,
      };
    case DISCONNECT:
      return {
        ...state,
        sockets: state.sockets.filter(socket => socket.id !== action.ws.id),
        connected: false
      };
    default:
      return state;
  }
}

export function connect(ws) {
  return {
    type: CONNECT,
    ws,
  };
}

export function disconnect(ws) {
  return {
    type: DISCONNECT,
    ws,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}
