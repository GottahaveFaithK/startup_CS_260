import React from 'react';
import './login.css';

export default function Login() {
    return (
        <main className="container background-table">
            <div className="row g-3">
                <section className="login-panel col-12 col-md-6">
                    <h2>Login</h2>

                    <form>
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

                    <form>
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

                <p>Logged in as: <span id="current-user">Guest</span></p>
            </section>
        </main>
    );
}