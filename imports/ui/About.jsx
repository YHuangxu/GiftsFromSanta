    
import React, { Component } from "react";

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }
  render() {
    return (
      <div className="container about-page">
        <div className ="About">
          <br/><br/>
          <h1>❄️About❄️</h1><br/>
          <h4>Santa's Elves want to know what to make in their toy factory for Christmas. 
            <br/> Kids can create an account with us and let us know what gifts they want. 
            <br/> Santa will send out all the gifts on Christmas Eve.<br/><br/>
          </h4>
        </div>

        <div className = "How">
          <h1>❄️How to use❄️</h1><br/>
          <h4>❣️ Sign up a new account </h4>
          <h4>❣️ Fill out the profile form </h4>
          <h4>❣️ Pick Christmas gifts from our inventory </h4>
          <ul>
            <li>Search for the gifts you want</li>
            <li>If no result comes out, a <span>🌟Magic Button🌟</span> will let you add your desired gift</li>
          </ul>
          <h4>❣️ Update your wishes till Christmas</h4>
        </div>
      </div>
    );
  }
}