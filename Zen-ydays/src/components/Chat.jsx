import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../context/userContext";
import { firestore } from "../db/firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import './styles/Chat.css';

const Chat = ({ onSelectUser, updateMessageViews }) => {
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
      <h2 className="title-Messages">Message</h2>
      <input
        type="text"
        className="search_user"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul className="user_read">
        {filteredUserList.map((user) => (
          <li className="select_user" key={user.ID} onClick={() => {
            onSelectUser(user);
            updateMessageViews(user); // Appel de la fonction pour mettre à jour les vues
          }}>
            {user.displayName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
