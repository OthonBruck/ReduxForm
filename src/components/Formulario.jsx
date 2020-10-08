import React, { Component } from "react";
import { Field, reduxForm, Form } from "redux-form";
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
  } else if (values.numeroAgencia.length !== 4) {
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

class Formulario extends Component {
  state = {
    tiposSeguro: [],
    tiposCapital: []
  };

  submit = (values) => {
    console.log(values);
  };


  componentWillMount() {
    this.props.getTipoSeguro()
    this.props.getTipoCapital()
  }

  componentWillUpdate() {
    if (this.props.dadosAppState.success && this.state.tiposSeguro.length === 0) {
      this.setState({tiposSeguro: this.props.dadosAppState.tipoSeguro.data})
    } else if ((this.props.dadosAppState.success && this.state.tiposCapital.length === 0)) {
      this.setState({tiposCapital: this.props.dadosAppState.tipoCapital.data})
    }
  }


  render() {
    const { submitting, pristine, invalid } = this.props;
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
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Field
                maxLength={4}
                name="numeroAgencia"
                component={renderField}
                type="text"
                normalize={agenciaNormalizer}
                label="Número da Agencia"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Field
                name="nomeAgencia"
                component={renderField}
                type="text"
                label={
                  <Popup
                    content='Ao preencher o número da agência o campo "Nome da Agência" será preenchido automaticamente!'
                    position="top right"
                    trigger={<label>Número da Agência 🛈</label>}
                  />
                }
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

const mapStateToProps = (state) => ({
  formReducer: state.formReducer,
  dadosAppState: state.dadosAppState,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ReposiActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Formulario);
