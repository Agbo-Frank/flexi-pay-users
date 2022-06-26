import { Routes, Route } from 'react-router-dom';
import './index.css';
import ForgetPassword from './page/ForgetPassword/index';
import Login from './page/Login/index';
import Register from './page/Register/index';
import ResetPassword from './page/ResetPassword/index';

function App() {
  return (
    <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/forget-password" element={<ForgetPassword />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
      </Routes>
  );
}

export default App;
