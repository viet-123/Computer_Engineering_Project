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

export const listPeopleReducer = (state = {}, action) => {
    switch (action.type) {
        case PERSON_DETAILS_REQUEST:
            return { people: null, loading: false };
        case PERSON_DETAILS_SUCCESS:
            return { people: action.payload, loading: true, error: false };
        case PERSON_DETAILS_FAIL:
            return { people: null, error: true };
        default:
            return state;
    }
};

export const personRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case PERSON_REGISTER_REQUEST:
            return { person: null, isfetching: false };
        case PERSON_REGISTER_SUCCESS:
            return { person: action.payload, isfetching: true };
        case PERSON_REGISTER_FAIL:
            return { person: null, error: action.payload, isfetching: true };
        default:
            return state;
    }
};

export const personDeletedReducer = (state = {}, action) => {
    switch (action.type) {
        case PERSON_DELETED_REQUEST:
            return { person: null, isfetching: false };
        case PERSON_DELETED_SUCCESS:
            return { person: action.payload, isfetching: true };
        case PERSON_DELETED_FAIL:
            return { person: null, error: action.payload, isfetching: true };
        default:
            return state;
    }
};

export const personAddedReducer = (state = {}, action) => {
    switch (action.type) {
        case PERSON_ADDED_REQUEST:
            return { person: null, isfetching: false };
        case PERSON_ADDED_SUCCESS:
            return { person: action.payload, isfetching: true };
        case PERSON_ADDED_FAIL:
            return { person: null, error: action.payload, isfetching: true };
        default:
            return state;
    }
};
