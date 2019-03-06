import { combineReducers } from 'redux';

import AutenticacaoReducer from './AutenticacaoReducer';
import AppReducer from './AppReducer';
import AppFilhoReducer from './AppFilhoReducer';

export default combineReducers({
    AutenticacaoReducer,
    AppReducer,
    AppFilhoReducer
});