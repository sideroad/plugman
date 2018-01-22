const GETS_START = 'message/GETS';
const GETS_SUCCESS = 'message/GETS_SUCCESS';
const GETS_FAIL = 'message/GETS_FAIL';
const SAVE_START = 'message/SAVE';
const SAVE_SUCCESS = 'message/SAVE_SUCCESS';
const SAVE_FAIL = 'message/SAVE_FAIL';
const UPDATE_START = 'message/UPDATE';
const UPDATE_SUCCESS = 'message/UPDATE_SUCCESS';
const UPDATE_FAIL = 'message/UPDATE_FAIL';
const DELETE_START = 'message/DELETE';
const DELETE_SUCCESS = 'message/DELETE_SUCCESS';
const DELETE_FAIL = 'message/DELETE_FAIL';

const EDITING = 'message/EDITING';
const CANCEL = 'message/CANCEL';

const initialState = {
  items: [],
  err: undefined
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GETS_START:
      return {
        ...state,
        loading: true
      };
    case GETS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.res.body.items,
      };
    case GETS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case EDITING:
      return {
        ...state,
        editing: true
      };
    case CANCEL:
      return {
        ...state,
        editing: false
      };
    case SAVE_START:
      return {
        ...state,
        loading: true
      };
    case SAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        editing: false,
        err: undefined,
      };
    case SAVE_FAIL:
      return {
        ...state,
        err: action.body,
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
        editing: false,
        err: undefined,
      };
    case UPDATE_FAIL:
      return {
        ...state,
        err: action.body,
      };
    case DELETE_START:
      return {
        ...state,
        loading: true
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        editing: false,
        err: undefined,
      };
    case DELETE_FAIL:
      return {
        ...state,
        err: action.body
      };
    default:
      return state;
  }
}

export function add() {
  return {
    type: EDITING
  };
}

export function cancel() {
  return {
    type: CANCEL
  };
}
