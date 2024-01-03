import { Route, Routes } from 'react-router-dom';

import HomePage from '../components/HomePage/HomePage';
import AboutPage from '../components/AboutPage/AboutPage';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import ManagerUser from '../components/ManagerUser/ManagerUser';
import PrivateRoutes from './PrivateRoutes';
import React from 'react';
import ManagerProject from '../components/ManagerProject/ManagerProject';

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/' element={<PrivateRoutes />} >
                    <Route path='/manager-users' element={<ManagerUser />} />
                    <Route path='/manager-projects' element={<ManagerProject />} />
                </Route>
                <Route path='/about' element={<AboutPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </div>
    );
};

export default AppRoutes;