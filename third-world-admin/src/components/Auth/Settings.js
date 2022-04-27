import React from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import editICon from '../../assets/icons/editIcon.svg';
import Link from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, getUserData, updatePassword, updateUser } from '../../actions/auth';
import Select from 'react-select';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from "../Helpers/loader"
import { getUserList, deleteUser } from '../../actions/auth.js';
import $ from 'jquery'


// import { useHistory } from 'react-router-dom';

const Setting = () => {


  // general
  
  const [userDetails, setUserDetails] = useState('');
  const [password, setPassword] = useState({password: '', confirmPassword: ''});
  const [user, setUser] = useState({name: '', email: '', position: '', password: 'admin123'});
  const [showPasswords, setShowPasswords] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);

  //get user list
  const dispatch = useDispatch();

  const users = useSelector((state) => state?.auth.userList);
  const commonState = useSelector((state) => state.common);


  useEffect(() => {
    dispatch(getUserList())
  }, [dispatch])



  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('profile'));
    console.log("items ", items)
    if (items) {
      setUserDetails(items.result);
    }
  }, []);

  const handleChange = (e) => setUser({ ...user, [e.target.id]: e.target.value });
  const handlePasswordChange = (e) => setPassword({ ...password, [e.target.id]: e.target.value });
  const handleUserDetailsChange = (e) => setUserDetails({ ...userDetails, [e.target.id]: e.target.value });

  const validation = (object) => {
    for(var key in object) {
        if(object[key] === "" || object[key] === null) {
           return true
        }
    }
    return false
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("email", userDetails.email);
    formData.append("name", userDetails.name);
    const isEmpty = validation(userDetails);
    if(isEmpty){
      document.getElementById('user-details').classList.add('was-validated')
      dispatch(dispatch({type: 'SHOW_ERROR', payload: {message: "Please fill required fields"}}))
    }else{
      dispatch(updateUser(userDetails._id, formData))
    }
  }

  const handleNewUserSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()

    // formData.append("image", "null");
    formData.append("email", user.email);
    formData.append("name", user.name);
    formData.append("password", user.password);
    formData.append("isSuperAdmin", true);
    formData.append("position", user.position);

    const isEmpty = validation(user);

    console.log(user)
    if(isEmpty){
      document.getElementById('form').classList.add('was-validated')
      dispatch(dispatch({type: 'SHOW_ERROR', payload: {message: "Please fill required fields"}}))
    }else{
      dispatch(addUser(formData))
      setUser({})
      $('#addUserModal .close').click()
      document.getElementById('form').classList.remove('was-validated')
    }
  };

  const handleNewPasswordSubmit = (e) => {
    e.preventDefault()
    console.log(password);
    const formData = new FormData()
    formData.append("password", password.password);
    const isEmpty = validation(password);
    if(isEmpty){
      document.getElementById('form-password').classList.add('was-validated')
      dispatch(dispatch({type: 'SHOW_ERROR', payload: {message: "Please fill required fields"}}))
    }else{
      if(password.password === password.confirmPassword){
        dispatch(updatePassword(userDetails._id, formData))
        setPassword({password: '', confirmPassword: ''})
        $('#changePasswordModal .close').click()
        document.getElementById('form').classList.remove('was-validated')
      }else{
        dispatch(dispatch({type: 'SHOW_ERROR', payload: {message: "Passwords don't match"}}))
      }
    }
  }

  const selectOptions = [
    { value: 'User', label: 'User' },
    { value: 'Admin', label: 'Admin' }
  ];

  return (
    <>
      <div className="main-blog-sec">
        <div className="d-flex justify-content-between align-items-center">
          <h2>ACCOUNT SETTINGS</h2>
          {userDetails?.position === "Admin" ?
            <button
              className="add-btn"
              data-bs-toggle="modal" data-bs-target="#addUserModal"
            >
              New User
            </button>
          :
            null
          }
        </div>
        <div class="container mt-5">
          <ul
            id="myTab"
            class="nav nav-v2 nav-primary nav-justified d-block d-xl-flex w-100 border-bottom"
            role="tablist"
          >
            <li class="nav-item border-bottom border-xl-bottom-0">
              <a
                class="nav-link d-flex align-items-center py-2 px-3 p-xl-3 active"
                href="#general"
                role="tab"
                aria-selected="false"
                data-toggle="tab"
              >
                <b>General</b>
              </a>
            </li>
            <li class="nav-item border-bottom border-xl-bottom-0">
              <a
                class="nav-link d-flex align-items-center py-2 px-3 p-xl-3"
                href="#users"
                role="tab"
                aria-selected="true"
                data-toggle="tab"
              >
                <b>Users</b>
              </a>
            </li>
          </ul>

          <div class="card-body tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="general"
              role="tabpanel"
              aria-labelledby="contact-tab"
              >
              <form id="user-details">
                <div class="row justify-content-start my-8 d-flex justify-content-center align-items-center">

                  <div class="col-4">
                    <h5 class="font-weight-bold">User Profile</h5>
                    <p className="text-muted">
                      Update your profile details
                    </p>
                  </div>
                  <div class="col-8">
                    <div class="row  d-flex align-items-center">
                      <div class="col-3">
                        <h5 class="font-weight-bold">Name</h5>
                      </div>
                      <div class="col-9">
                        <div class="input-group">
                          <input
                            type="text"
                            class="form-control bg-light"
                            placeholder="name"
                            name='name'
                            id='name'
                            onChange={handleUserDetailsChange}
                            value={userDetails?.name}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr /> 

                <div class="row justify-content-start mt-10 mb-5">
                  <div class="col-4">
                    <h5 class="font-weight-bold">Security</h5>
                    <p className="text-muted">
                      Update your security details regularly
                    </p>
                  </div>
                  <div class="col-8">
                    <div class="row d-flex align-items-center">
                      <div class="col-3">
                        <h5 class="font-weight-bold">Email</h5>
                      </div>
                      <div class="col-9">
                        <div class="input-group">
                          <input
                            type="text"
                            class="form-control bg-light"
                            placeholder="ABC@gmail.com"
                            name='email'
                            id='email'
                            onChange={handleUserDetailsChange}
                            value={userDetails?.email}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div class="row mt-5  d-flex align-items-center">
                      <div class="col-3">
                        <h5 class="font-weight-bold">Password</h5>
                      </div>
                      <div class="col-9">
                        <div class="input-group">
                          {/* <input
                            type="text"
                            class="form-control bg-light"
                            placeholder="*********"
                          /> */}
                          <button type="button" class="btn bg-light btn-block" data-bs-toggle="modal" data-bs-target="#changePasswordModal">Change Password</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="update-btn float-right mb-5" onClick={(e) => handleUpdate(e)}>
                  Save Changes
                </button>
              </form>
            </div>

            <div
              class="tab-pane fade"
              id="users"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              {commonState.isLoading ? (
                <div
                  style={{ height: "70vh" }}
                  className="d-flex justify-content-center align-items-center table-data"
                >
                  <Loader />
                </div>
              ) : (
                <table class="table text-center user-table">
                  <thead>{console.log(userDetails)}
                    <tr class="table-active">
                      <th class="h5">NAME</th>
                      <th class="h5">POSITION</th>
                      <th class="h5">EMAIL</th>
                      {userDetails?.position === "Admin" ? <th class="h5">ACTION</th> : null }
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user) => (
                      <tr key={user?._id}>
                        <th class="col-3">{user?.name}</th>
                        <td class="col-3 mt-4">{user?.position}</td>
                        <td class="col-3">{user?.email}</td>
                        {userDetails?.position === "Admin" ?
                          <td class="col-3">
                            <button
                              type="button"
                              class="btn  px-3 py-2 button-class"
                              data-toggle="modal"
                              data-target="#deleteModal"
                              onClick={() => setSelectedUser(user)}
                            >
                              User Remove
                            </button>
                          </td>
                        : null }
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
        <div class="modal-dialog bg-light">
          <div class="modal-content">
              <div class="row justify-content-end">
                <div class="col-2">
                  <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="col-4">
                  <h4 class="modal-title font-weight-bold" id="addUserModalLabel">New User</h4>
                </div>
              </div>
            <div class="modal-body">
              <form id='form'>
                <div class="row mb-4">
                    <div class="col-1">
                      <label for="recipient-name" class="col-form-label font-weight-bold">Name</label>
                    </div>
                    <div class="col-12">
                      <input type="text" class="form-control" id="name"  name="name" onChange={handleChange}/>
                    </div>
                </div>
                <div class="row mb-4">
                    <div class="col-1">
                      <label for="recipient-email" class="col-form-label font-weight-bold">Email</label>
                    </div>
                    <div class="col-12">
                      <input type="text" class="form-control" id="email" name="email"  onChange={handleChange}/>
                    </div>
                </div>
                <div class="row mb-4">
                    <div class="col-1">
                      <label for="recipient-position" class="col-form-label font-weight-bold">Position</label>
                    </div>
                    <div class="col-12">
                      {/* <input type="text" class="form-control" id="position" name="position" onInput={Input}/> */}
                      {/* <Select
                        // value={selectedOption}
                        id="position"
                        name="position"
                        onChange={setSelectedOption}
                        options={options}
                      /> */}
                      <select class="form-control" id="position" name="position"  onChange={handleChange}>
                        <option value="">Select Option</option>  
                        {selectOptions.map(option => {
                          return(
                            <option value={option.value}>{option.value}</option>  
                          )
                        })}
                      </select>
                    </div>
                </div>

                <div class="row justify-content-center">
                      <button onClick={(e) => handleNewUserSubmit(e)} class="btn btn btn-dark btn-m px-3 py-2 mb-4" data-bs-dismiss="modal">Add User</button>
                </div>
              
              </form>
            </div>
              
          </div>
        </div>
      </div>


      <div class="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
        <div class="modal-dialog bg-light">
          <div class="modal-content">
              <div class="row justify-content-end">
                <div class="col-2">
                  <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="col-6">
                  <h4 class="modal-title font-weight-bold" id="changePasswordModalLabel">Change Password</h4>
                </div>
              </div>
            <div class="modal-body">
              <form id='form-password'>
                <div class="row mb-4">
                    <div class="col-12">
                      <label for="recipient-name" class="col-form-label font-weight-bold">New password</label>
                      <input type={showPasswords? "text" : "password"} class="form-control" id="password"  name="password" onChange={handlePasswordChange} required />
                    </div>
                </div>
                <div class="row mb-4">
                    <div class="col-12">
                      <label for="recipient-name" class="col-form-label font-weight-bold">Confirm password</label>
                      <input type={showPasswords? "text" : "password"} class="form-control" id="confirmPassword"  name="confirmPassword" onChange={handlePasswordChange} required />
                    </div>
                </div>
                <div class="form-check mb-4">
                  <input type="checkbox" class="form-check-input" id="exampleCheck1" onClick={() => setShowPasswords(!showPasswords)} />
                  <label class="form-check-label" for="exampleCheck1">Show Passwords</label>
                </div>

                <div class="row justify-content-center">
                      <button onClick={(e) => handleNewPasswordSubmit(e)} class="add-btn px-3 py-2 mb-4">Change</button>
                </div>
              
              </form>
            </div>
              
          </div>
        </div>
      </div>

      {/* delete modal  */}
      <div id="deleteModal" class="modal fade " aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="exampleModal">Are You Sure?</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body">
                      This User will permanently delete form the record.
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-light" data-dismiss="modal">Cancel</button>
                      <button type="button" class="btn btn-danger" onClick={() => dispatch(deleteUser(selectedUser._id))} data-dismiss="modal">Yes! go ahead.</button>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
};

export default Setting;