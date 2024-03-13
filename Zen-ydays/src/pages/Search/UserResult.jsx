import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UserResult = ({ user }) => {
  if (!user) {
    return <p>Utilisateur non trouvé.</p>;
  }

  const { displayName, id } = user;

  if (!displayName || !id) {
    return <p>Nom d'utilisateur ou identifiant manquant.</p>;
  }

  return (
    <div className="user-result">
      <Link to={`/user/${id}`}>{displayName}</Link>
    </div>
  );
};


export default UserResult;
