import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
export default function Signup() {
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    navigate("/Kanbas/Account/Profile");
  };
  return (
    <div className="wd-signup-screen">
      <h1>Sign up</h1>
      <input 
        value={user.username} 
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="wd-username form-control mb-2" 
        placeholder="username" />
      <input  
        value={user.password} 
        onChange={(e) => setUser({ ...user, password: e.target.value })} 
        type="password"
        className="wd-password form-control mb-2" 
        placeholder="password" />
      <button 
        onClick={signup} 
        className="wd-signup-btn btn btn-primary mb-2 w-100"> 
        Sign up 
      </button><br />
      <Link to="/Kanbas/Account/Signin" className="wd-signin-link">
        Sign in
      </Link>
    </div>
);}


/* import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";
export default function Signup() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signup = async () => {
    const user =  await client.signup(credentials); 
  if (!user) return;
  dispatch(setCurrentUser(user));
  navigate("/Kanbas/Account/Profile");
};
  return (
    <div id="wd-signup-screen">
    <h1>Sign up</h1>
    <input defaultValue={credentials.username}
            onChange={(e) => setCredentials({
              ...credentials, username: e.target.value })}
            className="form-control mb-2"
            id="wd-username" 
            placeholder="username" />
    <input defaultValue={credentials.password}
            onChange={(e) => setCredentials({ ...credentials,
              password: e.target.value })}
            className="form-control mb-2"
            id="wd-password"
            placeholder="password" 
            type="password"/>
    <button onClick={signup}
            className="btn btn-primary w-100"
            id="wd-signin-btn"> 
            {" "} Sign up {" "}</button>
            <br />
    <Link id="wd-signin-link" to="/Kanbas/Account/Signin">
      Sign in </Link>
  </div>
);} */



/* import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <input placeholder="username"  className="form-control mb-2"/>
      <input placeholder="password" type="password"  className="form-control mb-2"/>
      <input placeholder="verify password" type="password"  className="form-control mb-2"/>
      <Link to="/Kanbas/Account/Profile" className="btn btn-primary w-100" > Sign up </Link><br />
      <Link to="/Kanbas/Account/Signin" >Sign in</Link>
    </div>
);} */
