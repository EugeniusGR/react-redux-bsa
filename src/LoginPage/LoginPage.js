import { React, useEffect, useState } from "react";
import "./LoginPage.css";
import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router";

import { initializeUsers } from "../actions/index";

function LoginPage(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.chat.users);

  const [stateLogin, setStateLogin] = useState("");
  const [statePassword, setStatePassword] = useState("");

  const redirectValid = () => {
    let isExist = false;
    users.forEach((element, index) => {
      if (element.login === stateLogin && element.password === statePassword) {
        if (element.adminPermission) {
          isExist = true;
          history.push("/user-list");
        } else {
          isExist = true;
          history.push("/chat");
        }
      }
    });
    if (!isExist) alert("Wrong login or password");
  };

  useEffect(() => {
    async function apiFetch() {
      const url = props.url;
      const res = await fetch(url);
      const usersData = await res.json();
      if (usersData.length === 0) {
        return <h1>Failed to load data</h1>;
      }
      dispatch(initializeUsers([...usersData]));
    }
    apiFetch();
  }, []);

  const handleChangeLogin = (e) => {
    const value = e.target.value;
    setStateLogin(value);
  };

  const handleChangePassword = (e) => {
    const value = e.target.value;
    setStatePassword(value);
  };

  return (
    <div>
      <div className="WindowField">
        <h1>Please enter your login and password</h1>
        <div className="LoginField">
          <p>Login:</p>
          <input
            type="text"
            className="inputLogin"
            onChange={handleChangeLogin}
            value={stateLogin}
          />
        </div>
        <div className="PasswordField">
          <p>Password:</p>
          <input
            type="password"
            className="inputPassword"
            onChange={handleChangePassword}
            value={statePassword}
          />
        </div>
      </div>
      <button className="button" onClick={redirectValid}>
        {" "}
        JOIN{" "}
      </button>
    </div>
  );
}

export default LoginPage;
