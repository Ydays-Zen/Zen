import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SendMessage from '../../components/SendMessage';

const UserResult = ({ user, handleUser }) => {
  const { displayName, ID } = user;
  const [showSendMessage, setShowSendMessage] = useState(false); // État pour contrôler l'affichage de SendMessage

  const handleClickMessage = () => {
    handleUser(user); // Passez l'utilisateur sélectionné à la fonction handleUser
    setShowSendMessage(true); // Afficher le composant SendMessage lorsque le bouton est cliqué
  };

  return (
    <div className="user-result">
      <h4>{displayName}</h4>
      <h4>{ID}</h4>
      <button onClick={handleClickMessage}>Message</button>
      {/* Afficher le composant SendMessage uniquement si showSendMessage est true */}
      {showSendMessage && <SendMessage selectedUser={user} />}
    </div>
  );
};

UserResult.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    ID: PropTypes.string.isRequired,
  }).isRequired,
  handleUser: PropTypes.func.isRequired, // Ajoutez handleUser comme prop
};

export default UserResult;
