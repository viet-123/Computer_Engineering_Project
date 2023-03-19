import {
    TURN_DETAILS_FAIL,
    TURN_DETAILS_REQUEST,
    TURN_DETAILS_SUCCESS,
    TURN_STATS_FAIL,
    TURN_STATS_REQUEST,
    TURN_STATS_SUCCESS,
} from '../Constant/TurnConstant';

export const turnListReducer = (state = {}, action) => {
    switch (action.type) {
        case TURN_DETAILS_REQUEST:
            return { turns: null, loading: false };
        case TURN_DETAILS_SUCCESS:
            return { turns: action.payload, loading: true, error: false };
        case TURN_DETAILS_FAIL:
            return { turns: null, error: true };
        default:
            return state;
    }
};

export const turnStatsReducer = (state = {}, action) => {
    switch (action.type) {
        case TURN_STATS_REQUEST:
            return { stats: null, loading: false };
        case TURN_STATS_SUCCESS:
            return { stats: action.payload, loading: true, error: false };
        case TURN_STATS_FAIL:
            return { stats: null, error: true };
        default:
            return state;
    }
};
