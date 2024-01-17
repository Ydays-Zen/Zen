// Messages.jsx
import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy, doc } from 'firebase/firestore';
import { firestore } from '../db/firebase-config';

const Messages = ({ currentUser, selectedUser }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Si selectedUser n'est pas encore défini, ne rien faire
        if (!selectedUser) return;

        // Créer une référence à la collection de messages
        const messagesRef = collection(firestore, 'messages');

        // Créer une requête pour les messages entre currentUser et selectedUser
        const q = query(
            messagesRef,
            where('participants', '==', [currentUser.uid, selectedUser.ID]),
            orderBy('createdAt')
        );

        // Mettre en place un écouteur en temps réel pour les messages
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newMessages = [];
            querySnapshot.forEach((doc) => {
                const messageData = doc.data();
                console.log('Message ID:', doc.id); // Ajoutez cette ligne pour déboguer
                newMessages.push(messageData);
            });
            setMessages(newMessages);
        });

        // Nettoyer l'écouteur lors du démontage du composant
        return () => unsubscribe();
    }, [currentUser, selectedUser]);

    return (
        <div>
            <h2>Discussion avec {selectedUser.displayName}</h2>
            <ul>
                {messages &&
                    messages.map((message) => (
                        <li key={message.id} className={message.participants.includes(currentUser.ID) ? 'sent' : 'received'}>
                            <span>{message.participants.includes(currentUser.ID) ? 'Moi' : selectedUser.displayName}: </span>
                            <span>{message.text}</span>
                            <span>{message.createdAt && message.createdAt.toDate().toLocaleString()}</span>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Messages;
