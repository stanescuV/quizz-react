import './App.css';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Login from './pages/LogIn';
import { AuthProvider } from './firebase/authContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/logIn" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};


export default App;
