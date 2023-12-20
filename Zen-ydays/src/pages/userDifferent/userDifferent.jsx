import React, { Component } from "react";
import "./userDifferent.css";
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

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    fetch(`http://localhost:3000/user/${this.state.targetUserId}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          user: data,
        });
      });
  };

  handleFollow = () => {
    SubManager.follow(this.state.currentUserId, this.state.targetUserId);
    console.log(`Vous suivez l'utilisateur avec l'ID : ${this.state.targetUserId}`);
  };

  render() {
    return (
      <>
      </>
    );
  }
}

export default UserDifferent;
