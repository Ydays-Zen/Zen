import React, { Component } from "react";
import "./userDifferent.css";
import UserDifferent from "../../components/info_userDifferent.jsx";
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
      <UserDifferent />
      </>
    );
  }
}

export default UserDifferent;
