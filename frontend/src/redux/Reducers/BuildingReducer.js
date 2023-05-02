import {
    BUILDING_DETAILS_FAIL,
    BUILDING_DETAILS_REQUEST,
    BUILDING_DETAILS_SUCCESS,
    BUILDING_EDITED_FAIL,
    BUILDING_EDITED_REQUEST,
    BUILDING_EDITED_SUCCESS,
    BUILDING_DELETED_FAIL,
    BUILDING_DELETED_REQUEST,
    BUILDING_DELETED_SUCCESS,
    BUILDING_ADDED_FAIL,
    BUILDING_ADDED_REQUEST,
    BUILDING_ADDED_SUCCESS,
    BUILDING_MANAGED_FAIL,
    BUILDING_MANAGED_REQUEST,
    BUILDING_MANAGED_SUCCESS,
} from '../Constant/buildingConstant';

export const buildingListReducer = (state = {}, action) => {
    switch (action.type) {
        case BUILDING_DETAILS_REQUEST:
            return { buildings: null, loading: false };
        case BUILDING_DETAILS_SUCCESS:
            return { buildings: action.payload, loading: true, error: false };
        case BUILDING_DETAILS_FAIL:
            return { buildings: null, error: true };
        default:
            return state;
    }
};

export const buildingManagedReducer = (state = {}, action) => {
    switch (action.type) {
        case BUILDING_MANAGED_REQUEST:
            return { buildings: null, loading: false };
        case BUILDING_MANAGED_SUCCESS:
            return { buildings: action.payload, loading: true, error: false };
        case BUILDING_MANAGED_FAIL:
            return { buildings: null, error: true };
        default:
            return state;
    }
};

export const buildingDeletedReducer = (state = {}, action) => {
    switch (action.type) {
        case BUILDING_DELETED_REQUEST:
            return { building: null, isfetching: false };
        case BUILDING_DELETED_SUCCESS:
            return { building: action.payload, isfetching: true };
        case BUILDING_DELETED_FAIL:
            return { building: null, error: action.payload, isfetching: true };
        default:
            return state;
    }
};

export const buildingAddedReducer = (state = {}, action) => {
    switch (action.type) {
        case BUILDING_ADDED_REQUEST:
            return { building: null, isfetching: false };
        case BUILDING_ADDED_SUCCESS:
            return { building: action.payload, isfetching: true };
        case BUILDING_ADDED_FAIL:
            return { building: null, error: action.payload, isfetching: true };
        default:
            return state;
    }
};

export const buildingEditedReducer = (state = {}, action) => {
    switch (action.type) {
        case BUILDING_EDITED_REQUEST:
            return { building: null, isfetching: false };
        case BUILDING_EDITED_SUCCESS:
            return { building: action.payload, isfetching: true };
        case BUILDING_EDITED_FAIL:
            return { building: null, error: action.payload, isfetching: true };
        default:
            return state;
    }
};
