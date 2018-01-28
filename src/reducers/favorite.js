const GETS_START = 'favorite/GETS';
const GETS_SUCCESS = 'favorite/GETS_SUCCESS';
const GETS_FAIL = 'favorite/GETS_FAIL';
const ADD_START = 'favorite/SAVE';
const ADD_SUCCESS = 'favorite/ADD_SUCCESS';
const ADD_FAIL = 'favorite/ADD_FAIL';
const UPDATE_START = 'favorite/UPDATE';
const UPDATE_SUCCESS = 'favorite/UPDATE_SUCCESS';
const UPDATE_FAIL = 'favorite/UPDATE_FAIL';
const DELETE_START = 'favorite/DELETE';
const DELETE_SUCCESS = 'favorite/DELETE_SUCCESS';
const DELETE_FAIL = 'favorite/DELETE_FAIL';

const CHANGE = 'favorite/CHANGE';
const EDITING = 'favorite/EDITING';
const CANCEL = 'favorite/CANCEL';

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
          item.id === action.favorite.id ? {
            ...item,
            ...action.favorite,
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

export function change(favorite) {
  return {
    type: CHANGE,
    favorite,
  };
}

export function cancel() {
  return {
    type: CANCEL
  };
}
