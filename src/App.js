import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Nav from './components/Nav/Nav';
import AppRoutes from './routes/AppRoutes';

function App() {

  // const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  
  return (
    <div className="app-container">
      <Nav /> 
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
