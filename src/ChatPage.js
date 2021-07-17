import "./App.css";
import Chat from "./Chat/Chat";

function ChatPage() {
  return <Chat url="http://localhost:3030/api/messages" />;
}

export default ChatPage;
