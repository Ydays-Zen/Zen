import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../db/firebase-config";
import "./styles/Messages.css"; // Importez le fichier CSS pour les styles

const Messages = ({ currentUser, selectedUser }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!selectedUser) {
      setMessages([]);
      return;
    }

    const messagesRef = collection(firestore, "messages");

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
        newMessages.push({ ...messageData, id: doc.id }); // Inclure l'ID du message dans l'objet message
      });
      setMessages(newMessages);
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser, selectedUser]);

  let scrollDiv = document.querySelector(".messages_read");

  useEffect(() => {
    if (scrollDiv) {
      scrollDiv.scrollTop = scrollDiv.scrollHeight;
    }
  });

  return (
    <div className="body_messages">
      <h2 className="chat_h2">Discussion avec {selectedUser.displayName}</h2>
      <ul className="messages_read">
        {messages &&
          messages.map((message) => (
            <li
              className={`li_messages ${
                // eslint-disable-next-line react/prop-types
                message.participants[0] === currentUser.uid
                  ? "sent"
                  : "received"
              }`}
              key={message.id}
            >
              <span>
                {message.participants[0] === currentUser.uid
                  ? "Moi"
                  : selectedUser.displayName}
                :{" "}
              </span>
              <span className="span_text">{message.text}</span>
              {message.participants[0] === currentUser.uid && message.vues > 0 && <span className="vu_indicator">Vu</span>}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Messages;
