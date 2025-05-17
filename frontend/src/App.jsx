import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './main/pages/Home';
import Collection from './main/pages/Collection';
import About from './main/pages/About';
import Contact from './main/pages/Contact';
import Product from './main/pages/Product';
import Cart from './main/pages/Cart';
import Login from './main/pages/Login';
import PlaceOrder from './main/pages/PlaceOrder';
import Orders from './main/pages/Orders';
import Verify from './main/pages/Verify';
import Navbar from './components/Navbar';
import { ThemeProvider } from './components/ThemeProvider';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// admin imports
import Sidebar from './components/Sidebar';
import Add from './admin/pages/Add';
import List from './admin/pages/List';
import AdminOrders from './admin/pages/AdminOrders';
import AdminLogin from './components/AdminLogin';
import AdminNavbar from './components/AdminNavbar';
export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = 'Rs'

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const showFooter = !(
    ['/login', '/orders', '/cart', '/placeorder', '/collection'].some(path =>
      location.pathname.startsWith(path)
    ) ||
    location.pathname.startsWith('/admin') // Admin ke sab routes exclude karo
  );

  const [adminToken, setAdminToken] = useState(localStorage.getItem('admintoken') || '')

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      {/* Main Routes */}
      <div className='px-4 sm:px-8 md:px-12 lg:px-16'>
        {!location.pathname.startsWith('/admin') && (
          <>
            <Navbar />
            <SearchBar />
          </>
        )}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/placeOrder' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>
        {showFooter && <Footer />}
      </div>

      {/* Admin Routes */}
      <div className='px-0 sm:px-8 md:px-12 lg:px-16'>
        {location.pathname.startsWith('/admin') && location.pathname !== '/admin' && (
          <>
            <AdminNavbar setAdminToken={setAdminToken} />
          </>
        )}
        <Routes>
          <Route path='/admin' element={<AdminLogin setAdminToken={setAdminToken} />} />
          <Route
            path='/admin/*'
            element={
              adminToken ? ( // Step 3: Admin token check
                <div className='flex w-full'>
                  <Sidebar />
                  <div className='w-[80%] my-8 mx-auto'>
                    <Routes>
                      <Route path='add' element={<Add adminToken={adminToken} />} />
                      <Route index path='list' element={<List adminToken={adminToken} />} />
                      <Route path='orders' element={<AdminOrders adminToken={adminToken} />} />
                    </Routes>
                  </div>
                </div>
              ) : (
                <Navigate to="/admin" replace /> // Redirect to admin login if token is not present
              )
            }
          />
        </Routes>
      </div>
      <ToastContainer position='bottom-right' autoClose={2200} />
    </ThemeProvider >
  );
};

export default App;
