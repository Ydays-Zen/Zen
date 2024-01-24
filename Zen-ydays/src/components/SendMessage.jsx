// SendMessage.jsx
import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore, auth } from '../db/firebase-config';
import './styles/SendMessage.css';

const SendMessage = ({ selectedUser }) => {

  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    try {
      if (!selectedUser) {
        console.error('Selected user is undefined.');
        return;
      }

      const messagesRef = collection(firestore, 'messages');
      await addDoc(messagesRef, {
        text: message,
        createdAt: serverTimestamp(),
        participants: [auth.currentUser.uid, selectedUser.ID],
      });

      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="message-input-container">
      <input
        className="input_message"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="btn_send" onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default SendMessage;
