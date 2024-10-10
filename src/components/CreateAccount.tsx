import React, { useState } from "react";
import { createUser } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";


function CreateAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Clear any previous errors
    setError("");

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return; // Stop the form submission if passwords don't match
    }

    // Add login logic here (e.g., API call)
    createUser(username, password)
      .then(() => {
        console.log("Account created successfully");
        navigate("/")
      })
      .catch((error) => {
        console.error("Error creating account:", error);
      });

    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
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
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Create Account</button>
    </form>
  );
}

export default CreateAccount;
