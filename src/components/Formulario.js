import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

export default class Formulario extends Component {
  render() {
    return (
      <Grid columns={2} className="formulario">
        <Grid.Row stretched>
          <Grid.Column width={8} textAlign="right"></Grid.Column>
          <Grid.Column width={8}></Grid.Column>
        </Grid.Row>
        <Grid.Row stretched>
          <Grid.Column width={16} textAlign="center">
            campo
            <input></input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched>
          <Grid.Column width={16} textAlign="center">
            campo
            <input></input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched>
          <Grid.Column width={16} textAlign="center">
            campo
            <input></input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched>
          <Grid.Column width={16} textAlign="center">
            campo
            <input></input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched>
          <Grid.Column width={16} textAlign="center">
            campo
            <input></input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched>
          <Grid.Column width={16} textAlign="center">
            <button>ss</button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
