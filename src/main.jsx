import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider   } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'

import './index.css'

import AuthProvider from './provider/AuthProvider.jsx'

import Login from './components/login.jsx'
import Signup from './components/signup.jsx'
import App from './App.jsx'
import Account from './components/account.jsx'
import Expense from './components/expense.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

const queryClient = new QueryClient(); 

const expenseLoader = async () => {
  const token = localStorage.getItem('token');
  if (!token) return redirect('/login');
  return null;
  // try {
  //   const res = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/expense/viewExpenses`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   console.log('a: ', res);
  //   return res.data;
  // } catch (err) {
  //   console.error("Error loading expenses: ", err);
  //   return {totalAmount: 0, expenses: []};
  // }

}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'expense',
        loader: expenseLoader,
        element: (
        <ProtectedRoute>
          <Expense />
        </ProtectedRoute>
        )
      },
      {
        path: 'account',
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        )
      }
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);

