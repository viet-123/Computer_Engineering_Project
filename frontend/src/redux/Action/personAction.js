import {
      PERSON_DETAILS_FAIL,
      PERSON_DETAILS_REQUEST,
      PERSON_DETAILS_SUCCESS,
} from '../Constant/personConstant';
import axios from 'axios';
export const getAllPeople = () => async (dispatch, getState) => {
      try {
            dispatch({
                  type: PERSON_DETAILS_REQUEST,
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
            const res = await axios.get(`http://localhost:8000/api/person`, config);
            dispatch({
                  type: PERSON_DETAILS_SUCCESS,
                  payload: res.data,
            });
      } catch (error) {
            dispatch({
                  type: PERSON_DETAILS_FAIL,
                  payload:
                        error.response && error.response.data.message
                              ? error.response.data.message
                              : error.message,
            });
      }
};
