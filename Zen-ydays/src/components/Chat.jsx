import React from 'react';
import { useContext } from 'react';
import { UserContext } from "../context/userContext";

const Chat = ({ userList, onSelectUser }) => {

  if (!userList || userList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Utilisateurs</h2>
      <ul>
        {userList.map((user) => (
          <li key={user.ID} onClick={() => onSelectUser(user)}>
            {user.displayName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;