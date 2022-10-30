import { Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import {
  Carts, CheckOut, Profile,
  Orders, Dashboard, SavedItems, 
  Wallet, Product, Products,
  Contact, Landing,
  Auth,
  Subscriptions,
  About,
  Vendor,
  // TermsAndCondition
} from './page';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { AuthProvider } from './context/Auth';
import RequireAuth from './components/RequireAuth';
import TermsAndCondition from './page/TermsAndCondition';
import NotFound from './page/404';
import CountDown from './page/CountDown';
import CategoryPage from './page/Category';
import OrderSummary from './page/Summary';
import Login from './page/Auth/Login';
import Register from './page/Auth/Register';
import { useEffect } from 'react';

function App() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0);
    // document.body.scrollTop = 0;
    if(/#/.test(location.pathname)){
      console.log("ok")
      const href = window.location.href.substring(
        window.location.href.lastIndexOf('#') + 1,
      );

      document.getElementById(href)?.scrollIntoView();
    }
  }, [location]);
  return (
    <AuthProvider>
      <Routes>
        <Route path="/"  element={<CountDown  />}/>
        <Route path="/home"  element={<Landing  />}/>
        <Route path="/login"  element={<Login  />}/>
        <Route path="/register"  element={<Register  />}/>
        <Route path="/auth/*" element={<Auth />}/>
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>}/>
        <Route path='/cart' element={<Carts />} />
        <Route path='/order' element={<RequireAuth><Orders /></RequireAuth>} />
        <Route path='/subscription' element={<RequireAuth><Subscriptions /></RequireAuth>} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:slug' element={<Product />} />
        <Route path='/category/:id' element={<CategoryPage />} />
        <Route path='/saved-items' element={<RequireAuth><SavedItems /></RequireAuth>} />
        <Route path='/checkout' element={<RequireAuth><CheckOut /></RequireAuth>} />
        <Route path='/wallet' element={<RequireAuth><Wallet/></RequireAuth>} />
        <Route path='/support' element={<Contact />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/terms-and-condition' element={<TermsAndCondition />} />
        <Route path='/profile' element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path='/summary' element={<OrderSummary />} />
        <Route path='/:id' element={<Vendor />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
