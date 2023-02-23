import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userChangepassword, userLoginReducer, userRegisterReducer } from './Reducers/UserReducer';
import { listturnReducer } from './Reducers/TurnReducer';
import { listPeopleReducer } from './Reducers/PersonReducer';

const reducer = combineReducers({
      userLogin: userLoginReducer,
      userRegister: userRegisterReducer,
      userChangpassword: userChangepassword,
      turnList: listturnReducer,
      personList: listPeopleReducer,
});

const userFromLocal = localStorage.getItem('USER')
      ? JSON.parse(localStorage.getItem('USER'))
      : null;

const initialState = {
      userLogin: {
            user: userFromLocal,
      },
};

const middleware = [thunk];

const store = createStore(
      reducer,
      initialState,
      composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
