import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Grid, Button } from "semantic-ui-react";

export default class Formulario extends Component {
  render() {
    return (
      <Grid className="formulario">
        <Grid.Row>
          <Grid.Column width={8} textAlign="right"></Grid.Column>
          <Grid.Column width={8}></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <Field name="inputName" component="input" type="text" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <Field name="inputName" component="input" type="text" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <Field name="inputName" component="input" type="text" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <Field name="inputName" component="input" type="text" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <Field name="inputName" component="input" type="text" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="botao">
          <Grid.Column width={16}>
            <Button className="search-button">Enviar</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

Formulario = reduxForm({
  form: "contact",
})(Formulario);
