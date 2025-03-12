import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './adminMenu.css';

const AdminMenu: React.FC = () => {
  const [customerDropdownOpen, setCustomerDropdownOpen] = useState(false);
  const [vendorDropdownOpen, setVendorDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/api/admin/login';
  };

  const toggleCustomerDropdown = () => {
    setCustomerDropdownOpen(!customerDropdownOpen);
  };

  const toggleVendorDropdown = () => {
    setVendorDropdownOpen(!vendorDropdownOpen);
  };

  return (
    <div className='menu-container'>
      <nav>
        <ul className='menu-list'>
          <li className='menu-item'>
            <div onClick={toggleCustomerDropdown} className='dropdown-toggle'>
              Customer
            </div>
            {customerDropdownOpen && (
              <ul className='dropdown-menu'>
                <li className='dropdown-item'><Link to="/api/admin/get-user">Customer Info</Link></li>
                <li className='dropdown-item'><Link to="/api/admin/create-user">Create Customer</Link></li>
                <li className='dropdown-item'><Link to="/api/admin/visibility">Visibility</Link></li>
              </ul>
            )}
          </li>
          <li className='menu-item'>
            <div onClick={toggleVendorDropdown} className='dropdown-toggle'>
              Vendor
            </div>
            {vendorDropdownOpen && (
              <ul className='dropdown-menu'>
                <li className='dropdown-item'><Link to="/api/admin/get-contractor">Get Vendor</Link></li>
                <li className='dropdown-item'><Link to="/api/admin/create-contractor">Create Vendor</Link></li>
              </ul>
            )}
          </li>
          <li className='menu-item'><Link to="/api/admin/create-order">Order</Link></li>
          <li className='menu-item'><Link to="/">Accounts</Link></li>
          <li className='menu-item'><Link to="/">Reports</Link></li>
          <li className='menu-item'><Link to="/api/admin/login" onClick={handleLogout}>Log Out</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminMenu;
