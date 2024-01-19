import React, { useContext } from 'react';
import { UserContext } from "../context/userContext";

const Chat = ({ userList, onSelectUser }) => {
  const { currentUser } = useContext(UserContext);

  if (!userList || userList.length === 0) {
    return <div>Loading...</div>;
  }

  // Filtrer la liste des utilisateurs pour exclure l'utilisateur connecté
  const filteredUserList = userList.filter(user => user.ID !== currentUser.uid);

  return (
    <div>
      <h2>Utilisateurs</h2>
      <ul>
        {filteredUserList.map((user) => (
          <li key={user.ID} onClick={() => onSelectUser(user)}>
            {user.displayName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;