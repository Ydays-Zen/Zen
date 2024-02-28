import React, { Component } from "react";
import { Info_userDifferent } from "../../components/Info_userDifferent";

class UserDifferent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetUserId: null,
    };
  }

  componentDidMount() {
    const { userId } = this.props.match.params;
    this.setState({ targetUserId: userId });
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
