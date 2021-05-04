import * as actions from "./ActionType";
const initialState = {
  getData: [],
  loading: false,
  error: null,
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.GET_SUCCESS:
      return {
        ...state,
        loading: false,
        getData: action.payload,
      };
    case actions.GET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
