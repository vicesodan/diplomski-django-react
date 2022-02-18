import React, { Component } from "react";
import { Grid, Button, ButtonGroup, Typography, FormHelperText, FormControl} from "@material-ui/core";
import {  Link } from "react-router-dom";




export default class Database extends Component {
 
    render(){
      
      return(
        <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Odaberite bazu podataka:
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">(Odabir vodi na izbornik podataka za export!)</div>
            </FormHelperText>
            <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/adnet" component={Link}>
              AdnetNetworkModel
            </Button>
            <Button color="secondary" to="/adnetabb" component={Link}>
              AdnetNetworkModelABB
            </Button>
          </ButtonGroup>
          </FormControl>
        </Grid>
      </Grid>
      );
    }
}