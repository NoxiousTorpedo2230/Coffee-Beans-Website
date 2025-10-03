import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <BootstrapNavbar 
      expand="lg" 
      sticky="top"
      style={{ 
        backgroundColor: '#8B4513',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderBottom: '3px solid #CD853F'
      }}
      variant="dark"
    >
      <Container>
        <BootstrapNavbar.Brand 
          as={Link} 
          to="/" 
          className="fw-bold"
          style={{ color: '#F5DEB3', fontSize: '1.5rem' }}
        >
          ☕ Glenz Cafe
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/"
              className="fw-medium"
              style={{ 
                color: '#F5DEB3',
                transition: 'all 0.3s ease',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                margin: '0 0.2rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#8B4513';
                e.target.style.backgroundColor = '#F5DEB3';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#F5DEB3';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Home
            </Nav.Link>
            
            {!user ? (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/about"
                  className="fw-medium"
                  style={{ 
                    color: '#F5DEB3',
                    transition: 'all 0.3s ease',
                    padding: '0.5rem 1rem',
                    borderRadius: '5px',
                    margin: '0 0.2rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#8B4513';
                    e.target.style.backgroundColor = '#F5DEB3';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#F5DEB3';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  About
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/services"
                  className="fw-medium"
                  style={{ 
                    color: '#F5DEB3',
                    transition: 'all 0.3s ease',
                    padding: '0.5rem 1rem',
                    borderRadius: '5px',
                    margin: '0 0.2rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#8B4513';
                    e.target.style.backgroundColor = '#F5DEB3';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#F5DEB3';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Services
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/contact"
                  className="fw-medium"
                  style={{ 
                    color: '#F5DEB3',
                    transition: 'all 0.3s ease',
                    padding: '0.5rem 1rem',
                    borderRadius: '5px',
                    margin: '0 0.2rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#8B4513';
                    e.target.style.backgroundColor = '#F5DEB3';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#F5DEB3';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Contact
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/menu"
                  className="fw-medium"
                  style={{ 
                    color: '#F5DEB3',
                    transition: 'all 0.3s ease',
                    padding: '0.5rem 1rem',
                    borderRadius: '5px',
                    margin: '0 0.2rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#8B4513';
                    e.target.style.backgroundColor = '#F5DEB3';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#F5DEB3';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Menu
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/orders"
                  className="fw-medium"
                  style={{ 
                    color: '#F5DEB3',
                    transition: 'all 0.3s ease',
                    padding: '0.5rem 1rem',
                    borderRadius: '5px',
                    margin: '0 0.2rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#8B4513';
                    e.target.style.backgroundColor = '#F5DEB3';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#F5DEB3';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Orders
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/reservations"
                  className="fw-medium"
                  style={{ 
                    color: '#F5DEB3',
                    transition: 'all 0.3s ease',
                    padding: '0.5rem 1rem',
                    borderRadius: '5px',
                    margin: '0 0.2rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#8B4513';
                    e.target.style.backgroundColor = '#F5DEB3';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#F5DEB3';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Reservations
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/feedback"
                  className="fw-medium"
                  style={{ 
                    color: '#F5DEB3',
                    transition: 'all 0.3s ease',
                    padding: '0.5rem 1rem',
                    borderRadius: '5px',
                    margin: '0 0.2rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#8B4513';
                    e.target.style.backgroundColor = '#F5DEB3';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#F5DEB3';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Feedback
                </Nav.Link>
                
                {(user.role === 'admin' || user.role === 'staff') && (
                  <>
                    <Nav.Link 
                      as={Link} 
                      to="/inventory"
                      className="fw-medium"
                      style={{ 
                        color: '#F5DEB3',
                        transition: 'all 0.3s ease',
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        margin: '0 0.2rem'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#8B4513';
                        e.target.style.backgroundColor = '#F5DEB3';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#F5DEB3';
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      Inventory
                    </Nav.Link>
                    <Nav.Link 
                      as={Link} 
                      to="/bills"
                      className="fw-medium"
                      style={{ 
                        color: '#F5DEB3',
                        transition: 'all 0.3s ease',
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        margin: '0 0.2rem'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#8B4513';
                        e.target.style.backgroundColor = '#F5DEB3';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#F5DEB3';
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      Bills
                    </Nav.Link>
                  </>
                )}
                
                {user.role === 'admin' && (
                  <>
                    <Nav.Link 
                      as={Link} 
                      to="/staff"
                      className="fw-medium"
                      style={{ 
                        color: '#F5DEB3',
                        transition: 'all 0.3s ease',
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        margin: '0 0.2rem'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#8B4513';
                        e.target.style.backgroundColor = '#F5DEB3';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#F5DEB3';
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      Staff
                    </Nav.Link>
                    <Nav.Link 
                      as={Link} 
                      to="/analytics"
                      className="fw-medium"
                      style={{ 
                        color: '#F5DEB3',
                        transition: 'all 0.3s ease',
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        margin: '0 0.2rem'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#8B4513';
                        e.target.style.backgroundColor = '#F5DEB3';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#F5DEB3';
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      Analytics
                    </Nav.Link>
                  </>
                )}
              </>
            )}
          </Nav>
          
          <Nav>
            {!user ? (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/login"
                  className="fw-medium"
                  style={{ 
                    color: '#F5DEB3',
                    transition: 'all 0.3s ease',
                    padding: '0.5rem 1rem',
                    borderRadius: '5px',
                    margin: '0 0.2rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#8B4513';
                    e.target.style.backgroundColor = '#F5DEB3';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#F5DEB3';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Login
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/register"
                  className="fw-medium"
                  style={{ 
                    color: '#F5DEB3',
                    transition: 'all 0.3s ease',
                    padding: '0.5rem 1rem',
                    borderRadius: '5px',
                    margin: '0 0.2rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#8B4513';
                    e.target.style.backgroundColor = '#F5DEB3';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#F5DEB3';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Register
                </Nav.Link>
              </>
            ) : (
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center me-3 px-3 py-2 rounded" style={{ backgroundColor: '#CD853F' }}>
                  <span style={{ color: '#F5DEB3', fontSize: '0.9rem' }}>
                    Welcome, {user.name}!
                  </span>
                </div>
                <Button 
                  variant="outline-light" 
                  size="sm" 
                  onClick={handleLogout}
                  style={{ 
                    borderColor: '#CD853F',
                    color: '#CD853F',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#CD853F';
                    e.target.style.color = '#F5DEB3';
                    e.target.style.borderColor = '#CD853F';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#CD853F';
                    e.target.style.borderColor = '#CD853F';
                  }}
                >
                  Logout
                </Button>
              </div>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;