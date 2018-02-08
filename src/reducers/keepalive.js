const GET_START = 'keepalive/GET_START';
const GET_SUCCESS = 'keepalive/GET_SUCCESS';
const GET_FAIL = 'keepalive/GET_FAIL';

const UPDATE_START = 'keepalive/UPDATE_START';
const UPDATE_SUCCESS = 'keepalive/UPDATE_SUCCESS';
const UPDATE_FAIL = 'keepalive/UPDATE_FAIL';

const initialState = {
  item: {
    message: 'KEEPALIVE',
    interval: 5000,
    enabled: false
  },
  loaded: false,
  loading: false
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_START:
      return {
        ...state,
        loading: true
      };
    case GET_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        item: action.body
      };
    case GET_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.err
      };

    case UPDATE_START:
      return {
        ...state,
        loading: true
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: false,
        editing: false,
        err: undefined
      };
    case UPDATE_FAIL:
      return {
        ...state,
        err: action.body
      };
    default:
      return state;
  }
}
