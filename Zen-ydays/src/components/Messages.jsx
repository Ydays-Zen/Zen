// Messages.jsx
import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy, doc } from 'firebase/firestore';
import { firestore } from '../db/firebase-config';
import './styles/Messages.css'; // Importez le fichier CSS pour les styles

const Messages = ({ currentUser, selectedUser }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!selectedUser) {
            setMessages([]);
            return;
        }

        const messagesRef = collection(firestore, 'messages');

        const combinedQuery = query(
            messagesRef,
            where('participants', 'in', [
                [currentUser.uid, selectedUser.ID],
                [selectedUser.ID, currentUser.uid],
            ]),
            orderBy('createdAt')
        );

        const unsubscribe = onSnapshot(combinedQuery, (querySnapshot) => {
            const newMessages = [];
            querySnapshot.forEach((doc) => {
                const messageData = doc.data();
                console.log('Message ID:', doc.id);
                newMessages.push(messageData);
            });
            setMessages(newMessages);
        });

        return () => {
            unsubscribe();
        };
    }, [currentUser, selectedUser]);

    return (
        <div>
            <h2>Discussion avec {selectedUser.displayName}</h2>
            <ul>
                {messages &&
                    messages.map((message) => (
                        <li key={message.id} className={message.participants.includes(currentUser.uid) ? 'sent' : 'received'}>
                            <span>{message.participants.includes(currentUser.uid) ? 'Moi' : selectedUser.displayName}: </span>
                            <span>{message.text}</span>
                            <span>{message.createdAt && message.createdAt.toDate().toLocaleString()}</span>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Messages;