import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    userChangepassword,
    userLoginReducer,
    userRegisterReducer,
    userListReducer,
} from './Reducers/UserReducer';
import { turnListReducer, turnStatsReducer } from './Reducers/TurnReducer';
import {
    listPeopleReducer,
    personRegisterReducer,
    personDeletedReducer,
    personAddedReducer,
} from './Reducers/PersonReducer';
import {
    buildingAddedReducer,
    buildingDeletedReducer,
    buildingEditedReducer,
    buildingListReducer,
} from './Reducers/BuildingReducer';
import {
    cameraAddedReducer,
    cameraDeletedReducer,
    cameraEditedReducer,
    cameraListReducer,
} from './Reducers/CameraReducer';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userChangpassword: userChangepassword,
    userList: userListReducer,
    turnList: turnListReducer,
    turnStats: turnStatsReducer,
    personList: listPeopleReducer,
    personRegister: personRegisterReducer,
    personDeleted: personDeletedReducer,
    personAdded: personAddedReducer,
    buildingList: buildingListReducer,
    buildingAdded: buildingAddedReducer,
    buildingDeleted: buildingDeletedReducer,
    buildingEdited: buildingEditedReducer,
    cameraList: cameraListReducer,
    cameraAdded: cameraAddedReducer,
    cameraDeleted: cameraDeletedReducer,
    cameraEdited: cameraEditedReducer,
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
