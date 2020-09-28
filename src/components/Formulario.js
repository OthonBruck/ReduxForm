import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

export default class Formulario extends Component {
  render() {
    return (
      <Grid columns={3} divided className="formulario">
        <Grid.Row stretched></Grid.Row>
      </Grid>
    );
  }
}
