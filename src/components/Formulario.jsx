import React, { Component } from "react";
import { Form, Field, reduxForm } from "redux-form";
import { Grid, Button } from "semantic-ui-react";


const cnpjNormalizer = (value) => {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
};

const agenciaNormalizer = (value) => {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
};

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)


export default class Formulario extends Component {
  render() {
    return (
      <Form>
        <Grid className="formulario">
          <Grid.Row>
            <Grid.Column width={8} textAlign="right">
              <Field
                name="tiposseguro"
                type="select"
                component="select"
                label="Tipos de Seguro"
              >
                <option value="#ff0000">Reddsadas </option>
                <option value="#00ff00">Green</option>
                <option value="#0000ff">Blue</option>
              </Field>
            </Grid.Column>
            <Grid.Column width={8}>
              <Field
              type="select"
                name="TiposCapital"
                component="select"
                label="Tipos de Capital"
              >
                <option value="#ff0000">Reddasdassd</option>
                <option value="#00ff00">Green</option>
                <option value="#0000ff">Blue</option>
              </Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Field
              maxLength={18}
                name="CNPJ"
                component={renderField}
                type="text"
                label="CNPJ"
                normalize={cnpjNormalizer}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Field name="RazaoSocial" component={renderField} type="text" label="Razão Social"/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Field name="email" component={renderField} type="text"  label="E-mail"/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Field maxLength={4} name="NúmeroAgencia" component={renderField}type="text" normalize={agenciaNormalizer} label="Número da Agencia" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Field name="NomeAgencia" component={renderField} type="text" label="Nome da Agencia" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="botao">
            <Grid.Column width={16}>
              <Button className="search-button">Enviar</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

Formulario = reduxForm({
  form: "contact",
  validate,
})(Formulario);
