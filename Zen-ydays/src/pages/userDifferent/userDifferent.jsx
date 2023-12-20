import React, { Component } from "react";
import "./userDifferent.css";
import Info_userDifferent from "../../components/info_userDifferent.jsx";
import SubManager from "../../SubManager/SubManager.jsx";

class UserDifferent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      currentUserId: 1,
      targetUserId: 2,
    };
  }

  render() {
    return (
      <>
      <Info_userDifferent userId={this.state.targetUserId} />
      </>
    );
  }
}

export default UserDifferent;
