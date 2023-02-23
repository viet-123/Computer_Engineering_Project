import {
      PERSON_DETAILS_FAIL,
      PERSON_DETAILS_REQUEST,
      PERSON_DETAILS_SUCCESS,
} from '../Constant/personConstant';

export const listPeopleReducer = (state = {}, action) => {
      switch (action.type) {
            case PERSON_DETAILS_REQUEST:
                  return { people: null, loading: false };
            case PERSON_DETAILS_SUCCESS:
                  return { people: action.payload, loading: true, error: false };
            case PERSON_DETAILS_FAIL:
                  return { people: null, error: true };
            default:
                  return state;
      }
};
