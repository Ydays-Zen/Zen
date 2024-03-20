import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../context/userContext";
import { firestore } from "../db/firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import './styles/Chat.css';

const Chat = ({ onSelectUser }) => {
  const { currentUser } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [userList, setUserList] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const q = query(collection(firestore, 'messages'), where('participants', 'array-contains', currentUser.uid));
      const querySnapshot = await getDocs(q);
      const messagesData = [];
      querySnapshot.forEach(doc => {
        messagesData.push(doc.data());
      });
      setMessages(messagesData);
    };
    fetchMessages();
  }, [currentUser]);

  useEffect(() => {
    const usersWithMessages = messages.reduce((acc, message) => {
      message.participants.forEach(participant => {
        if (participant !== currentUser.uid && !acc.includes(participant)) {
          acc.push(participant);
        }
      });
      return acc;
    }, []);

    const fetchUsers = async () => {
      const q = query(collection(firestore, 'users'), where('ID', 'in', usersWithMessages));
      const querySnapshot = await getDocs(q);
      const usersData = [];
      querySnapshot.forEach(doc => {
        usersData.push(doc.data());
      });
      setUserList(usersData);
    };
    fetchUsers();
  }, [messages, currentUser]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUserList = userList.filter(user =>
    user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content-user">
      <input
        type="text"
        placeholder="Rechercher un utilisateur..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <h2 className="user_h2">Utilisateurs</h2>
      <ul className="user_read">
        {filteredUserList.map((user) => (
          <li className="select_user" key={user.ID} onClick={() => onSelectUser(user)}>
            {user.displayName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
