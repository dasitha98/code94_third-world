import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { resetPassword, signIn } from '../../actions/auth.js';


const ResetPassword = () => {
  const [form, setForm] = useState({password: '', confirmPassword: ''});
  const dispatch = useDispatch();
  const history = useHistory();
  const commonState = useSelector((state) => state.common)

    const {token} = useParams()

    const validation = (object) => {
        for(var key in object) {
            if(object[key] === "" || object[key] === null) {
               return true
            }
        }
        return false
    }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("token", token)
    formData.append("password", form.password)
    const isEmpty = validation(form);
    console.log({form});
    if(isEmpty){
        dispatch(dispatch({type: 'SHOW_ERROR', payload: {message: "Please fill required fields"}}))
    }else{
        if(form.confirmPassword === form.password){
            dispatch(resetPassword(formData, history))
        }else{
            dispatch(dispatch({type: 'SHOW_ERROR', payload: {message: "Passwords should match"}}))
        }
    }
  };


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (

    <div class="container-fluid pb-5">

    <div class="row justify-content-md-center">
      <div class="card-wrapper col-12 col-md-4 mt-5">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Reset Password</h4>
            <form id="form">
                <div class="form-group">
                    <label for="password">New Password</label>
                    <input id="password" type="password" class="form-control" name="password" onChange={handleChange} required />
                </div>

                <div class="form-group">
                    <label for="password">Confirm Password</label>
                    <input id="password" type="password" class="form-control" name="confirmPassword" onChange={handleChange} required />
                </div>

                <div class="form-group no-margin">
                    <button class="btn auth-btn btn-block" onClick={handleSubmit}>
                        {commonState.isLoading? 'Loading.....' : 'Reset'}
                    </button>
                </div>
            </form>
          </div>
        </div>
        <footer class="footer mt-3">
          <div class="container-fluid">
            <div class="footer-content text-center small">
              <span class="text-muted">&copy; <a href='https://thirdworld.io' class="font-weight-bold">thirdworld.io</a> . All Rights Reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </div>



  </div>
  );
};

export default ResetPassword;