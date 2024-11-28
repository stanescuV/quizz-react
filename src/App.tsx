import './App.css';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Login from './pages/LogIn';
import { AuthProvider } from './firebase/authContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormClient from './pages/FormClient';
import Forms from './pages/Forms';
import HostPage from './pages/HostPage'


const App: React.FC = () => {
  return (
  
  <div className='bg-[#6e4fff]'>
    <AuthProvider>
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/logIn" element={<Login />} />
            <Route path="/form/:id?" element={<FormClient  />} />
            <Route path="/host/:hostId?/:formId?" element={<HostPage  />} />
          </Routes>
      </Router>
    </AuthProvider>
  </div>
  );
};


export default App;
