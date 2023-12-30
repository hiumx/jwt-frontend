import { Route, Routes } from 'react-router-dom';
import './App.scss';
import HomePage from './components/HomePage/HomePage';
import NewsPage from './components/NewsPage/NewsPage';
import ContactPage from './components/ContactPage/ContactPage';
import AboutPage from './components/AboutPage/AboutPage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  return (
    <div className="app-container">
      {/* <Nav /> */}
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/news' element={<NewsPage />}/>
        <Route path='/contact' element={<ContactPage />}/>
        <Route path='/about' element={<AboutPage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </div>
  );
}

export default App;
