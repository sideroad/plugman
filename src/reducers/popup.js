const RESET = 'popup/RESET';

const CONNECT = 'ws/CONNECT';
const DISCONNECT = 'ws/DISCONNECT';

const initialState = {
  messages: [],
  status: 'none',
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CONNECT:
      return {
        ...state,
        messages: ['WebSocket has been connected'],
        status: 'success',
      };
    case DISCONNECT:
      return {
        ...state,
        messages: ['WebSocket has been disconnected.'],
        status: 'error',
      };
    case RESET:
      return {
        ...state,
        messages: [],
        status: 'none',
      };
    default:
      return state;
  }
}

export function reset() {
  return {
    type: RESET,
  };
}
