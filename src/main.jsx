import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route   } from 'react-router'
import './index.css'
import AuthProvider from './provider/AuthProvider.jsx'
import App from './App.jsx'
import { Account } from './components/account.jsx'
import Login from './components/login.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import Signup from './components/signup.jsx'

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<App />} >
            {/* <Route index element={<Dashboard />} /> */}
            <Route path="account"
            element={
              <ProtectedRoute>
                <Account/>
              </ProtectedRoute>
            } 
            />
          </Route>
          <Route path='/login' element = {<Login />} />
          <Route path='/signup' element = {<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
