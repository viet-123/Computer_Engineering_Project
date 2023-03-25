import {
    CAMERA_DETAILS_FAIL,
    CAMERA_DETAILS_REQUEST,
    CAMERA_DETAILS_SUCCESS,
    CAMERA_DELETED_FAIL,
    CAMERA_DELETED_REQUEST,
    CAMERA_DELETED_SUCCESS,
    CAMERA_ADDED_FAIL,
    CAMERA_ADDED_REQUEST,
    CAMERA_ADDED_SUCCESS,
    CAMERA_EDITED_FAIL,
    CAMERA_EDITED_REQUEST,
    CAMERA_EDITED_SUCCESS,
} from '../Constant/cameraConstant';
import axios from 'axios';

export const getAllCameras = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CAMERA_DETAILS_REQUEST,
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
        const res = await axios.get(`/api/camera`, config);
        dispatch({
            type: CAMERA_DETAILS_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: CAMERA_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteCamera = (cameraId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CAMERA_DELETED_REQUEST,
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
        const res = await axios.delete(`/api/camera/${cameraId}`, config);
        dispatch({
            type: CAMERA_DELETED_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: CAMERA_DELETED_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const addCamera = (ip, building, description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CAMERA_ADDED_REQUEST,
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
            `/api/camera`,
            {
                ip,
                building,
                description,
            },
            config,
        );
        dispatch({
            type: CAMERA_ADDED_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: CAMERA_ADDED_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editCamera = (id, ip, building, description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CAMERA_EDITED_REQUEST,
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
            `/api/camera/${id}`,
            {
                ip,
                building,
                description,
            },
            config,
        );
        dispatch({
            type: CAMERA_EDITED_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: CAMERA_EDITED_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
