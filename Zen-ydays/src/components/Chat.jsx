import React, { useContext } from 'react';
import { UserContext } from "../context/userContext";
import './styles/Chat.css';

const Chat = ({ userList, onSelectUser }) => {
  const { currentUser } = useContext(UserContext);

  if (!userList || userList.length === 0) {
    return <div>Loading...</div>;
  }

  // Filtrer la liste des utilisateurs pour exclure l'utilisateur connecté
  const filteredUserList = userList.filter(user => user.ID !== currentUser.uid);

  return (
    <div className="content-user">
          <h2 class="user_h2">Utilisateurs</h2>
          <ul class="user_read">
            {filteredUserList.map((user) => (
              <li class="select_user" key={user.ID} onClick={() => onSelectUser(user)}>
                {user.displayName}
              </li>
            ))}
          </ul>
    </div>
  );
};

export default Chat;