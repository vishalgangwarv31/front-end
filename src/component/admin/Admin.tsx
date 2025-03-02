import React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import AdminSignUp from './AdminSignUp';
import AdminSignIn from './AdminSignIn';
import AdminPrivateRoute from '../../utils/AdminPrivateRoute';
import AdminMenu from './AdminMenu';
import GetUser from '../../pages/admin/GetUser';
import CreateUser from '../../pages/admin/CreateUser';
import CreateContractor from '../../pages/admin/CreateContractor';
import CreateOrder from '../../pages/admin/CreateOrder';
import UpdateOrder from '../../pages/admin/UpdateOrder';
import GetContractor from '../../pages/admin/GetContractor';
import GetOrders from '../../pages/admin/GetOrder';
import ForgetPass from '../../pages/admin/forgetPass';
import Reset from './Reset';

const Admin: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname === '/api/admin' && (
        <nav>
          <ul>
            <li><Link to="/api/admin/signup">Sign Up</Link></li>
            <li><Link to="/api/admin/login">Sign In</Link></li>
          </ul>
        </nav>
      )}

      <Routes>
        <Route path="signup" element={<AdminSignUp />} />
        <Route path="login" element={<AdminSignIn />} />
        <Route path="forget-password" element={<ForgetPass />} />
        <Route path="reset-password/:id/:token" element = {<Reset/>}/>

        <Route element={<AdminPrivateRoute />}>
          <Route path="menu/*" element={<AdminMenu />} />
          <Route path="get-user" element = {<GetUser/>} />
          <Route path="create-user" element ={ <CreateUser/> } />
          <Route path="create-contractor" element ={ <CreateContractor/> } />
          <Route path="create-order" element ={ <CreateOrder/> } />
          <Route path="update-order" element ={ <UpdateOrder/> } />
          <Route path="get-contractor" element ={ <GetContractor/> } />
          <Route path="get-order" element ={ <GetOrders/> } />

        </Route>
      </Routes>
    </div>
  );
};

export default Admin;