import React from 'react';
import { Link } from 'react-router-dom';
import './adminMenu.css'

const AdminMenu: React.FC = () => {
  const handleLogout = () => {
      localStorage.removeItem('adminToken');
     
      window.location.href = '/api/admin/login';
  };

  return (
    <div className='menu-container'>
      <nav>
        <ul className='menu-list'>
          <li className='menu-item'><Link to="/api/admin/create-user">Create User</Link></li>
          <li className='menu-item'><Link to="/api/admin/create-contractor">Create Contractor</Link></li>
          <li className='menu-item'><Link to="/api/admin/create-order">Create Order</Link></li>
          <li className='menu-item'><Link to="/api/admin/update-order">Update Order</Link></li>
          <li className='menu-item'><Link to="/api/admin/get-user">Get Users</Link></li>
          <li className='menu-item'><Link to="/api/admin/get-contractor">Get Contractor</Link></li>
          <li className='menu-item'><Link to="/api/admin/get-order">Get Order</Link></li>
          <li className='menu-item'><Link to="/api/admin/login" onClick={handleLogout}>Log Out</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminMenu;
