import React, { Component } from "react";
import { Grid, Segment } from "semantic-ui-react";

export default class Formulario extends Component {
  render() {
    return (
      <Grid columns={3} divided>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment></Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>1</Segment>
            <Segment>2</Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>1</Segment>
            <Segment>2</Segment>
            <Segment>3</Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
