  import { Outlet, Link, useNavigate } from 'react-router'
  import stockuserphoto from './assets/user.png'
  import './App.css'
import { useAuth } from './provider/AuthProvider'

  function App() {
    const { token, setToken, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
      navigate('/');
      setTimeout(() => {
        setToken(null);
      }, 0)
    }

    return (
    <>


        <section className='controls'>
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
            <Link to = "/" className='menu-item'>Dashboard</Link>
            <Link to = "/expense" className='menu-item'>Expenses</Link>
            <Link to = "/account" className='menu-item'>Account</Link>
            {token && <button onClick={handleLogout} className='menu-item link-style'>Log Out</button>} 
            {!token && <Link to='/login' className='menu-item'>Log In</Link>}
          </div>
        </section>
        <section className='viewer'>

          {/* More sub Routes here  */}

          <section className='viewer-content'>
            <Outlet />
          </section>
        </section>
      </>
    )
  }

  export default App
