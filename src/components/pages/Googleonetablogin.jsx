import React, { useEffect, useState,useContext } from 'react';
import '../../App.css';
// import jwt_decode from 'jwt-decode';
// import { decode } from 'jwt-decode';
import * as jwt_decode from 'jwt-decode';



import { DataContext } from '../../contexts/DataContextProvider';



function Googleonetablogin() {

  const {data, setData,token, setToken}=useContext(DataContext)
 
  console.log("user", data)
  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token:" + response.credential)
    var userObject = jwt_decode.default(response.credential);
    // var userObject = decode(response.credential);
    // var userObject = jwt_decode(response.credential)
    setData(userObject)
    document.getElementById("signInDiv").hidden = true;
    console.log("userObject", userObject)
  }
  useEffect(() => {
    //google client Id
    window.google.accounts.id.initialize({
      client_id: "1061442873056-t4jstmkpoorvg0bj4eeqrbps1v5rf8g3.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    )
    window.google.accounts.id.prompt();
  }, [])
  const logout = (e) => {
    setData({});
    document.getElementById("signInDiv").hidden = false;
    console.log("logout");
    // setLoginStatus(false);
  };
  return (
    <div className="App">
      <div id="signInDiv"></div>
      <button onClick={(e) => logout(e)}>SignOut</button>
      {
        data &&
        <div>
          <img src={data.picture}></img>
          <h3>{data.name}</h3>
        </div>
      }
    </div>
  );
}

export default Googleonetablogin;



