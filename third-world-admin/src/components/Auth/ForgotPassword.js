import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { forgotPassword } from '../../actions/auth.js';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const commonState = useSelector((state) => state.common)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("email", email)
    if(email !== ''){
        dispatch(forgotPassword(formData))
    }else{
        dispatch(dispatch({type: 'SHOW_ERROR', payload: {message: "Please fill required fields"}}))
    }
  };


//   const handleChange = (e) => setEmail({ ...form, [e.target.name]: e.target.value });

  return (

    <div class="container-fluid pb-5">

    <div class="row justify-content-md-center">
      <div class="card-wrapper col-12 col-md-4 mt-5">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Forgot Password</h4>
            <form id="form">
              <div class="form-group">
                <label for="email">Email Address</label>
                <input id="email" type="email" class="form-control" name="email" autofocus="" onChange={(e) => setEmail(e.target.value)} required />
                <small class="form-text text-muted">
                    Enter the email associated with your account to receive a password reset link
                </small>
              </div>

              <div class="form-group no-margin">
                <button class="btn auth-btn btn-block" onClick={handleSubmit}>
                  {commonState.isLoading? 'Loading.....' : 'Submit'}
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

export default ForgotPassword;