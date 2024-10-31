import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector(
    (state: any) => state.accountReducer);

  const fetchProfile = () => {
    if (!currentUser)
      return navigate("/Kanbas/Account/Signin");
    setProfile(currentUser);
  };
  const signout = () => {
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };
  useEffect(() => { fetchProfile(); }, []);

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <label htmlFor="wd-username" style={{ fontWeight: 'bold', width: '150px', marginRight: '10px', textAlign: 'left'}}>Username:</label>
            <input defaultValue={profile.username}
                    id="wd-username"
                    className="form-control mb-2"
                    onChange={(e) => setProfile({
                      ...profile, username:  e.target.value })}/>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <label htmlFor="wd-password" style={{ fontWeight: 'bold', width: '150px', marginRight: '10px', textAlign: 'left' }}>Password:</label>
            <input defaultValue={profile.password}
                    id="wd-password"
                    className="form-control mb-2"
                    onChange={(e) => setProfile({
                      ...profile, password:  e.target.value })}/>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <label htmlFor="wd-firstname" style={{ fontWeight: 'bold', width: '150px', marginRight: '10px', textAlign: 'left' }}>First Name:</label>
            <input defaultValue={profile.firstName}
                    id="wd-firstname"
                    className="form-control mb-2"
                    onChange={(e) => setProfile({
                      ...profile, firstName: e.target.value })}/>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <label htmlFor="wd-lastname" style={{ fontWeight: 'bold', width: '150px', marginRight: '10px', textAlign: 'left' }}>Last Name:</label>
            <input defaultValue={profile.lastName}
                    id="wd-lastname"
                    className="form-control mb-2"
                    onChange={(e) => setProfile({
                      ...profile, lastName:  e.target.value })}/>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <label htmlFor="wd-dob" style={{ fontWeight: 'bold', width: '150px', marginRight: '10px', textAlign: 'left' }}>Date of Birth:</label>
              <input defaultValue={profile.dob}
                      id="wd-dob"
                      className="form-control mb-2"
                      onChange={(e) => setProfile({
                      ...profile, dob: e.target.value })} type="date"/>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <label htmlFor="wd-email" style={{ fontWeight: 'bold', width: '150px', marginRight: '10px', textAlign: 'left' }}>Email:</label>
            <input defaultValue={profile.email}
                    id="wd-email"
                    className="form-control mb-2"
                    onChange={ (e) => setProfile({
                      ...profile, email: e.target.value })}/>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <label htmlFor="wd-role" style={{ fontWeight: 'bold', width: '150px', marginRight: '10px', textAlign: 'left' }}>Role:</label>
            <select onChange={(e) => setProfile({
                      ...profile, role:  e.target.value })}
                      id="wd-role"
                      className="form-control mb-2" 
                    >
              <option value="USER">User</option>{" "} 
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>{" "}
              <option value="STUDENT">Student</option>
            </select>
          </div>

        <button 
          onClick={signout}
          className="btn btn-danger w-100 mb-2"
          id="wd-signout-btn">
          Sign out
        </button>
      </div>
    )}
</div>);}






/* import { Link } from "react-router-dom";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <input id="wd-username" value="alice" placeholder="username" className="form-control mb-2"/>
      <input id="wd-password" value="123" placeholder="password"
        type="password" className="form-control mb-2" />
      <input id="wd-firstname" value="Alice" placeholder="First Name" className="form-control mb-2" />
      <input id="wd-lastname" value="Wonderland" placeholder="Last Name" className="form-control mb-2"/>
      <input id="wd-dob" placeholder="mm/dd/yyyy" type="date" className="form-control mb-2" />
      <input id="wd-email" value="alice@wonderland.com" type="email" className="form-control mb-2"/>
      <select id="wd-role" className="form-control mb-2">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select><br/>
      <Link to="/Kanbas/Account/Signin" className="btn btn-danger w-100" >Sign out</Link>
    </div>
);} */
