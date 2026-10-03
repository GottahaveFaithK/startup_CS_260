import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import Play from './play/play';
import Login from './login/login';
import Scores from './scores/scores';

export default function App() {
    return (
        <div className="body">

            <header class="site-header">
                <h1>Dice Duel</h1>

                <nav class="site-nav">
                    <a href="index.html">Play</a>
                    <a href="leaderboard.html">Leaderboard</a>
                    <a href="login.html">Login</a>
                </nav>
            </header>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Play />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/scores" element={<Scores />} />
                </Routes>
            </BrowserRouter>

            <footer>
                <p>
                    Dice Duel | Created by Faith Kirkham |
                    <a href="https://github.com/GottahaveFaithK/startup_CS_260">
                        GitHub
                    </a>
                </p>
            </footer>
        </div>
    );
}