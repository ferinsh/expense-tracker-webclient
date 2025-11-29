import { Outlet, Link, useNavigate } from 'react-router'
import stockuserphoto from './assets/user.png'
import './App.css'
import { useAuth } from './provider/AuthProvider'
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

function App() {
  const { token, setToken, user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleLogout = () => {
    queryClient.removeQueries();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    setTimeout(() => {
      setToken(null);
    }, 0)
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  return (
  <>
      <section className={`controls ${sidebarOpen ? 'active' : ''}`}>
        {sidebarOpen && <button className='view-switch-btn' onClick={toggleSidebar} aria-label='Toggle Menu'>{'<'}</button>}
        <div className="profile">
          <img src={stockuserphoto} />
          {token && <>
            <h3>{user.username}</h3>
            <p>{user.email}</p>
          </>}
          {!token && <><br /><p>Login to see user details</p></>}
        </div>
        <div className="menu">
          {/* <button className="menu-account">Account</button> */}
          <Link to = "/" className='menu-item' onClick={toggleSidebar}>Dashboard</Link>
          <Link to = "/expense" className='menu-item' onClick={toggleSidebar}>Expenses</Link>
          <Link to = "/account" className='menu-item' onClick={toggleSidebar}>Account</Link>
          {token && <button onClick={handleLogout} className='menu-item link-style'>Log Out</button>} 
          {!token && <Link to='/login' className='menu-item'>Log In</Link>}
        </div>
      </section>
      <section className={`viewer ${sidebarOpen ? '' : 'active' }`}>
        {/* More sub Routes here  */}

        <section className='viewer-content'>
        {!sidebarOpen && <button className='view-switch-btn viewerside' onClick={toggleSidebar} aria-label='Toggle Menu'>{'>'}</button>}
          <Outlet />
        </section>
      </section>
    </>
  )
}

export default App
