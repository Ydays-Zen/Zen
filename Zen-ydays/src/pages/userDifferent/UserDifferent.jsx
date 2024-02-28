import { Component } from "react";
import { useParams } from "react-router-dom";
import Info_userDifferent from "../../components/Info_userDifferent";
import "./userDifferent.css";

class UserDifferent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: 1,
      targetUserId: null, // Mettez le targetUserId à null par défaut
    };
  }

  componentDidMount() {
    const { userId } = this.props.match.params; // Récupérer l'identifiant de l'utilisateur cible depuis les paramètres d'URL
    this.setState({ targetUserId: userId });
  }

  handleFollow = () => {
    const targetUserId = this.state.targetUserId;
    console.log(`Vous suivez l'utilisateur avec l'ID : ${targetUserId}`);
    // Ajoutez ici la logique pour suivre l'utilisateur avec l'ID targetUserId
  };

  handleUnfollow = () => {
    const targetUserId = this.state.targetUserId;
    console.log(`Vous ne suivez plus l'utilisateur avec l'ID : ${targetUserId}`);
    // Ajoutez ici la logique pour ne plus suivre l'utilisateur avec l'ID targetUserId
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
