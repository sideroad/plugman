const GETS_START = 'plug/GETS';
const GETS_SUCCESS = 'plug/GETS_SUCCESS';
const GETS_FAIL = 'plug/GETS_FAIL';
const ADD_START = 'plug/SAVE';
const ADD_SUCCESS = 'plug/ADD_SUCCESS';
const ADD_FAIL = 'plug/ADD_FAIL';
const UPDATE_START = 'plug/UPDATE';
const UPDATE_SUCCESS = 'plug/UPDATE_SUCCESS';
const UPDATE_FAIL = 'plug/UPDATE_FAIL';
const DELETE_START = 'plug/DELETE';
const DELETE_SUCCESS = 'plug/DELETE_SUCCESS';
const DELETE_FAIL = 'plug/DELETE_FAIL';

const CHANGE = 'plug/CHANGE';
const EDITING = 'plug/EDITING';
const CANCEL = 'plug/CANCEL';

const initialState = {
  items: [],
  loaded: false,
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
        loaded: true,
        items: action.res.body.items,
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
    case ADD_START:
      return {
        ...state,
        loading: true
      };
    case ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: false,
        editing: false,
        err: undefined,
      };
    case ADD_FAIL:
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
        loaded: false,
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
        loaded: false,
        editing: false,
        err: undefined,
      };
    case DELETE_FAIL:
      return {
        ...state,
        err: action.body
      };
    case CHANGE:
      return {
        ...state,
        items: state.items.map(item => (
          item.id === action.plug.id ? {
            ...item,
            ...action.plug,
          } : item)
        )
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

export function change(plug) {
  return {
    type: CHANGE,
    plug,
  };
}

export function cancel() {
  return {
    type: CANCEL
  };
}
