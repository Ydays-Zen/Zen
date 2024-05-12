// Message.jsx
import React, { useContext, useState, useEffect } from 'react';
import Chat from '../../components/Chat';
import Messages from '../../components/Messages';
import SendMessage from '../../components/SendMessage';
import { UserContext } from '../../context/userContext';

import './Message.css';
import NavBar from '../../components/NavBar';
import NavBarDesktop from '../../components/NarBarDesktop';

const Message = () => {
  const { userList, currentUser } = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const onSelectUser = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 768 est un exemple de largeur pour basculer vers la version mobile
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Vérifie la taille de l'écran au chargement de la page

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {isMobile ? <NavBar /> : <NavBarDesktop />}
      <div className="app-container">
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
    </div>
  );
};

export default Message;