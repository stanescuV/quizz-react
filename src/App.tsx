import "./App.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Login from "./pages/LogIn";
import { AuthProvider } from "./firebase/authContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormClient from "./components/FormClient";
import Forms from "./pages/Forms";
import HostPage from "./pages/HostPage";
import MyFormsPage from "./pages/MyFormsPage";

const App: React.FC = () => {
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
                        <Route
                            path="/host/:hostId?/:sessionId?"
                            element={<HostPage />}
                        />
                        <Route path="/myforms" element={<MyFormsPage />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </div>
    );
};

export default App;
