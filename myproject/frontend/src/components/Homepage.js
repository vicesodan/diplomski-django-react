import React, { Component } from "react";
import Adnet from "./Adnet";
import AdnetABB from "./Adnetabb";
import Endpage from "./Endpage";
import Database from "./Database";
import {Grid, Button, Typography, TextField} from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import axios from 'axios';
import MailIcon from '@material-ui/icons/MailOutline';


export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: false,
      isLoggedIn: false,
    };
  }

 
    renderHomepage(){
      
      return(
        <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Prijava:
          </Typography>
        </Grid>
        
        <Grid item xs={12} align="center">
          <TextField 
            label="Korisničko ime" 
            variant="outlined" 
            onChange={event => this.handleFieldInput(event, 'username')}/>    
        </Grid>
        <Grid item xs={12} align="center"> 
          <TextField 
            label="Lozinka" 
            variant="outlined" 
            color="secondary" 
            type="password" 
            onChange={event => this.handleFieldInput(event, 'password')} 
            error={this.state.error} 
            helperText={this.state.error ? 'Netočno korisničko ime ili lozinka' : ''} />  
        </Grid>   
        <Grid item xs={12} align="center">
        <Button 
            color="primary" 
            variant="contained"  
            onClick={() => this.authenticate()}> Provjeri podatke
          </Button>
          <Button 
            color="secondary" 
            variant="contained"  to={this.state.isLoggedIn ? '/database' : '/' } 
            component={Link} > Prijavi se!
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button 
            variant="outlined" 
            color="primary">
            <MailIcon />
            <a class="linkm" 
               href="https://login.microsoftonline.com/ba2fa2d1-38b6-47ce-806c-0bce7f022431/oauth2/authorize?response_type=code&client_id=81818a59-107d-49c1-a30b-8344f5e9c496&resource=81818a59-107d-49c1-a30b-8344f5e9c496&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fdatabase">
               Prijava pomoću Microsoft Accounta</a>
          </Button>
        </Grid>
      </Grid>
      );
    }

    render() { 
      return(
        <Router>
        <Switch>
          <Route exact path ="/"
            render={() => {
              return this.renderHomepage()}}
          />
          <Route path="/adnet" component={Adnet} />
          <Route path="/adnetabb" component={AdnetABB} />
          <Route path="/endPage" component={Endpage} />
          <Route path="/database" component={Database} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
      );
      
  }

  handleFieldInput = (e, fieldType) => {
    const inputValue =  e.target.value;

    if(fieldType === 'username') {
      this.setState({
        username: inputValue
      })
      this.setState({error: true})
    }

    if(fieldType === 'password') {
      this.setState({
        password: inputValue
      })
    }
  }

  authenticate = () =>{
    axios.post('/rest-auth/login/' , {
      username: this.state.username,
      password: this.state.password
    })
    .then(res => {
      if(res.data.key) {
        this.setState({isLoggedIn: true})
        this.setState({error: false})
      } 
    }
    )
  }

}