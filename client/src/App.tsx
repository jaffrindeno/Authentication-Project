import { Navigate, Route,  Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import HomePage from './pages/HomePage/HomePage';
import MainLayout from './layout/MainLayout';


function PrivateRoute ({children} : {children: React.ReactNode}) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to={"/login"}/>
}

function App() {

  return (
    <>
      <Routes >
        <Route element={<MainLayout />}>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/' element={<PrivateRoute><HomePage /></PrivateRoute>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
