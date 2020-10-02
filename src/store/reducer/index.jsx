export const Types = {
    SUBMIT_FORM_SUCCESS: 'SUBMIT_FORM_SUCCESS',
    SUBMIT_FORM_FAIL: 'SUBMIT_FORM_FAIL',
    SUBMIT_FORM: 'SUBMIT_FORM',

    GET_TIPO_SEGURO: 'GET_TIPO_SEGURO',
    GET_TIPO_SEGURO_SUCCESS: 'GET_TIPO_SEGURO_SUCCESS',
    GET_TIPO_SEGURO_FAIL: 'GET_TIPO_SEGURO_FAIL',

    GET_TIPO_CAPITAL: 'GET_TIPO_CAPITAL',
    GET_TIPO_CAPITAL_SUCCESS: 'GET_TIPO_CAPITAL_SUCCESS',
    GET_TIPO_CAPITAL_FAIL: 'GET_TIPO_CAPITAL_FAIL',

    GET_AGENCIA: 'GET_AGENCIA',
    GET_AGENCIA_SUCCESS: 'GET_AGENCIA_SUCCESS',
    GET_AGENCIA_FAIL: 'GET_AGENCIA_FAIL',
}

const stateLoading = {
    loading: true,
    error: false,
    success: false
}

const stateError = {
    loading: false,
    error: true,
    success: false
}

const stateSuccess = {
    loading: false,
    error: false,
    success: true
}

const initialState = {
    tipoSeguro: {
        data:[],
    },
    tipoCapital:{
        data:[],
    },
    agencias: []
};

const formReducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case Types.GET_TIPO_SEGURO:
            return{
                ...state,
                stateLoading,
                tipoSeguro: null
            }
        case Types.GET_TIPO_SEGURO_SUCCESS:
            return{
                ...state,
                stateSuccess,
                tipoSeguro: {
                    ...state.tipoSeguro,
                    data: action.payload
                }
            }
        case Types.GET_TIPO_SEGURO_FAIL:
            return{
                ...state,
                stateError,
                tipoSeguro: null
            }
        case Types.GET_TIPO_CAPITAL:
            return{
                ...state,
                stateLoading,
                tipoCapital: null
            }
        case Types.GET_TIPO_CAPITAL_SUCCESS:
            return{
                ...state,
                stateSuccess,
                tipoCapital: {
                    ...state.tipoCapital,
                    data: action.payload
                }
            }
        case Types.GET_TIPO_CAPITAL_FAIL:
            return{
                 ...state,
                stateError,
                tipoCapital: null
            }
        case Types.GET_AGENCIA:
            return{
                ...state,
                stateLoading,
                agencias: []
            }
        case Types.GET_AGENCIA_SUCCESS:
            return{
                ...state,
                stateSuccess,
                agencias: action.payload,
            }
        case Types.GET_AGENCIA_FAIL:
            return{
                 ...state,
                stateError,
                agencias: []
            }
        default:
            return state
    }
}
//   export const repoReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case Types.ADD_REPO:
//         return {
//           ...state,
//           listaRepos: [...state.listaRepos, action.payload]
//         };
//       case Types.REMOVE_REPO:
//         return {
//           ...state,
//           listaRepos: state.listaRepos.filter((item) => {
//             return item.id !== action.payload.id;
//           })
//         };
//       case Types.UPDATE_REPO:
//         return {
//           ...state,
//           listaRepos: state.listaRepos.map(item => (
//             item.id === action.payload.id ? action.payload : item))
//         };
//       default:
//         return state;
//     }
//   };
  
  
export const creators = {
    getTipoSeguro: () => ({
        type: Types.GET_TIPO_SEGURO,
    }),
    tipoSeguroFail: () => ({
        type: Types.GET_TIPO_SEGURO_FAIL,
    }),
    tipoSeguroSuccess: tipoSeguro=> ({
        type: Types.GET_TIPO_SEGURO_SUCCESS,
        payload: tipoSeguro
    }),
    getTipoCapital: () => ({
        type: Types.GET_TIPO_CAPITAL,
    }),
    tipoCapitalFail: () => ({
        type: Types.GET_TIPO_CAPITAL_FAIL,
    }),
    tipoCapitalSuccess: tipoCapital=> ({
        type: Types.GET_TIPO_CAPITAL_SUCCESS,
        payload: tipoCapital
    }),
    getAgencia: (agenciaId) => ({
        type: Types.GET_AGENCIA,
        agenciaId: agenciaId,
    }),
    agenciaFail: () => ({
        type: Types.GET_AGENCIA_FAIL,
    }),
    agenciaSuccess: agenciaNome=> ({
        type: Types.GET_AGENCIA_SUCCESS,
        payload: agenciaNome
    }),
}
  
export default formReducer; 
  