import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import NavHeader from './components/NavHeader/NavHeader';
import AppRoutes from './routes/AppRoutes';

function App() {
  
  return (
    <div className="app-container">
      <NavHeader /> 
      <AppRoutes /> 

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
