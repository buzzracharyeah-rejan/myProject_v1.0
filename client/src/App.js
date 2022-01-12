import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Error from './pages/404';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' exact element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </>
  );
}

export default App;
