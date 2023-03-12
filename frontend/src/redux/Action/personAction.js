import {
    PERSON_DETAILS_FAIL,
    PERSON_DETAILS_REQUEST,
    PERSON_DETAILS_SUCCESS,
    PERSON_REGISTER_FAIL,
    PERSON_REGISTER_REQUEST,
    PERSON_REGISTER_SUCCESS,
    PERSON_DELETED_FAIL,
    PERSON_DELETED_REQUEST,
    PERSON_DELETED_SUCCESS,
    PERSON_ADDED_FAIL,
    PERSON_ADDED_REQUEST,
    PERSON_ADDED_SUCCESS,
} from '../Constant/personConstant';
import axios from 'axios';
export const getAllPeople = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PERSON_DETAILS_REQUEST,
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
        const res = await axios.get(`http://localhost:8000/api/person`, config);
        dispatch({
            type: PERSON_DETAILS_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: PERSON_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const personRegister = (firstName, lastName) => async (dispatch) => {
    try {
        dispatch({
            type: PERSON_REGISTER_REQUEST,
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await axios.post(
            `http://localhost:8000/api/person`,
            {
                firstName,
                lastName,
            },
            config,
        );
        dispatch({
            type: PERSON_REGISTER_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: PERSON_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deletePerson = (personId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PERSON_DELETED_REQUEST,
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
        const res = await axios.delete(`http://localhost:8000/api/person/${personId}`, config);
        dispatch({
            type: PERSON_DELETED_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: PERSON_DELETED_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const addPerson = (firstName, lastName) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PERSON_ADDED_REQUEST,
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
            `http://localhost:8000/api/person`,
            {
                firstName,
                lastName,
            },
            config,
        );
        dispatch({
            type: PERSON_ADDED_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: PERSON_ADDED_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
