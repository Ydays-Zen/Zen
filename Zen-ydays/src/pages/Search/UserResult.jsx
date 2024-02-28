import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UserResult = ({ user }) => {
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

UserResult.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserResult;
