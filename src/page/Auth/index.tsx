import { AuthenticationForm } from '../../components';

import { Link, Route, Routes, useLocation} from 'react-router-dom'
import Login from './Login';
import Register from './Register';
import ForgetPassword from './ForgetPassword';
import ResetPassword from './ResetPassword';
import VerifyEmail from './VerifyEmail';
import { Logo } from '../../components/icons';

export function Auth() {
  let location = useLocation()
  return (
    <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/forget-password" element={<ForgetPassword />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
        <Route path="/verify/email" element={<VerifyEmail />}/>
    </Routes>
  );
}

export default Auth;
