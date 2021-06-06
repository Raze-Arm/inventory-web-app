import {createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware from 'redux-saga';



import reducers from './reducers';
import rootSaga from './sagas';
import {LOGOUT} from "./actions/types";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = (state, action) => {
    if(action.type  === LOGOUT.SUCCESS) {
        return reducers(undefined, action);
    }
    return reducers(state, action);
};


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);


export default store;