import AuthLayout from '../components/Layout/AuthLayout'
import { Route, Redirect, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import Auth from '../components/Auth/Auth';
import ForgotPassword from '../components/Auth/ForgotPassword';
import ResetPassword from '../components/Auth/ResetPassword';



const AuthRoutes = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push('/auth/login');
    return null
  };

  
  return (
    <AuthLayout>
      {/* auth routes come here */}
      <Route path="/auth/login" exact component={Auth} />
      <Route path="/auth/logout" exact component={logout} />
      <Route path="/auth/forgotpassword" exact component={ForgotPassword} />
      <Route path="/auth/resetpassword/:token" exact component={ResetPassword} />

    </AuthLayout>
  );
}

export default AuthRoutes