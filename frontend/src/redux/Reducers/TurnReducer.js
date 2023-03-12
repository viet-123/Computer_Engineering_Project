import {
    TURN_DETAILS_FAIL,
    TURN_DETAILS_REQUEST,
    TURN_DETAILS_SUCCESS,
    TURN_STATS_FAIL,
    TURN_STATS_REQUEST,
    TURN_STATS_SUCCESS,
} from '../Constant/TurnConstant';

export const listturnReducer = (state = {}, action) => {
    switch (action.type) {
        case TURN_DETAILS_REQUEST:
            return { turn: null, loading: false };
        case TURN_DETAILS_SUCCESS:
            return { turn: action.payload, loading: true, error: false };
        case TURN_DETAILS_FAIL:
            return { turn: null, error: true };
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
