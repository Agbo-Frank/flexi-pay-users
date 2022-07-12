import { Routes, Route } from 'react-router-dom';
import './index.css';
import {
  Carts, CheckOut, Profile,
  Login, Orders, Dashboard,
  ForgetPassword, Register,
  ResetPassword, SavedItems, 
  Wallet, Product, Products,
  Contact 
} from './page';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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
      <Route path='/product' element={<Product />} />
      <Route path='/saved-items' element={<SavedItems />} />
      <Route path='/checkout' element={<CheckOut />} />
      <Route path='/wallet' element={<Wallet/>} />
      <Route path='/support' element={<Contact />} />
      <Route path='/products' element={<Products />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  );
}

export default App;
