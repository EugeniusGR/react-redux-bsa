import { useEffect, useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import "./UserList.css";
import Preloader from "../Chat/Preloader";
import {
  userEdit,
  turnOffLoadUsers,
  isEditUserSwitch,
  currentEditUs,
} from "../actions/index";
import { Link } from "react-router-dom";

function UserListPage() {
  const dispatch = useDispatch();
  const isEdit = useSelector((state) => state.chat.userOnEdit);
  const isEditUser = useSelector((state) => state.chat.isEditUser);
  const currentEditedUser = useSelector(
    (state) => state.chat.currentEditedUser
  );
  const preloaderUsers = useSelector((state) => state.chat.preloaderUsers);

  const [usersArray, setUsersArray] = useState([]);
  const [userLogin, setLogin] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userMail, setEmail] = useState("");

  useEffect(() => {
    async function apiFetch() {
      const url = "http://localhost:3030/api/users";
      const res = await fetch(url);
      const usersData = await res.json();
      dispatch(turnOffLoadUsers());
      if (usersData.length === 0) {
        return <h1>Failed to load data</h1>;
      }
      setUsersArray([...usersData]);
    }
    apiFetch();
  }, []);

  const onAddUser = () => {
    dispatch(userEdit(true));
  };

  const handleLogin = (event) => {
    const value = event.target.value;
    setLogin(value);
  };

  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const submitTo = async () => {
    if (userLogin === "" || userPassword === "" || userMail === "") {
      dispatch(userEdit(false));
      alert("Invalid Data");
      return 0;
    }
    const newUser = {
      login: userLogin,
      password: userPassword,
      mail: userMail,
      adminPermission: false,
    };
    setUsersArray((usersArray) => [...usersArray, newUser]);
    dispatch(userEdit(false));
    try {
      await fetch("http://localhost:3030/api/users/add-new", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json());
      setLogin("");
      setPassword("");
      setEmail("");
    } catch (error) {
      alert(error);
    }
  };

  const deleteUser = async (login) => {
    const newUserArray = usersArray.filter((value) => {
      if (value.login !== login) {
        return value;
      }
    });

    setUsersArray(newUserArray);
    try {
      await fetch(`http://localhost:3030/api/users/delete/${login}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json());
    } catch (error) {
      alert(error);
    }
  };

  const editUser = (login) => {
    dispatch(currentEditUs(login));
    dispatch(isEditUserSwitch(true));
  };

  const submitToEdit = async () => {
    const newUser = {
      login: userLogin,
      password: userPassword,
      mail: userMail,
      adminPermission: false,
    };

    const newUserArray = usersArray.map((value) => {
      if (value.login === currentEditedUser) {
        value.login = userLogin;
        value.password = userPassword;
        value.mail = userMail;
        value.adminPermission = false;
      }
      return value;
    });

    setUsersArray(newUserArray);

    dispatch(isEditUserSwitch(false));

    try {
      await fetch(
        `http://localhost:3030/api/users/update/${currentEditedUser}`,
        {
          method: "PUT",
          body: JSON.stringify(newUser),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      ).then((response) => response.json());
    } catch {}
  };

  if (preloaderUsers) {
    return (
      <div className="container-for-users">
        <Link to="/chat">
          <div className="backToChatButton">back to chat</div>
        </Link>
        {usersArray.map((element) => {
          return (
            <div className="block-user" key={element.login}>
              <h2>{element.login}</h2>
              <h2>{element.mail}</h2>

              <div className="buttons">
                <button onClick={() => editUser(element.login)}>EDIT</button>
                <button onClick={() => deleteUser(element.login)}>
                  DELETE
                </button>
              </div>
            </div>
          );
        })}
        {isEdit ? (
          <div className="EditUser">
            <h2>Login</h2>
            <input type="text" onChange={handleLogin} />
            <h2>Password</h2>
            <input type="password" onChange={handlePassword} />
            <h2>Email</h2>
            <input type="text" onChange={handleEmail} />
            <button className="submit-button" onClick={submitTo}>
              Submit
            </button>
          </div>
        ) : null}
        {isEditUser ? (
          <div className="EditUser">
            <h2>Login</h2>
            <input type="text" onChange={handleLogin} />
            <h2>Password</h2>
            <input type="password" onChange={handlePassword} />
            <h2>Email</h2>
            <input type="text" onChange={handleEmail} />
            <button className="submit-button" onClick={submitToEdit}>
              Edit
            </button>
          </div>
        ) : null}
        <button onClick={onAddUser}>Add User</button>
      </div>
    );
  } else {
    return <Preloader />;
  }
}

export default UserListPage;
