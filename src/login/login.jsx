import React, { useState, useEffect } from 'react';
import './login.css';

export default function Login() {
    const [currentUser, setCurrentUser] = useState('Guest');
    const [message, setMessage] = useState('');

    async function handleLogin(event) {
        event.preventDefault();

        const username = event.target.username.value.trim();
        const password = event.target.password.value;

        if (!username || !password) {
            setMessage('Please enter your username and password.');
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message);
                return;
            }

            setCurrentUser(data.username);
            setMessage(`Welcome back, ${data.username}!`);
        } catch (error) {
            setMessage('Unable to connect to the server.');
        }
    }

    async function handleRegister(event) {
        event.preventDefault();

        const username = event.target.username.value.trim();
        const password = event.target.password.value;
        const confirmPassword = event.target['confirm-password'].value;

        if (!username || !password || !confirmPassword) {
            setMessage('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('/api/auth/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message);
                return;
            }

            setCurrentUser(data.username);
            setMessage(`Account created! Welcome, ${data.username}!`);
        } catch (error) {
            setMessage('Unable to connect to the server.');
        }
    }

    async function handleLogout() {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                setMessage('Unable to log out.');
                return;
            }

            setCurrentUser('Guest');
            setMessage('You have logged out.');
        } catch (error) {
            setMessage('Unable to connect to the server.');
        }
    }

    useEffect(() => {
        async function checkLogin() {
            try {
                const response = await fetch('/api/auth/me', {
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setCurrentUser(data.username);
                }
            } catch (error) {
                setMessage('Unable to check login status.');
            }
        }

        checkLogin();
    }, []);

    return (
        <main className="container background-table">
            <div className="row g-3">
                <section className="login-panel col-12 col-md-6">
                    <h2>Login</h2>

                    <form onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="login-username">Username</label>
                            <input type="text" id="login-username" name="username" />
                        </div>

                        <div>
                            <label htmlFor="login-password">Password</label>
                            <input type="password" id="login-password" name="password" />
                        </div>

                        <button type="submit" className="roll-button">Login</button>
                    </form>
                </section>

                <section className="register-panel col-12 col-md-6">
                    <h2>Create an Account</h2>

                    <form onSubmit={handleRegister}>
                        <div>
                            <label htmlFor="register-username">Username</label>
                            <input type="text" id="register-username" name="username" />
                        </div>

                        <div>
                            <label htmlFor="register-password">Password</label>
                            <input type="password" id="register-password" name="password" />
                        </div>

                        <div>
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input type="password" id="confirm-password" name="confirm-password" />
                        </div>

                        <button type="submit" className="roll-button">Create Account</button>
                    </form>
                </section>
            </div>

            <section className="current-user-panel">
                <h2>Current User</h2>

                <p>
                    Logged in as: <span id="current-user">{currentUser}</span>
                </p>

                {currentUser !== 'Guest' && (
                    <button onClick={handleLogout} className="roll-button mt-3">
                        Logout
                    </button>
                )}

                {message && <p role="status">{message}</p>}
            </section>
        </main>
    );
}