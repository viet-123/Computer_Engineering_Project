import axios from 'axios';
import {
    USER_CHANGE_FAIL,
    USER_CHANGE_REQUEST,
    USER_CHANGE_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
} from '../Constant/UserConstant';

export const login = (username, password) => async (dispatch) => {
<<<<<<< HEAD
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
=======
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
                  `/api/auth/login`,
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
                  `/api/auth/signup`,
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
>>>>>>> fb2f264fef93c07cbab608d9383571c6faaa836b
};

export const logout = () => async (dispatch) => {
    localStorage.removeItem('USER');
    dispatch({ type: USER_LOGOUT });
    window.location.href = '/';
};

export const changepassword =
<<<<<<< HEAD
    (currentPassword, password, confirmPassword) => async (dispatch, getState) => {
        try {
            dispatch({
                type: USER_CHANGE_REQUEST,
            });
            const {
                userLogin: { user },
            } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            };
            const res = await axios.post(
                `http://localhost:8000/api/me/change_password`,
                {
                    currentPassword,
                    password,
                    confirmPassword,
                },
                config,
            );
            dispatch({
                type: USER_CHANGE_SUCCESS,
                payload: res.data,
            });
        } catch (error) {
            dispatch({
                type: USER_CHANGE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const getUserList = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        });
        const {
            userLogin: { user },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
        };
        const res = await axios.get(`http://localhost:8000/api/user`, config);
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
=======
      (currentPassword, password, confirmPassword) => async (dispatch, getState) => {
            try {
                  dispatch({
                        type: USER_CHANGE_REQUEST,
                  });
                  const {
                        userLogin: { user },
                  } = getState();
                  const config = {
                        headers: {
                              Authorization: `Bearer ${user.token}`,
                              'Content-Type': 'application/json',
                        },
                  };
                  const res = await axios.post(
                        `/api/me/change_password`,
                        {
                              currentPassword,
                              password,
                              confirmPassword,
                        },
                        config,
                  );
                  dispatch({
                        type: USER_CHANGE_SUCCESS,
                        payload: res.data,
                  });
            } catch (error) {
                  dispatch({
                        type: USER_CHANGE_FAIL,
                        payload:
                              error.response && error.response.data.message
                                    ? error.response.data.message
                                    : error.message,
                  });
            }
      };
>>>>>>> fb2f264fef93c07cbab608d9383571c6faaa836b
