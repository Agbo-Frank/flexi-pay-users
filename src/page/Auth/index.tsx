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
    <AuthenticationForm>
      <div className='flex justify-between items-center w-full px-2 py-6 border-b border-solid border-grey-100'>
          <Logo />
          {/* <div className='hidden md:flex gap-5 items-center text-grey-200'>
              <span>{location.pathname === '/auth/register'? 'Already have an account?' :'Don’t have an account?'}</span>
              <Link to={location.pathname === '/auth/register' ? "/auth/login" :"/auth/register"} className='py-2  px-8 border border-solid border-grey-100 rounded-full'>{location.pathname === '/auth/register'? 'Login' : 'Register'}</Link>
          </div> */}
      </div>
      <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/forget-password" element={<ForgetPassword />}/>
          <Route path="/reset-password" element={<ResetPassword />}/>
          <Route path="/verify/email" element={<VerifyEmail />}/>
      </Routes>
    </AuthenticationForm>
  );
}

export default Auth;
