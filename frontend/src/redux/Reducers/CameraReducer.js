import {
    CAMERA_DETAILS_FAIL,
    CAMERA_DETAILS_REQUEST,
    CAMERA_DETAILS_SUCCESS,
    CAMERA_EDITED_FAIL,
    CAMERA_EDITED_REQUEST,
    CAMERA_EDITED_SUCCESS,
    CAMERA_DELETED_FAIL,
    CAMERA_DELETED_REQUEST,
    CAMERA_DELETED_SUCCESS,
    CAMERA_ADDED_FAIL,
    CAMERA_ADDED_REQUEST,
    CAMERA_ADDED_SUCCESS,
} from '../Constant/cameraConstant';

export const cameraListReducer = (state = {}, action) => {
    switch (action.type) {
        case CAMERA_DETAILS_REQUEST:
            return { cameras: null, loading: false };
        case CAMERA_DETAILS_SUCCESS:
            return { cameras: action.payload, loading: true, error: false };
        case CAMERA_DETAILS_FAIL:
            return { cameras: null, error: true };
        default:
            return state;
    }
};

export const cameraDeletedReducer = (state = {}, action) => {
    switch (action.type) {
        case CAMERA_DELETED_REQUEST:
            return { camera: null, isfetching: false };
        case CAMERA_DELETED_SUCCESS:
            return { camera: action.payload, isfetching: true };
        case CAMERA_DELETED_FAIL:
            return { camera: null, error: action.payload, isfetching: true };
        default:
            return state;
    }
};

export const cameraAddedReducer = (state = {}, action) => {
    switch (action.type) {
        case CAMERA_ADDED_REQUEST:
            return { camera: null, isfetching: false };
        case CAMERA_ADDED_SUCCESS:
            return { camera: action.payload, isfetching: true };
        case CAMERA_ADDED_FAIL:
            return { camera: null, error: action.payload, isfetching: true };
        default:
            return state;
    }
};

export const cameraEditedReducer = (state = {}, action) => {
    switch (action.type) {
        case CAMERA_EDITED_REQUEST:
            return { camera: null, isfetching: false };
        case CAMERA_EDITED_SUCCESS:
            return { camera: action.payload, isfetching: true };
        case CAMERA_EDITED_FAIL:
            return { camera: null, error: action.payload, isfetching: true };
        default:
            return state;
    }
};
