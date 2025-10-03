import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Component/Navigation/Navbar';
import Footer from './Component/Navigation/Footer';
import Home from './Component/LandingPage/Home';
import About from './Component/LandingPage/About';
import Services from './Component/LandingPage/Services';
import Contact from './Component/LandingPage/Contact';
import Login from './Component/User/Login';
import Register from './Component/User/Register';
import Menu from './Component/Customer/Menu';
import Orders from './Component/Customer/Orders';
import Reservations from './Component/Customer/Reservations';
import Inventory from './Component/Admin/Inventory';
import Bills from './Component/Admin/Bills';
import Staff from './Component/Admin/Staff';
import Feedback from './Component/Customer/Feedback';
import Analytics from './Component/Admin/Analytics';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session on app load
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        
        if (storedUser && storedToken) {
          // Validate the stored data
          const parsedUser = JSON.parse(storedUser);
          
          // Basic validation - check if user object has required properties
          if (parsedUser && parsedUser.role && parsedUser.email) {
            setUser(parsedUser);
            setToken(storedToken);
          } else {
            // Invalid stored data, clear it
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }
        }
      } catch (error) {
        console.error('Error loading stored authentication:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const handleLogin = (userData, userToken) => {
    try {
      setUser(userData);
      setToken(userToken);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userToken);
    } catch (error) {
      console.error('Error storing authentication data:', error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Error clearing authentication data:', error);
    }
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Navbar user={user} onLogout={handleLogout} />
        
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onLogin={handleLogin} />} />
            
            {/* Protected Routes */}
            {user && (
              <>
                <Route path="/menu" element={<Menu user={user} token={token} />} />
                <Route path="/orders" element={<Orders user={user} token={token} />} />
                <Route path="/reservations" element={<Reservations user={user} token={token} />} />
                <Route path="/feedback" element={<Feedback user={user} token={token} />} />
                
                {/* Admin/Staff Routes */}
                {(user.role === 'admin' || user.role === 'staff') && (
                  <>
                    <Route path="/inventory" element={<Inventory user={user} token={token} />} />
                    <Route path="/bills" element={<Bills user={user} token={token} />} />
                  </>
                )}
                
                {/* Admin Only Routes */}
                {user.role === 'admin' && (
                  <>
                    <Route path="/staff" element={<Staff user={user} token={token} />} />
                    <Route path="/analytics" element={<Analytics user={user} token={token} />} />
                  </>
                )}
              </>
            )}
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;