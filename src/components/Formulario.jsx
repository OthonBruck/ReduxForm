import React, { Component } from "react";
import { Field, reduxForm, Form } from "redux-form";
import { Grid, Button, Select, Input, Popup, Label } from "semantic-ui-react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { creators as ReposiActions } from "../store/reducer/index";

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
  if (!values.tiposSeguros) {
    errors.tiposSeguros = <div className="erro">⚠ Obrigatório</div>;
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

const countryOptions = [
  { key: "af", value: "af", text: "Afghanistan" },
  { key: "ax", value: "ax", text: "Aland Islands" },
  { key: "al", value: "al", text: "Albania" },
  { key: "dz", value: "dz", text: "Algeria" },
  { key: "as", value: "as", text: "American Samoa" },
  { key: "ad", value: "ad", text: "Andorra" },
  { key: "ao", value: "ao", text: "Angola" },
  { key: "ai", value: "ai", text: "Anguilla" },
  { key: "ag", value: "ag", text: "Antigua" },
  { key: "ar", value: "ar", text: "Argentina" },
  { key: "am", value: "am", text: "Armenia" },
  { key: "aw", value: "aw", text: "Aruba" },
  { key: "au", value: "au", text: "Australia" },
  { key: "at", value: "at", text: "Austria" },
  { key: "az", value: "az", text: "Azerbaijan" },
  { key: "bs", value: "bs", text: "Bahamas" },
  { key: "bh", value: "bh", text: "Bahrain" },
  { key: "bd", value: "bd", text: "Bangladesh" },
  { key: "bb", value: "bb", text: "Barbados" },
  { key: "by", value: "by", text: "Belarus" },
  { key: "be", value: "be", text: "Belgium" },
  { key: "bz", value: "bz", text: "Belize" },
  { key: "bj", value: "bj", text: "Benin" },
];



class Formulario extends Component {
  submit = (values) => {
    console.log(values);
    console.log(this.props.getTipoSeguro())

  };

  

  render() {
    const { submitting, pristine, invalid} = this.props;
    return (
      <Form onSubmit={this.props.handleSubmit(this.submit)}>
        <Grid className="formulario">
          <Grid.Row>
            <Grid.Column width={8} textAlign="right">
              <Field
                type="select"
                options={countryOptions}
                name="tiposSeguro"
                component={selectRender}
                label="Tipos de Seguro"
              ></Field>
            </Grid.Column>
            <Grid.Column width={8}>
              <Field
                type="select"
                options={countryOptions}
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
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ReposiActions, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Formulario);