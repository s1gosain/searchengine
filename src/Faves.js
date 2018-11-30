import React, { Component } from "react";
import ReactDOM from "react-dom";
import Favorite from "@material-ui/icons/Favorite";

const Faves = (props) => {
 return (
   <div id="faves">
   {/* map over favorites array (passed in props) and set each url to the source for embed code (like in Form) */}
    {props.favorites.map(x => {
      return(
      <div className="image" key={x + 'c'}>
        <embed src={x} className="pic" key={x + 'k'}/>
        <Favorite id={x} key={x + 's'}/>
      </div>
      )
  })}
   </div>
 )
}

export default Faves;
