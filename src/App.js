import { Route, Routes } from 'react-router-dom';
import './App.scss';
import HomePage from './components/HomePage/HomePage';
import NewsPage from './components/NewsPage/NewsPage';
import ContactPage from './components/ContactPage/ContactPage';
import AboutPage from './components/AboutPage/AboutPage';
import Login from './components/Login/Login';

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
      </Routes>
    </div>
  );
}

export default App;
