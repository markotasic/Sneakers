import { Routes, Route } from 'react-router-dom';
import Collection from './pages/Collection';
import Login from './pages/Login';
import Register from './pages/Register';
import Nav from './components/Nav';
import About from './pages/About';
import Contact from './pages/Contact';

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
