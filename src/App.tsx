import './App.css';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Login from './pages/LogIn';
import { AuthProvider } from './firebase/authContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormClient from './components/FormClient';
import Forms from './pages/Forms';
import HostPage from './pages/HostPage';
import MyFormsPage from './pages/MyFormsPage';
import FormFinishedRedirectPage from './pages/FormFinishedRedirectPage';
import { Profile } from './components/Profile';
import AIPage from './pages/AIPage';

const App: React.FC = () => {
  const url = import.meta.env.VITE_FRONTEND_URL;
  console.log(url);

  const http = import.meta.env.VITE_HTTP_SERVER_URL;
  console.log(http);

  const ws = import.meta.env.VITE_WS_SERVER_URL;
  console.log(ws);
  return (
    <div className="bg-[#6e4fff]">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/forms/:id?" element={<Forms />} />
            <Route path="/signup" element={<SignIn />} />
            <Route path="/login" element={<Login />} />
            <Route path="/session/:id?" element={<FormClient />} />
            <Route path="/host/:hostId?/:sessionId?" element={<HostPage />} />
            <Route path="/myforms" element={<MyFormsPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ai" element={<AIPage />} />

            

            <Route
              path="/formFinished"
              element={<FormFinishedRedirectPage />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
