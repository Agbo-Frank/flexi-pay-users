import { Routes, Route } from 'react-router-dom';
import './index.css';
import {
  Carts, CheckOut, 
  Login, Orders, Dashboard,
  ForgetPassword, Register,
  ResetPassword, SavedItems 
} from './page';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/forget-password" element={<ForgetPassword />}/>
      <Route path="/reset-password" element={<ResetPassword />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path='/cart' element={<Carts />} />
      <Route path='/order' element={<Orders />} />
      <Route path='/saved-items' element={<SavedItems />} />
      <Route path='/checkout' element={<CheckOut />} />
      <Route path='/wallet' element={<CheckOut />} />
    </Routes>
  );
}

export default App;
