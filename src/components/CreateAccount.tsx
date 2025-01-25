import React, { useState } from "react";
import { createUser } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
    const [email, setemail] = useState("");
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
            return;
        }

        createUser(email, password)
            .then(() => {
                console.log("Account created successfully");
                navigate("/");
            })
            .catch((error) => {
                console.error("Error creating account:", error);
            });

        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center mt-16 p-6 bg-white rounded-2xl shadow-2xl max-w-sm mx-auto space-y-6"
        >
            <div className="flex flex-col w-full ">
                <label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-600 mb-2"
                >
                    Email:
                </label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Enter your email"
                    className="p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="flex flex-col w-full">
                <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-600 mb-2"
                >
                    Password:
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="flex flex-col w-full">
                <label
                    htmlFor="confirmPassword"
                    className="text-sm font-semibold text-gray-600 mb-2"
                >
                    Confirm Password:
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
                Create Account
            </button>
        </form>
    );
}

export default CreateAccount;
