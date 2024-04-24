import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserResult = ({ user }) => {
  const { displayName, img } = user;

  return (
    <Link to={`/check/userDifferent/${user.ID}`} className="link">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={img}
          alt=""
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
          }}
        />
        <h2>{displayName}</h2>
      </div>
    </Link>
  );
};

UserResult.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    ID: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserResult;
