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
export default class Formulario extends Component {
  render() {
    return (
      <Form>
        <Grid className="formulario">
          <Grid.Row>
            <Grid.Column width={8} textAlign="right">
              <Field
                name="TiposSeguro"
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
                component="input"
                type="text"
                label="Tipos de Seguro"
                normalize={cnpjNormalizer}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Field name="RazaoSocial" component="input" type="text" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Field name="Email" component="input" type="text" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Field maxLength={4} name="NúmeroAgencia" component="input" type="text" normalize={agenciaNormalizer} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Field name="NomeAgencia" component="input" type="text" />
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
})(Formulario);
