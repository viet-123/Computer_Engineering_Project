import axios from 'axios';
import {
      USER_LOGIN_FAIL,
      USER_LOGIN_REQUEST,
      USER_LOGIN_SUCCESS,
      USER_LOGOUT,
      USER_REGISTER_FAIL,
      USER_REGISTER_REQUEST,
      USER_REGISTER_SUCCESS,
} from '../Constant/UserConstant';

export const login = (username, password) => async (dispatch) => {
      try {
            dispatch({
                  type: USER_LOGIN_REQUEST,
            });
            const config = {
                  headers: {
                        'Content-Type': 'application/json',
                  },
            };
            const res = await axios.post(
                  `http://localhost:8000/api/auth/login`,
                  {
                        username,
                        password,
                  },
                  config,
            );
            dispatch({
                  type: USER_LOGIN_SUCCESS,
                  payload: res.data,
            });
      } catch (error) {
            dispatch({
                  type: USER_LOGIN_FAIL,
                  payload:
                        error.response && error.response.data.message
                              ? error.response.data.message
                              : error.message,
            });
      }
};

export const register = (username, password, confirmPassword) => async (dispatch) => {
      try {
            dispatch({
                  type: USER_REGISTER_REQUEST,
            });
            const config = {
                  headers: {
                        'Content-Type': 'application/json',
                  },
            };
            const res = await axios.post(
                  `http://localhost:8000/api/auth/signup`,
                  {
                        username,
                        password,
                        confirmPassword,
                  },
                  config,
            );
            dispatch({
                  type: USER_REGISTER_SUCCESS,
                  payload: res.data,
            });
      } catch (error) {
            dispatch({
                  type: USER_REGISTER_FAIL,
                  payload:
                        error.response && error.response.data.message
                              ? error.response.data.message
                              : error.message,
            });
      }
};

export const logout = () => async (dispatch) => {
      localStorage.removeItem('USER');
      dispatch({ type: USER_LOGOUT });
      window.location.href = '/';
};
