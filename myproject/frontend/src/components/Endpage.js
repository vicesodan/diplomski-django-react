import React, { Component } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class Endpage extends Component {
  
  render() {
    
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Podatci su uspješno izvezeni u excel datoteku!
          </Typography>
        </Grid>
        <Grid 
            item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            to="/database"
            component={Link}
          >
            Natrag na početni izbornik
          </Button>
        </Grid>
      </Grid>
    );
  }
}