import PropTypes from "prop-types";

const UserResult = ({ user }) => {
  const { displayName, ID } = user; // Renommez ID en ID pour correspondre à la casse

  // Vérifier si la propriété displayName est définie
  if (!displayName || !ID) {
    // Afficher un message ou un rendu alternatif si displayName est manquant
    return <p>Nom d utilisateur ou IDentifiant manquant.</p>;
  }

  // Rendu normal si displayName est disponible
  return (
    <div className="user-result">
      <h4>{displayName}</h4>
      <h4>{ID}</h4> {/* Utilisez ID au lieu de ID */}
      {/* Ajoutez d'autres informations sur l'utilisateur si nécessaire */}
    </div>
  );
};

// Définition des propTypes pour vérifier les données
UserResult.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    ID: PropTypes.string.isRequired, // Utilisez ID au lieu de ID
    // Ajoutez d'autres propTypes pour les autres propriétés de l'utilisateur si nécessaire
  }).isRequired,
};

export default UserResult;