import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { auth, firestore } from "../db/firebase-config";
import "./styles/SendMessage.css";

const SendMessage = ({ selectedUser, onMessageSent }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    try {
      if (!selectedUser) {
        console.error("Selected user is undefined.");
        return;
      }

      const messagesRef = collection(firestore, "messages");
      await addDoc(messagesRef, {
        text: message,
        createdAt: serverTimestamp(),
        participants: [auth.currentUser.uid, selectedUser.ID],
        vues: 0, // Ajout du champ "vues" avec une valeur initiale de 0 lors de l'envoi du message
      });

      onMessageSent();
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="message-input-container">
      <input
        className="input_message"
        placeholder="Type a message..."
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="btn_send"
        onClick={sendMessage}
        disabled={!message.trim()} // Désactiver le bouton si le message est vide ou composé uniquement d'espaces
      >
        <FontAwesomeIcon icon={faPaperPlane} size="lg" color="white" />
      </button>
    </div>
  );
};

export default SendMessage;
