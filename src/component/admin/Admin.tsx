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
import Reset from './Reset';
import ForgetPass from '../../pages/admin/ForgetPass';
import UserDetails from '../../pages/admin/UserDetail';
import OrderDetail from '../../pages/admin/OrderDetail';
import UpdateUser from '../../pages/admin/UpdateCustomer';
import UpdateContractor from '../../pages/admin/updateContractor';
import OrderList from '../../pages/admin/OrderList';
import UserVisible from '../../pages/admin/UserVisible';

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
          <Route path="update-customer/:id" element ={ <UpdateUser/> } />
          <Route path="user/:id" element ={ <UserDetails/> } />
          <Route path="visibility" element ={ <UserVisible/> } />

          <Route path="create-contractor" element ={ <CreateContractor/> } />
          <Route path="get-contractor" element ={ <GetContractor/> } />
          <Route path="update-contractor/:id" element ={ <UpdateContractor/> } />
          <Route path='vendor-order/:id' element={<OrderList/>} />

          <Route path="create-order" element ={ <CreateOrder/> } />
          <Route path="update-order/:id" element ={ <UpdateOrder/> } />
          <Route path="order/:id" element ={ <OrderDetail/> } />
          
        </Route>
      </Routes>
    </div>
  );
};

export default Admin;