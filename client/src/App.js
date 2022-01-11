import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Error from './pages/404';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' exact element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
