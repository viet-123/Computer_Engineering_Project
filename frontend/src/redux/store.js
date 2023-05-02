import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    userChangepassword,
    userLoginReducer,
    userInfoUpdatedReducer,
    userRegisterReducer,
    userListReducer,
    userAddedReducer,
    userEditedReducer,
    userDeletedReducer,
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
    buildingManagedReducer,
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
    userInfoUpdated: userInfoUpdatedReducer,
    userChangpassword: userChangepassword,
    userList: userListReducer,
    userAdded: userAddedReducer,
    userEdited: userEditedReducer,
    userDeleted: userDeletedReducer,
    turnList: turnListReducer,
    turnStats: turnStatsReducer,
    personList: listPeopleReducer,
    personRegister: personRegisterReducer,
    personDeleted: personDeletedReducer,
    personAdded: personAddedReducer,
    buildingList: buildingListReducer,
    buildingManaged: buildingManagedReducer,
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
