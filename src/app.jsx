import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import Play from './play/play';
import Login from './login/login';
import Scores from './scores/scores';

export default function App() {
    return (
        <BrowserRouter>
            <div className="body">

                <header className="site-header">
                    <h1>Dice Duel</h1>

                    <nav className="site-nav">
                        <NavLink to="/">Play</NavLink>
                        <NavLink to="/scores">Scores</NavLink>
                        <NavLink to="/login">Login</NavLink>
                    </nav>
                </header>
                    <Routes>
                        <Route path="/" element={<Play />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/scores" element={<Scores />} />
                    </Routes>

                <footer>
                    <p>
                        Dice Duel | Created by Faith Kirkham |
                        <a href="https://github.com/GottahaveFaithK/startup_CS_260">
                            GitHub
                        </a>
                    </p>
                </footer>
            </div>
        </BrowserRouter>
    );
}