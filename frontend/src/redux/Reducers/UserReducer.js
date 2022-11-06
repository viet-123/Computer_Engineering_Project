import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../Constant/UserConstant';

export const userReducer = (state = { user: null }, action) => {
      switch (action.type) {
            case USER_LOGIN_REQUEST:
                  return { user: null, loading: true };
            case USER_LOGIN_SUCCESS:
                  localStorage.setItem('USER', JSON.stringify(action.payload));
                  return { user: action.payload, loading: true };
            case USER_LOGIN_FAIL:
                  return { user: null, error: true };
            default:
                  return state;
      }
};
