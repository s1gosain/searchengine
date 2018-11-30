import React, { Component } from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import AppBar from "@material-ui/core/AppBar";
import Favorite from "@material-ui/icons/Favorite";
import Dropdown from "./Dropdown.js";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      images: [],
      error: null,
      fav: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clickFav = this.clickFav.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    fetch(` https://api.giphy.com/v1/gifs/search?api_key=GZKGwdu6xlIM0iV58yFKJOFLqj0NLXFw&q=${this.state.value}`)
      .then(res => res.json())
      //only need the data array
      .then(res => res.data)
      //map over array (creates new array), grab the gif url only
      .then(res => {
        const images = res.map(x => {
          return x.embed_url;
        });
        this.setState({ images: [] });
        this.setState({ images });
      })
    event.preventDefault();
  }

  clickFav(e) {
    this.props.updateFavorites(e)
    let nwFav = [...this.state.fav];
    
    if(this.state.fav.includes(e.target.id)) {
      console.log(nwFav.indexOf(e.target.id));
      console.log(nwFav);
      let i = JSON.stringify(e.target.id);
      nwFav.splice(nwFav.indexOf(i), 1);
     } 
     else nwFav.push(e.target.id);
    this.setState({fav : nwFav});
  }


  render() {
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>
    }
    else {
      return (
          <div>
            <AppBar className="appBar">
              <Toolbar>
                <Dropdown className="drop" />
            <form onSubmit={this.handleSubmit}>
              <label>
                Search for images of:
                <TextField
                  name="search"
                  value={this.state.value}
                  onChange={this.handleChange} />
              </label>
              <Button
                type="submit"
                color="secondary"
                variant="contained">
                Search
              </Button>
            </form>
            </Toolbar>
            </AppBar>
            <div className="container">
            {this.state.images.map(x => {

              //set gif embed_url to source for embed file
              return (
                  <div className="image" id={x} key={x+'f'}>
                    <embed src={x} id={x} className="pic" key={x+'u'}/>
                    {this.state.fav.includes(x) ? <Favorite id={x} className="filledHeart" onClick={this.clickFav}/> : <FavoriteBorder id={x} className="heart" onClick={this.clickFav}/>}
                  
                  </div>
                
              )
            })}
          </div>
          </div>
      );
    }
  }
}
