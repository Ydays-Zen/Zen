import { Component } from "react";
import Info_userDifferent from "../../components/Info_userDifferent.jsx";
import "./userDifferent.css";

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
