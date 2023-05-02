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
    USER_ADDED_FAIL,
    USER_ADDED_REQUEST,
    USER_ADDED_SUCCESS,
    USER_EDITED_FAIL,
    USER_EDITED_REQUEST,
    USER_EDITED_SUCCESS,
    USER_DELETED_FAIL,
    USER_DELETED_REQUEST,
    USER_DELETED_SUCCESS,
    USER_INFO_UPDATED_FAIL,
    USER_INFO_UPDATED_REQUEST,
    USER_INFO_UPDATED_SUCCESS,
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

export const updateInfo = (fullName) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_INFO_UPDATED_REQUEST,
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
        const res = await axios.patch(
            `http://localhost:8000/api/user/${user.data.user._id}`,
            {
                fullName,
            },
            config,
        );

        user.data.user.fullName = res.data.data.data.fullName;
        dispatch({
            type: USER_INFO_UPDATED_SUCCESS,
            payload: user,
        });
    } catch (error) {
        dispatch({
            type: USER_INFO_UPDATED_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const changepassword =
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

export const addUser =
    (fullName, username, password, confirmPassword, buildings) => async (dispatch, getState) => {
        try {
            dispatch({
                type: USER_ADDED_REQUEST,
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
                `http://localhost:8000/api/user`,
                {
                    fullName,
                    username,
                    password,
                    confirmPassword,
                    buildings,
                },
                config,
            );
            dispatch({
                type: USER_ADDED_SUCCESS,
                payload: res.data,
            });
        } catch (error) {
            dispatch({
                type: USER_ADDED_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const editUser = (id, fullName, buildings) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_EDITED_REQUEST,
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
        const res = await axios.patch(
            `http://localhost:8000/api/user/${id}`,
            {
                fullName,
                buildings,
            },
            config,
        );
        dispatch({
            type: USER_EDITED_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: USER_EDITED_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETED_REQUEST,
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
        const res = await axios.delete(`http://localhost:8000/api/user/${userId}`, config);
        dispatch({
            type: USER_DELETED_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: USER_DELETED_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
