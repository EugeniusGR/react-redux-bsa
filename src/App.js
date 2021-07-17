import "./App.css";
import ChatPage from "./ChatPage";
import UserListPage from "./UserListPage/UserList";
import LoginPage from "./LoginPage";
import ModalWindow from "./Chat/ModalWindow";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import errorPage from "./404Page";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/chat" component={ChatPage} />
          <Route path="/user-list" component={UserListPage} />
          <Route path="/edit-message" component={ModalWindow} />
          <Route path="/" component={errorPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
