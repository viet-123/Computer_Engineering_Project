import {
      TURN_DETAILS_FAIL,
      TURN_DETAILS_REQUEST,
      TURN_DETAILS_SUCCESS,
} from '../Constant/TurnConstant';

export const listturnReducer = (state = {}, action) => {
      switch (action.type) {
            case TURN_DETAILS_REQUEST:
                  return { user: null, loading: true };
            case TURN_DETAILS_SUCCESS:
                  return { user: action.payload, loading: true };
            case TURN_DETAILS_FAIL:
                  return { user: null, error: true };
            default:
                  return state;
      }
};
