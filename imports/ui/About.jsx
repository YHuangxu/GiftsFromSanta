    
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }
  render() {
    const About = (
      <div className="container">
        
      </div>
    );

    const Profile = {

    };

    return (
      <div className = "container">
        {Meteor.userId()? Profile : About}
      </div>
    );
  }
}

About.propTypes = {
  
};

export default withTracker(() => {
 

  return {
  
  };
})(About);