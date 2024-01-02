import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import _ from 'lodash';

import './App.scss';
import HomePage from './components/HomePage/HomePage';
import NewsPage from './components/NewsPage/NewsPage';
import ContactPage from './components/ContactPage/ContactPage';
import AboutPage from './components/AboutPage/AboutPage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Nav from './components/Nav/Nav'
import ManagerUser from './components/ManagerUser/ManagerUser';

function App() {

  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const location = useLocation();
  const account = JSON.parse(sessionStorage.getItem('account'));

  useEffect(() => {
    if(account && account.isAuthenticated) {
      setIsLoginSuccess(true);
    }
  }, [account])

  return (
    <div className="app-container">
      { account && !_.isEmpty(account) && account.isAuthenticated && isLoginSuccess && location.pathname !== '/login' && <Nav /> }
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/news' element={<NewsPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/login' element={<Login setIsLoginSuccess={setIsLoginSuccess} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/manager-user' element={<ManagerUser />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
