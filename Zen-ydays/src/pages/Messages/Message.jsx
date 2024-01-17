// Message.jsx
import React, { useState, useEffect, useContext } from 'react';
import Header from '../../layout/home/Header';
import Chat from '../../components/Chat';
import SendMessage from '../../components/SendMessage';
import Messages from '../../components/Messages';
import { UserContext } from '../../context/userContext';

const Message = () => {
  const { userList, currentUser } = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState(null);

  const onSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <Header />
      <Chat userList={userList} onSelectUser={onSelectUser} />
      {selectedUser && (
        <div>
          <Messages currentUser={currentUser} selectedUser={selectedUser} />
          <SendMessage selectedUser={selectedUser} />
        </div>
      )}
    </div>
  );
};

export default Message;