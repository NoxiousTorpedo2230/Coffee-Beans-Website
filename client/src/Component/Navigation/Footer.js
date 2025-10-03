import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Coffee, Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#8B4513', color: '#F5DEB3' }} className=" py-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <Coffee size={28} style={{ color: '#CD853F' }} className="me-2" />
              <h4 className="fw-bold mb-0" style={{ color: '#F5DEB3' }}>Glenz Cafe</h4>
            </div>
            <p className="mb-3" style={{ color: '#F5DEB3', opacity: 0.9 }}>
              Experience the finest coffee and dining in a warm, welcoming atmosphere. 
              We're committed to serving quality food and beverages to our valued customers.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-decoration-none" style={{ color: '#CD853F' }}>
                <Facebook size={24} />
              </a>
              <a href="#" className="text-decoration-none" style={{ color: '#CD853F' }}>
                <Instagram size={24} />
              </a>
              <a href="#" className="text-decoration-none" style={{ color: '#CD853F' }}>
                <Twitter size={24} />
              </a>
            </div>
          </Col>
          
          <Col md={4} className="mb-4">
            <h5 className="fw-bold mb-3" style={{ color: '#CD853F' }}>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link 
                  to="/" 
                  className="text-decoration-none d-flex align-items-center"
                  style={{ color: '#F5DEB3', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => e.target.style.color = '#CD853F'}
                  onMouseLeave={(e) => e.target.style.color = '#F5DEB3'}
                >
                  <span className="me-2">→</span> Home
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/about" 
                  className="text-decoration-none d-flex align-items-center"
                  style={{ color: '#F5DEB3', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => e.target.style.color = '#CD853F'}
                  onMouseLeave={(e) => e.target.style.color = '#F5DEB3'}
                >
                  <span className="me-2">→</span> About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/services" 
                  className="text-decoration-none d-flex align-items-center"
                  style={{ color: '#F5DEB3', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => e.target.style.color = '#CD853F'}
                  onMouseLeave={(e) => e.target.style.color = '#F5DEB3'}
                >
                  <span className="me-2">→</span> Services
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/contact" 
                  className="text-decoration-none d-flex align-items-center"
                  style={{ color: '#F5DEB3', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => e.target.style.color = '#CD853F'}
                  onMouseLeave={(e) => e.target.style.color = '#F5DEB3'}
                >
                  <span className="me-2">→</span> Contact
                </Link>
              </li>
            </ul>
          </Col>
          
          <Col md={4} className="mb-4">
            <h5 className="fw-bold mb-3" style={{ color: '#CD853F' }}>Contact Info</h5>
            <div className="mb-3">
              <div className="d-flex align-items-center mb-2">
                <MapPin size={18} style={{ color: '#CD853F' }} className="me-2" />
                <small style={{ color: '#F5DEB3', opacity: 0.8 }}>Address:</small>
              </div>
              <p className="ms-4 mb-0" style={{ color: '#F5DEB3' }}>123 Coffee Street, Brew City, BC 12345</p>
            </div>
            <div className="mb-3">
              <div className="d-flex align-items-center mb-2">
                <Phone size={18} style={{ color: '#CD853F' }} className="me-2" />
                <small style={{ color: '#F5DEB3', opacity: 0.8 }}>Phone:</small>
              </div>
              <p className="ms-4 mb-0" style={{ color: '#F5DEB3' }}>+1 (555) 123-4567</p>
            </div>
            <div className="mb-3">
              <div className="d-flex align-items-center mb-2">
                <Mail size={18} style={{ color: '#CD853F' }} className="me-2" />
                <small style={{ color: '#F5DEB3', opacity: 0.8 }}>Email:</small>
              </div>
              <p className="ms-4 mb-0" style={{ color: '#F5DEB3' }}>info@glenzcafe.com</p>
            </div>
            <div>
              <div className="d-flex align-items-center mb-2">
                <Clock size={18} style={{ color: '#CD853F' }} className="me-2" />
                <small style={{ color: '#F5DEB3', opacity: 0.8 }}>Hours:</small>
              </div>
              <p className="ms-4 mb-0" style={{ color: '#F5DEB3' }}>Mon-Sun: 7:00 AM - 10:00 PM</p>
            </div>
          </Col>
        </Row>
        
        <hr style={{ backgroundColor: '#CD853F', border: 'none', height: '1px' }} className="my-4" />
        
        <Row>
          <Col className="text-center">
            <div className="d-flex justify-content-center align-items-center">
              <Coffee size={16} style={{ color: '#CD853F' }} className="me-2" />
              <small style={{ color: '#F5DEB3', opacity: 0.8 }}>
                © 2025 Glenz Cafe. Built with ❤️ for coffee lovers everywhere
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

