import { Component } from "react";
import Info_userDifferent from "../../components/info_userDifferent.jsx";
import Subscription from "../../components/Subscription.jsx";
import "./userDifferent.css";

class UserDifferent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      currentUserId: 1,
      targetUserId: 2,
    };

    this.subscriptionInstance = new Subscription("NomUtilisateur");  // Utiliser le nom d'utilisateur approprié
  }

  // Méthode pour suivre l'utilisateur cible
  handleFollow = async () => {
    const targetUserId = this.state.targetUserId;
    await this.subscriptionInstance.followUser(targetUserId);

    console.log(`Vous suivez l'utilisateur avec l'ID : ${targetUserId}`);
  };

  // Méthode pour se désabonner de l'utilisateur cible
  handleUnfollow = async () => {
    const targetUserId = this.state.targetUserId;
    await this.subscriptionInstance.unfollowUser(targetUserId);

    console.log(`Vous ne suivez plus l'utilisateur avec l'ID : ${targetUserId}`);
  };

  render() {
    return (
      <>
        <Info_userDifferent userId={this.state.targetUserId} />
        <button onClick={this.handleFollow}>Suivre</button>
        <button onClick={this.handleUnfollow}>Ne plus suivre</button>
      </>
    );
  }
}

export default UserDifferent;
