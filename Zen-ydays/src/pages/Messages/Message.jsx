// Message.jsx
import { useContext, useState } from "react";
import Chat from "../../components/Chat";
import Messages from "../../components/Messages";
import SendMessage from "../../components/SendMessage";
import { UserContext } from "../../context/userContext";
import Header from "../../layout/home/Header";



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