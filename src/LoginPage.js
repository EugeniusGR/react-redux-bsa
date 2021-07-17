import "./App.css";
import LoginPage from "./LoginPage/LoginPage";

function ChatPage() {
  return <LoginPage url="http://localhost:3030/api/users" />;
}

export default ChatPage;
