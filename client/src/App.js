import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Error from './pages/404';
import { Property, PropertyDetail } from './components';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' exact element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/property' element={<Property />} />
        <Route path='/property/view/:id' element={<PropertyDetail />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </>
  );
}

export default App;
