import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    userChangepassword,
    userLoginReducer,
    userRegisterReducer,
    userListReducer,
} from './Reducers/UserReducer';
import { listturnReducer, turnStatsReducer } from './Reducers/TurnReducer';
import {
    listPeopleReducer,
    personRegisterReducer,
    personDeletedReducer,
    personAddedReducer,
} from './Reducers/PersonReducer';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userChangpassword: userChangepassword,
    userList: userListReducer,
    turnList: listturnReducer,
    turnStats: turnStatsReducer,
    personList: listPeopleReducer,
    personRegister: personRegisterReducer,
    personDeleted: personDeletedReducer,
    personAdded: personAddedReducer,
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
