import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as formReducer } from "redux-form";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducer";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    form: formReducer,
    dadosAppState: reducer,
  }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga)

export default store;
