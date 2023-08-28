import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const url = "https://localhost:44377/RegisterStudent";
const getUserUrl = "https://localhost:44377/GetStudent";
const getAllUrl = "https://localhost:44377/GetAllStudent"

function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getData()
  })

  const getData = () => {
    axios
      .get(getAllUrl, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const usernameChange = (e) => {
    setUsername(e.target.value);
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordchange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Clicked");
    axios
      .post(
        url,
        {
          username: username,
          email: email,
          password: password,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUser = () => {
    axios
      .get(getUserUrl + "/" + username, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        console.log(response);
        setEmail(response.data.email);
        setPassword(response.data.password);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <label>username</label>
        <input value={username} onChange={usernameChange}></input>
        <label>email</label>
        <input value={email} onChange={emailChange}></input>
        <label>password</label>
        <input value={password} onChange={passwordchange}></input>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        <h3>User details</h3>
        <label>username</label>
        <input value={username} onChange={usernameChange}></input>
        <label>email</label>
        <input value={email} disabled></input>
        <label>password</label>
        <input value={password} disabled></input>
        <button onClick={getUser}>Get user by username</button>
      </div>
      <div>
        <table style={{width : 500}}>
          <thead>
            <tr>
              <td>Username</td>
              <td>Email</td>
              <td>Password</td>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => 
            <tr>
              <td>{row.username}</td>
              <td>{row.email}</td>
              <td>{row.password}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
