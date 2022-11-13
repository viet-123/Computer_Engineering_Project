import {
      USER_LOGIN_REQUEST,
      USER_LOGIN_SUCCESS,
      USER_LOGIN_FAIL,
      USER_REGISTER_REQUEST,
      USER_REGISTER_SUCCESS,
      USER_REGISTER_FAIL,
} from '../Constant/UserConstant';

export const userLoginReducer = (state = {}, action) => {
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

export const userRegisterReducer = (state = {}, action) => {
      switch (action.type) {
            case USER_REGISTER_REQUEST:
                  return { user: null, loading: true, isfetching: false };
            case USER_REGISTER_SUCCESS:
                  return { user: action.payload, loading: true, isfetching: true };
            case USER_REGISTER_FAIL:
                  return { user: null, error: action.payload, isfetching: true, loading: true };
            default:
                  return state;
      }
};
