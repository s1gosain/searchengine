import React, { Component } from "react";
import ReactDOM from "react-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Dropdown extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false,
    }

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render() {
    return (
      <div>
        <MenuIcon onClick={this.showMenu} />
        {
          this.state.showMenu
           ? (
            <div className="menu">
              <ul>
              <Link to="/" className="link">Home</Link>
              </ul>
              <ul>
              <Link to="/favorites/" className="link">Favorites</Link>
              </ul>
            </div>
           )
           : (
             null
           )
        }
      </div>
    )
  }
}