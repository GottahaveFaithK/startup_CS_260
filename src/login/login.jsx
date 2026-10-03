import React from 'react';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
    return (
        <main class="container background-table">
            <div class="row g-3">
            <section class="login-panel col-12 col-md-6">
                <h2>Login</h2>

                <form>
                    <div>
                        <label for="login-username">Username</label>
                        <input type="text" id="login-username" name="username"/>
                    </div>

                    <div>
                        <label for="login-password">Password</label>
                        <input type="password" id="login-password" name="password"/>
                    </div>

                    <button type="submit" class="roll-button">Login</button>
                </form>
            </section>

            <section class="register-panel col-12 col-md-6">
                <h2>Create an Account</h2>

                <form>
                    <div>
                        <label for="register-username">Username</label>
                        <input type="text" id="register-username" name="username"/>
                    </div>

                    <div>
                        <label for="register-password">Password</label>
                        <input type="password" id="register-password" name="password"/>
                    </div>

                    <div>
                        <label for="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" name="confirm-password"/>
                    </div>

                    <button type="submit" class="roll-button">Create Account</button>
                </form>
            </section>
            </div>
            <section class="current-user-panel">
                <h2>Current User</h2>

                <p>Logged in as: <span id="current-user">Guest</span></p>
            </section>
        </main>
    );
}
