import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import the signInWithEmailAndPassword method
import { auth } from "../firebase/firebase"; // Import the auth instance
import { useNavigate } from "react-router-dom";
type Props = {}

function SignUser({}: Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();

        // Clear any previous errors
        setError("");

        // Firebase login logic
        signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            // Successful login
            const user = userCredential.user;
            console.log("Logged in successfully:", user);
            navigate("/"); 
        })
        .catch((error) => {
            // Handle errors
            setError(error.message);
            console.error("Login error:", error);
        });
    };
  
    return (
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username (Email):</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username (email)"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
  
        {error && <p style={{ color: "red" }}>{error}</p>}
  
        <button type="submit">Login</button>
      </form>
    );
  }

export default SignUser