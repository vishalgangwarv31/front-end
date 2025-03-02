import React from "react";
import { Link } from "react-router-dom";

const FirmMenu : React.FC = () =>{
    const handleLogout = () => {
        localStorage.removeItem('firmToken');
       
        window.location.href = '/api/firm/login';
    };
    return(
        <div className='menu-container'>
            <nav>
                <ul className='menu-list'>
                    <li className='menu-item'><Link to="/api/firm/get-firm">Get Firm</Link></li>
                    <li className='menu-item'><Link to="/api/firm/update-firm">Update Firm</Link></li>
                    <li className='menu-item'><Link to="/api/firm/order">My order</Link></li>
                    <li className='menu-item'><Link to="/api/firm/update-order">Update Order</Link></li>
                    <li className='menu-item'><Link to="/api/firm/login" onClick={handleLogout}>Log Out</Link></li>
                </ul>
            </nav>

        </div>
    )
}

export default FirmMenu;