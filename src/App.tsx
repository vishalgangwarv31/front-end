import { BrowserRouter, Link, Navigate, Route,  Routes , useLocation } from 'react-router-dom'
import './App.css'
import Admin from './component/admin/Admin'
import Firm from './component/firm/Firm'
import User from './component/user/User'

const Navigation: React.FC = () => {
  const location = useLocation();

  if (location.pathname !== '/') {
    return null;
  }

  return (
    <div className='main-container'>
        <nav className='user-select'>
          <h3 className='user-type-heading'>WHO ARE YOU?</h3>
          <ul className='link-container'>
            <li className='link-item'><Link to="/api/admin/login">Admin</Link></li>
            <li className='link-item'><Link to="/api/firm/login">Firm</Link></li>
            <li className='link-item'><Link to="/api/user/login">User</Link></li>
          </ul>
        </nav>
    </div>
    
  );
};

const Home: React.FC = () => {
  return <div></div>;
};


function App() {
  return (
    <>

      <BrowserRouter>
        <div>
          <Navigation />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api/admin/*" element={<Admin />} />
          <Route path="/api/firm/*" element={<Firm />} />
          <Route path="/api/user/*" element={<User />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
