import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
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
            localStorage.removeItem('USER');
            return { user: action.payload, loading: true, isfetching: true };
        case USER_REGISTER_FAIL:
            return { user: null, error: action.payload, isfetching: true, loading: true };
        default:
            return state;
    }
};

export const userInfoUpdatedReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_INFO_UPDATED_REQUEST:
            return { user: null, fetched: false };
        case USER_INFO_UPDATED_SUCCESS:
            localStorage.setItem('USER', JSON.stringify(action.payload));
            return { user: action.payload, fetched: true };
        case USER_INFO_UPDATED_FAIL:
            return { user: null, error: action.payload, fetched: true };
        default:
            return state;
    }
};

export const userChangepassword = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { user: null, loading: true };
        case USER_REGISTER_SUCCESS:
            return { user: action.payload, loading: true };
        case USER_REGISTER_FAIL:
            return { user: null, error: action.payload, loading: true };
        default:
            return state;
    }
};

export const userListReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { users: null, loading: false };
        case USER_DETAILS_SUCCESS:
            return { users: action.payload, loading: true, error: false };
        case USER_DETAILS_FAIL:
            return { users: null, error: true };
        default:
            return state;
    }
};

export const userAddedReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ADDED_REQUEST:
            return { user: null, isfetching: false };
        case USER_ADDED_SUCCESS:
            return { user: action.payload, isfetching: true };
        case USER_ADDED_FAIL:
            return { user: null, error: action.payload, isfetching: true };
        default:
            return state;
    }
};

export const userEditedReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_EDITED_REQUEST:
            return { user: null, isfetching: false };
        case USER_EDITED_SUCCESS:
            return { user: action.payload, isfetching: true };
        case USER_EDITED_FAIL:
            return { user: null, error: action.payload, isfetching: true };
        default:
            return state;
    }
};

export const userDeletedReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETED_REQUEST:
            return { error: null, isfetching: false };
        case USER_DELETED_SUCCESS:
            return { error: null, isfetching: true };
        case USER_DELETED_FAIL:
            return { error: action.payload, isfetching: true };
        default:
            return state;
    }
};
