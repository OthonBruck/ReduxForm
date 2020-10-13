import React, { Component } from "react";
import {
  Field,
  reduxForm,
  Form,
  formValueSelector,
  getFormValues,
} from "redux-form";
import { Grid, Button, Select, Input, Popup, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { creators as ReposiActions } from "../store/reducer/index.jsx";

const cnpjNormalizer = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

const agenciaNormalizer = (value) => {
  return value.replace(/\D/g, "").replace(/(\d{4})\d+?$/, "$1");
};

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = <div className="erro">⚠ Obrigatório</div>;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = <div className="erro">⚠ E-mail Invalido</div>;
  }
  if (!values.tiposSeguro) {
    errors.tiposSeguro = <div className="erro">⚠ Obrigatório</div>;
  }

  if (!values.tiposCapital) {
    errors.tiposCapital = <div className="erro">⚠ Obrigatório</div>;
  }

  if (!values.cnpj) {
    errors.cnpj = <div className="erro">⚠ Obrigatório</div>;
  } else if (values.cnpj.length !== 18) {
    errors.cnpj = <div className="erro">⚠ CNPJ inválido</div>;
  }

  if (!values.razaoSocial) {
    errors.razaoSocial = <div className="erro">⚠ Obrigatório</div>;
  }

  if (!values.numeroAgencia) {
    errors.numeroAgencia = <div className="erro">⚠ Obrigatório</div>;
  } else if (values.numeroAgencia.length > 4) {
    errors.numeroAgencia = <div className="erro">⚠ Número inválido</div>;
  }
  return errors;
};

const renderField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <div>
    <Label color="teal">{label}</Label>
    <div>
      <Input
        {...input}
        placeholder={label}
        error={touched && invalid}
        {...custom}
      />
    </div>
  </div>
);

const selectRender = ({
  input,
  label,
  required,
  options,
  meta: { touched, error },
  ...rest
}) => (
  <div>
    <Label color="teal">{label}</Label>
    <div>
      <Select
        value={input.value}
        required={required}
        options={options}
        onChange={(event, data) => input.onChange(data.value)}
        {...rest}
      />
    </div>
  </div>
);


const tiposSegurosCheck = (tiposeg) => {
  if (tiposeg){
      return false
  } else {
      return true
  }
}

const tiposCapitalCheck = (tipocap) => {
  if (tipocap){
      return false
  } else {
      return true
  }
}

const cnpjCheck = (cnpj) => {
  if (cnpj && cnpj.length === 18){
      return false
  } else {
      return true
  }
}

const razaoSocialCheck = (rsocial) => {
  if (rsocial){
      return false
  } else {
      return true
  }
}

const emailCheck = (email) => {
  if (email && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
      return false
  } else {
      return true
  }
}


class Formulario extends Component {
  state = {
    tiposSeguro: [],
    tiposCapital: [],
  };

  submit = (values) => {
    console.log(values);
  };

  componentWillMount() {
    this.props.getTipoSeguro();
    this.props.getTipoCapital();
    this.props.getAgencia();
  }

  componentWillUpdate() {
    if (
      this.props.dadosAppState.success &&
      this.state.tiposSeguro.length === 0
    ) {
      this.setState({ tiposSeguro: this.props.dadosAppState.tipoSeguro.data });
    } else if (
      this.props.dadosAppState.success &&
      this.state.tiposCapital.length === 0
    ) {
      this.setState({
        tiposCapital: this.props.dadosAppState.tipoCapital.data,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.numeroAgenciaValue !== this.props.numeroAgenciaValue &&
      this.props.numeroAgenciaValue
    ) {
      this.onChangeAgencia();
    }
  }

  onChangeAgencia = () => {
    console.log(this.props)
    if (
      this.props.dadosAppState.agencias &&
      this.props.dadosAppState.agencias !== [] &&
      this.props.numeroAgenciaValue
    ) {
      const respAgencia = this.props.dadosAppState.agencias.find(
        (a) => a.numero === this.props.numeroAgenciaValue
      );
      console.log("respAgencia", respAgencia);
      this.props.change("nomeAgencia", respAgencia ? respAgencia.nome : "");
    }
  };


  render() {
    console.log(this.props)
    const { submitting, pristine, invalid, tiposSegurosValue, tiposCapitalValue, cnpjValue, razaoSocialValue, emailValue} = this.props;
    return (
      <Form onSubmit={this.props.handleSubmit(this.submit)}>
        <Grid className="formulario">
          <Grid.Row>
            <Grid.Column width={8} textAlign="right">
              <Field
                type="select"
                options={this.state.tiposSeguro}
                name="tiposSeguro"
                component={selectRender}
                label="Tipos de Seguro"
              ></Field>
            </Grid.Column>
            <Grid.Column width={8}>
              <Field
                type="select"
                options={this.state.tiposCapital}
                name="tiposCapital"
                component={selectRender}
                label="Tipos de Capital"
                disabled={tiposSegurosCheck(tiposSegurosValue)}
              ></Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Field
                maxLength={18}
                name="cnpj"
                component={renderField}
                type="text"
                label="CNPJ"
                normalize={cnpjNormalizer}
                disabled={tiposCapitalCheck(tiposCapitalValue)} 
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Field
                name="razaoSocial"
                component={renderField}
                type="text"
                label="Razão Social"
                disabled={cnpjCheck(cnpjValue)}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Field
                name="email"
                component={renderField}
                type="text"
                label="E-mail"
                disabled={razaoSocialCheck(razaoSocialValue)}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Field
                maxLength={4}
                name="numeroAgencia"
                component={renderField}
                type="tel"
                normalize={agenciaNormalizer}
                label={
                  <Popup
                    content='Ao preencher o número da agência o campo "Nome da Agência" será preenchido automaticamente!'
                    position="top right"
                    trigger={<label>Número da Agência 🛈</label>}
                  />
                }
                placeholder="Número da Agência"
                disabled={emailCheck(emailValue)}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Field
                name="nomeAgencia"
                component={renderField}
                type="text"
                label="Nome da Agência"
                placeholder="Nome da Agencia"
                readOnly={true}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="botao">
            <Grid.Column width={16}>
              <Button
                type="submit"
                className="search-button"
                disabled={pristine || submitting || invalid}
              >
                Enviar
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

Formulario = reduxForm({
  form: "formulario",
  validate,
})(Formulario);

const selector = formValueSelector("formulario");
Formulario = connect((state) => {
  const tiposSegurosValue = selector(state, "tiposSeguro");
  const tiposCapitalValue = selector(state, "tiposCapital");
  const cnpjValue = selector(state, "cnpj");
  const razaoSocialValue = selector(state, "razaoSocial");
  const emailValue = selector(state, "email");
  const numeroAgenciaValue = selector(state, "numeroAgencia");
  return {
    tiposSegurosValue,
    tiposCapitalValue,
    cnpjValue,
    razaoSocialValue,
    emailValue,
    numeroAgenciaValue,
  };
})(Formulario);

const mapStateToProps = (state) => ({
  formReducer: state.formReducer,
  dadosAppState: state.dadosAppState,
  valores: getFormValues("Formulario")(state),
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ReposiActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Formulario);
