import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { signIn } from '../../actions/auth.js';

const initialState = {email: '', password: ''};

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [showPasswords, setShowPasswords] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const commonState = useSelector((state) => state.common)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("email", form.email)
    formData.append("password", form.password)
    dispatch(signIn(formData, history))
    console.log();
  };


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (

    <div class="container-fluid pb-5">

    <div class="row justify-content-md-center">
      <div class="card-wrapper col-12 col-md-4 mt-5">
        <div class="brand text-center mb-3">
          <a href="/"><img src="/documentation/assets/img/logo-mini.png" /></a>
        </div>
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Login</h4>
            <form id="form">
              <div class="form-group">
                <label for="email">E-Mail Address</label>
                <input id="email" type="email" class="form-control" name="email" autofocus="" onChange={handleChange} required />
              </div>

              <div class="form-group">
                <label for="password">Password
                </label>
                <input id="password" type={showPasswords? "text" : "password"} class="form-control" name="password" onChange={handleChange} required />
              </div>

              <div class="form-check mb-4">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" onClick={() => setShowPasswords(!showPasswords)} />
                <label class="form-check-label" for="exampleCheck1">Show Passwords</label>
              </div>

              <div class="form-group no-margin">
                <button class="btn auth-btn btn-block" onClick={handleSubmit}>
                  {commonState.isLoading? 'Loading.....' : 'Log in'}
                </button>
              </div>

              <div class="form-group no-margin">
                <Link to={'/auth/forgotpassword'}><b>forgot password ?</b></Link>
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

export default SignUp;