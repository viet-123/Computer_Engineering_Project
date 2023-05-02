import {
    TURN_DETAILS_FAIL,
    TURN_DETAILS_REQUEST,
    TURN_DETAILS_SUCCESS,
    TURN_STATS_FAIL,
    TURN_STATS_REQUEST,
    TURN_STATS_SUCCESS,
} from '../Constant/TurnConstant';
import axios from 'axios';
export const getAllTurns =
    (building = undefined) =>
    async (dispatch, getState) => {
        try {
            dispatch({
                type: TURN_DETAILS_REQUEST,
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
            const res = await axios.get(
                `http://localhost:8000/api/turn${building ? '?building=' + building : ''}`,
                config,
            );
            dispatch({
                type: TURN_DETAILS_SUCCESS,
                payload: res.data,
            });
        } catch (error) {
            dispatch({
                type: TURN_DETAILS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const statisticalTurn =
    (type, building = '') =>
    async (dispatch, getState) => {
        try {
            dispatch({
                type: TURN_STATS_REQUEST,
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
            const currentDate = new Date();
            const date = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();

            const res = await axios.get(
                `http://localhost:8000/api/turn/stats?day=${date}&month=${month}&year=${year}&type=${type}&building=${building}`,
                config,
            );
            dispatch({
                type: TURN_STATS_SUCCESS,
                payload: res.data,
            });
        } catch (error) {
            dispatch({
                type: TURN_STATS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
