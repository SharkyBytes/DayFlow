import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Calendar9 from './components/Calendar9';
import EventDetails from './components/EventDetails';
import Login from './components/Login'; // Import the Login component
import React, { useState, useEffect } from 'react';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage authentication state


      useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated');
        setIsAuthenticated(authStatus === 'true'); // Set initial auth state
    }, []);

    return (
        <>
            <Navbar
                content={
                    <Routes>
                        {isAuthenticated ? (
                            <>
                                <Route path="/" element={<Calendar9 />} />
                                <Route path="/calendar" element={<Calendar9 />} />
                                <Route path="/eventdetails/:id" element={<EventDetails />} />
                                <Route path="/about" element={<About />} />
                            </>
                        ) : (
                          <>
                            <Route path="/login" element={<Login setAuthenticated={setIsAuthenticated} />} />
                            <Route path="/" element={<Login setAuthenticated={setIsAuthenticated} />} />
                            </>
                        )}
                    </Routes>
                }
            />
        </>
    );
}

export default App;
