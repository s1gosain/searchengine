import React, { Component } from "react";
import ReactDOM from "react-dom";
import Form from "./Form.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Material from "material-design-icons";
import Faves from "./Faves.js";
import Dropdown from "./Dropdown.js";

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
    };

    this.updateFavorites = this.updateFavorites.bind(this);
  }

  updateFavorites(event) {
    //if not marked as favorite, add to array.
    if (!this.state.favorites.includes(event.target.id)) this.state.favorites.push(event.target.id);
  }

  render() {
    return (
      <Router>
        <div>
          <Dropdown className="drop"/>
          <Route path="/" exact component={(props) => {return <Form updateFavorites={this.updateFavorites} favorites={this.state.favorites}/>}} />
          <Route path="/favorites/" component={(props) => {return <Faves favorites={this.state.favorites}/>}} />
        </div>
      </Router>
    );
  }
}

export default AppRouter;

ReactDOM.render(<AppRouter />, document.getElementById("app"));