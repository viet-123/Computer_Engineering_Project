import {
      TURN_DETAILS_FAIL,
      TURN_DETAILS_REQUEST,
      TURN_DETAILS_SUCCESS,
} from '../Constant/TurnConstant';
import axios from 'axios';
export const getallturn = () => async (dispatch, getState) => {
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
            const res = await axios.get(`/api/turn`, config);
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
