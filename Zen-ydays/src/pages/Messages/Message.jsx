// Message.jsx
import React, { useContext, useState } from 'react';
import Chat from '../../components/Chat';
import Messages from '../../components/Messages';
import SendMessage from '../../components/SendMessage';
import { UserContext } from '../../context/userContext';
import HeaderAll from '../../layout/HeaderAll';

import './Message.css';

const Message = () => {
  const { userList, currentUser } = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState(null);

  const onSelectUser = (user) => {
    setSelectedUser(user);
  };


  return (
    <div className="app-container">
      <HeaderAll />
      <div className="main-container">
        <Chat userList={userList} onSelectUser={onSelectUser} />
        {selectedUser && (
          <div className="chat-container">
            <Messages currentUser={currentUser} selectedUser={selectedUser} />
            <SendMessage selectedUser={selectedUser} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
