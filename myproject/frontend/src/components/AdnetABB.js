import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SendIcon from '@material-ui/icons/Send';



export default class AdnetABB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      choice: []
    };
  }
 
  componentDidMount(){
    
    const endpoint = "/api/popisabb"
    let lookupOptions = {
      method: "GET",
      headers: {
        'Content-Type' : 'application/json'
      }
    }

    fetch(endpoint, lookupOptions)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            data: result
          });
        }
      )
  }

  componentDidUpdate() {
    this.mapMenuitems()
  }
  


  render() {

    return (
      
      <Grid container spacing={1}>
        <div style={{display: 'block'}}>
          <Grid item xs={12} align="center">
            <Typography component="h4" variant="h4">
              Odaberite podatke iz baze AdnetNetworkModelABB za export:
            </Typography>
          </Grid>

          <Grid container spacing={5}>
          <Grid item xs={12} align="center">
        
          <List style={{float: 'right', width:300, height:400}}>
            <ListItem>
              <ListItemText primary={<h3>Odabrano:</h3>}/>
            </ListItem>
            {this.mapSelectedChoices()}
          </List>

          {this.state.data.length > 0 ? <FormControl style={{minWidth: 400,margin:10}}> 
            <InputLabel id="demo-simple-select-label">Mrežni objekti:</InputLabel>
            <Select 
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(event) => this.sendEl(event.target.value)}
              value={this.state.choice[0]}
            > 
            {this.mapMenuitems()}
            </Select>
            </FormControl> : null
          }

          <Grid
            item xs={12} align="center">
            <Button
              style={{margin:5}}
              variant="contained"
              color="secondary"
              onClick={() => this.props.history.push('/endPage')}
            >
              <a class="link" href="api/excelabb">Izvezi</a>
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.location.reload(true)}
            >
              Reset
            </Button>
          </Grid>
        


          </Grid>
          </Grid>
        </div>
      </Grid>
    );
  }


  mapMenuitems = () => {
      return this.state.data.map((element, index) => {
        const value = {
          id: element.id,
          name: element.name
        }
          return (
            <MenuItem value={value}>{element.name}</MenuItem>
          )
      })
  }

  mapSelectedChoices = () => {
    return this.state.choice.map((element, index) => {
        return (
          <ListItem>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary={element.name} secondary={"Odabir: " + (index+1)}/>
          </ListItem>
        )
    })
}

  exportEL = () =>{
    this.props.history.push('/endPage')
    const endpoint = `/api/excelabb`
      let lookupOptions = {
        method: "GET",
        headers: {
          'Content-Type' : 'application/json'
        }
      }
      fetch(endpoint, lookupOptions)

  }

  sendEl = (mreza) => {
      const endpoint = `/api/get-izborabb?mreza=${mreza.id}`
      let lookupOptions = {
        method: "GET",
        headers: {
          'Content-Type' : 'application/json'
        }
      }

      fetch(endpoint, lookupOptions)
        .then(res => res.json())
        .then(
          (result) => {
            const selected = this.state.choice.slice();
            selected.push(mreza);
            this.setState({
              data: result,
              choice: selected 
            });
          }
        );
  }
}

