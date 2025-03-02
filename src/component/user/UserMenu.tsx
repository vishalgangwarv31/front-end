import React from "react";
import { Link } from "react-router-dom";

const UserMenu : React.FC = () =>{
    const handleLogout = () => {
        localStorage.removeItem('userToken');
       
        window.location.href = '/api/user/login';
    };
    return(
        <div className='menu-container'>
            <nav>
                <ul className='menu-list'>
                    <li className='menu-item'><Link to="/api/user/get-user">Get User</Link></li>
                    <li className='menu-item'><Link to="/api/user/update-user">Update User</Link></li>
                    <li className='menu-item'><Link to="/api/user/orders">My order</Link></li>
                    <li className='menu-item'><Link to="/api/user/update-order">Update Order</Link></li>
                    <li className='menu-item'><Link to="/api/user/login" onClick={handleLogout}>Log Out</Link></li>
                </ul>
            </nav>

        </div>
    )
}

export default UserMenu;