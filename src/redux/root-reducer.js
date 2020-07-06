import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';

expor default combineReducers({
    user: userReducer
})