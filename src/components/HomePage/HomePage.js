import { Link } from 'react-router-dom';
import { useContext } from 'react';
import NavHeader from '../NavHeader/NavHeader';
import { AuthContext } from '../../contexts/AuthProvider';

export default function HomePage() {
  const authContext = useContext(AuthContext);

  return (
    <div>
      <div>HomePage</div>
    </div>
  )
}
