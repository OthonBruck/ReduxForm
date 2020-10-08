import { endpoints } from "../api/endpoints";
import { Types } from "./reducer/index.jsx";
import { all, put, takeLatest } from "redux-saga/effects";
import api from "../api/api.jsx";

function* tipoSeguro(action) {
  try {
    const response = yield api.get(endpoints.TIPOS_SEGUROS);
    let tiposSeguro = response.data;
    tiposSeguro = tiposSeguro.map((resp) => {
      return {
        key: resp.id,
        value: resp.id,
        text: resp.nome,
      };
    });
    console.log(tiposSeguro);
    yield put({
      type: Types.GET_TIPO_SEGURO_SUCCESS,
      payload: tiposSeguro,
    });
  } catch (error) {}
}

function* tipoCapital(action) {
  try {
    const response = yield api.get(endpoints.TIPOS_CAPITAL);
    let tiposCapital = response.data;
    tiposCapital = tiposCapital.map((resp) => {
      return {
        key: resp.id,
        value: resp.id,
        text: resp.nome,
      };
    });
    yield put({
      type: Types.GET_TIPO_CAPITAL_SUCCESS,
      payload: tiposCapital,
    });
  } catch (error) {}
}

function* agencia(action) {
  try {
    const resp = yield api.get(endpoints.AGENCIA);

    yield put({
      type: Types.GET_AGENCIA_SUCCESS,
      payload: resp.data,
    });
  } catch (error) {
    yield put({
      type: Types.GET_AGENCIA_FAIL,
    });
  }
}

export default function* raiz() {
  yield all([
    yield takeLatest(Types.GET_TIPO_SEGURO, tipoSeguro),
    yield takeLatest(Types.GET_TIPO_CAPITAL, tipoCapital),
    yield takeLatest(Types.GET_AGENCIA, agencia),
  ]);
}
