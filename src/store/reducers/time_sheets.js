import {
  FETCH_TIME_SHEETS_STARTED,
  FETCH_TIME_SHEETS_SUCCESS,
  FETCH_TIME_SHEETS_ERROR
} from "../actionTypes";

const initialState = {
  time_sheets: [],
  requesting: false,
};

export default function(state = initialState, action) {
  switch (action.type) {

    case FETCH_TIME_SHEETS_STARTED: {
      return {
        ...state,
        requesting: true
      };
    }

    case FETCH_TIME_SHEETS_SUCCESS: {
      return {
        ...state,
        requesting: false,
        time_sheets: action.payload.time_sheets
      };
    }

    case FETCH_TIME_SHEETS_ERROR: {
      return {
        ...state,
        requesting: false,
      };
    }

    default:
      return state;
  }
}
