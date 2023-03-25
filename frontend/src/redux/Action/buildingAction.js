import {
    BUILDING_DETAILS_FAIL,
    BUILDING_DETAILS_REQUEST,
    BUILDING_DETAILS_SUCCESS,
    BUILDING_DELETED_FAIL,
    BUILDING_DELETED_REQUEST,
    BUILDING_DELETED_SUCCESS,
    BUILDING_ADDED_FAIL,
    BUILDING_ADDED_REQUEST,
    BUILDING_ADDED_SUCCESS,
    BUILDING_EDITED_FAIL,
    BUILDING_EDITED_REQUEST,
    BUILDING_EDITED_SUCCESS,
} from '../Constant/buildingConstant';
import axios from 'axios';

export const getAllBuildings = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: BUILDING_DETAILS_REQUEST,
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
        const res = await axios.get(`/api/building`, config);
        dispatch({
            type: BUILDING_DETAILS_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: BUILDING_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteBuilding = (buildingId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BUILDING_DELETED_REQUEST,
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
        const res = await axios.delete(`/api/building/${buildingId}`, config);
        dispatch({
            type: BUILDING_DELETED_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: BUILDING_DELETED_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const addBuilding = (name, description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BUILDING_ADDED_REQUEST,
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
            `/api/building`,
            {
                name,
                description,
            },
            config,
        );
        dispatch({
            type: BUILDING_ADDED_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: BUILDING_ADDED_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editBuilding = (id, name, description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BUILDING_EDITED_REQUEST,
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
            `/api/building/${id}`,
            {
                name,
                description,
            },
            config,
        );
        dispatch({
            type: BUILDING_EDITED_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: BUILDING_EDITED_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
