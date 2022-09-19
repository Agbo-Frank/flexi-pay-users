import { Routes, Route } from 'react-router-dom';
import './index.css';
import {
  Carts, CheckOut, Profile,
  Orders, Dashboard, SavedItems, 
  Wallet, Product, Products,
  Contact, Landing,
  Auth,
  Subscriptions
} from './page';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { AuthProvider } from './context/Auth';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/"  element={<Landing  />}/>
        <Route path="auth/*" element={<Auth />}/>
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>}/>
        <Route path='/cart' element={<Carts />} />
        <Route path='/order' element={<RequireAuth><Orders /></RequireAuth>} />
        <Route path='/subscription' element={<RequireAuth><Subscriptions /></RequireAuth>} />
        <Route path='/product/:slug' element={<Product />} />
        <Route path='/saved-items' element={<RequireAuth><SavedItems /></RequireAuth>} />
        <Route path='/checkout' element={<CheckOut />} />
        <Route path='/wallet' element={<RequireAuth><Wallet/></RequireAuth>} />
        <Route path='/support' element={<Contact />} />
        <Route path='/products' element={<Products />} />
        <Route path='/profile' element={<RequireAuth><Profile /></RequireAuth>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
