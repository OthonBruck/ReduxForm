import { endpoints } from "../api/endpoints";
import { Types } from "./reducer/index.jsx";
import { all, put, takeLatest } from "redux-saga/effects";
import api from "../api/api.jsx";

function* tipoSeguro(action) {
  try {
    const response = yield api.get(endpoints.TIPOS_SEGUROS);
    let tiposSeguroRes = response.data;
    yield put({
      type: Types.GET_TIPO_SEGURO_SUCCESS,
      payload: tiposSeguroRes,
    });
  } catch (error) {}
}

function* tipoCapital(action) {}

function* agencia(action) {}

export default function* raiz() {
  yield all([
    yield takeLatest(Types.GET_TIPO_SEGURO, tipoSeguro),
    yield takeLatest(Types.GET_TIPO_CAPITAL, tipoCapital),
    yield takeLatest(Types.GET_AGENCIA, agencia),
  ]);
}
