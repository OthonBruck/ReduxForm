import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as formReducer } from "redux-form";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    form: formReducer,
  }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga)

export default store;
