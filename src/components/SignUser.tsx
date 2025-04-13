import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
type Props = {};

function SignUser({}: Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();

        setError("");

        // Firebase login logic
        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Logged in successfully:", user);
                navigate("/");
            })
            .catch((error) => {
                setError(error.message);
                console.error("Login error:", error);
            });
    };

    return (
        <form
            onSubmit={handleLogin}
            className="flex flex-col justify-center items-center mt-20 p-6 bg-white rounded-2xl shadow-lg max-w-sm mx-auto space-y-6"
        >
            <div className="flex flex-col w-full">
                <label
                    htmlFor="username"
                    className="text-sm font-semibold text-gray-600 mb-2"
                >
                    Email:
                </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="asd@gmail.com"
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
                    placeholder="*********"
                    className="p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
                Login
            </button>
        </form>
    );
}

export default SignUser;
