import { Routes, Route } from 'react-router-dom';
import './index.css';
import Carts from './page/Cart';
import CheckOut from './page/CheckOut';
import Dashboard from './page/Dashboard';
import ForgetPassword from './page/ForgetPassword/index';
import Login from './page/Login/index';
import Orders from './page/Order';
import Register from './page/Register/index';
import ResetPassword from './page/ResetPassword/index';
import SavedItems from './page/SavedItems';

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
    </Routes>
  );
}

export default App;
