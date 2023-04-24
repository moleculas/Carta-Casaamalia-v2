import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//import {composeWithDevTools} from 'redux-devtools-extension';

import appReducer from './appDucks';
import usuarioReducer from './usuarioDucks';

const rootReducer = combineReducers({   
    variablesApp: appReducer, 
    variablesUsuario: usuarioReducer,  
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
    return store;
}