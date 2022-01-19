import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Error from './pages/404';
import { Navbar, PropertyList, PropertyDetail, AddPropertyForm } from './components';

function App() {
  return (
    <>
      <Routes>
        <Route path='/dashboard' exact element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/property' exact element={<PropertyList />} />
        <Route path='/property/addProperty' exact element={<AddPropertyForm />} />
        <Route path='/property/:id' element={<PropertyDetail />} />
        <Route path='*' element={<Error />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </>
  );
}

export default App;
