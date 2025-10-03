import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Coffee, ShoppingCart, Calendar, Package, Receipt, Users, BarChart3, Star, Heart, Clock, Award } from 'lucide-react';

function Home({ user }) {
  if (user) {
    return (
      <div style={{ backgroundColor: '#FFF8DC', minHeight: '100vh', paddingTop: '0px' }}>
        <Container className="py-5">
          {/* Welcome Header */}
          <Row className="text-center mb-5">
            <Col>
              <div className="d-flex align-items-center justify-content-center mb-3">
                <Coffee size={50} style={{ color: '#8B4513' }} className="me-3" />
                <h1 className="display-4 mb-0" style={{ color: '#8B4513' }}>
                  Welcome back, {user.name}!
                </h1>
              </div>
              <p className="lead" style={{ color: '#A0522D', fontSize: '1.2rem' }}>
                {user.role === 'admin' && 'Admin Dashboard - Manage your cafe operations with style'}
                {user.role === 'staff' && 'Staff Portal - Handle orders and customer service efficiently'}
                {user.role === 'customer' && 'Customer Portal - Explore our menu and place orders seamlessly'}
              </p>
            </Col>
          </Row>
          
          {/* Main Action Cards */}
          <Row className="mb-5">
            <Col md={4} className="mb-4">
              <Card 
                className="h-100 shadow-lg border-0 transition-hover" 
                style={{ 
                  backgroundColor: '#FFFFFF',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 69, 19, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 69, 19, 0.1)';
                }}
              >
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <div 
                      className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        backgroundColor: '#8B4513'
                      }}
                    >
                      <Coffee size={32} style={{ color: '#F5DEB3' }} />
                    </div>
                  </div>
                  <h5 style={{ color: '#8B4513', fontWeight: 'bold' }}>Menu</h5>
                  <p style={{ color: '#5D4037', lineHeight: '1.6' }}>
                    Browse our delicious menu items and discover new flavors
                  </p>
                  <Button 
                    as={Link} 
                    to="/menu" 
                    style={{ 
                      backgroundColor: '#CD853F',
                      borderColor: '#CD853F',
                      color: '#F5DEB3',
                      fontWeight: 'bold',
                      padding: '10px 25px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#A0522D';
                      e.target.style.borderColor = '#A0522D';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#CD853F';
                      e.target.style.borderColor = '#CD853F';
                    }}
                  >
                    View Menu
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-4">
              <Card 
                className="h-100 shadow-lg border-0" 
                style={{ 
                  backgroundColor: '#FFFFFF',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 69, 19, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 69, 19, 0.1)';
                }}
              >
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <div 
                      className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        backgroundColor: '#CD853F'
                      }}
                    >
                      <ShoppingCart size={32} style={{ color: '#F5DEB3' }} />
                    </div>
                  </div>
                  <h5 style={{ color: '#8B4513', fontWeight: 'bold' }}>Orders</h5>
                  <p style={{ color: '#5D4037', lineHeight: '1.6' }}>
                    View and manage your orders with real-time updates
                  </p>
                  <Button 
                    as={Link} 
                    to="/orders" 
                    style={{ 
                      backgroundColor: '#8B4513',
                      borderColor: '#8B4513',
                      color: '#F5DEB3',
                      fontWeight: 'bold',
                      padding: '10px 25px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#A0522D';
                      e.target.style.borderColor = '#A0522D';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#8B4513';
                      e.target.style.borderColor = '#8B4513';
                    }}
                  >
                    My Orders
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-4">
              <Card 
                className="h-100 shadow-lg border-0" 
                style={{ 
                  backgroundColor: '#FFFFFF',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 69, 19, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 69, 19, 0.1)';
                }}
              >
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <div 
                      className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        backgroundColor: '#A0522D'
                      }}
                    >
                      <Calendar size={32} style={{ color: '#F5DEB3' }} />
                    </div>
                  </div>
                  <h5 style={{ color: '#8B4513', fontWeight: 'bold' }}>Reservations</h5>
                  <p style={{ color: '#5D4037', lineHeight: '1.6' }}>
                    Book a table for your perfect cafe experience
                  </p>
                  <Button 
                    as={Link} 
                    to="/reservations" 
                    style={{ 
                      backgroundColor: '#CD853F',
                      borderColor: '#CD853F',
                      color: '#F5DEB3',
                      fontWeight: 'bold',
                      padding: '10px 25px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#A0522D';
                      e.target.style.borderColor = '#A0522D';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#CD853F';
                      e.target.style.borderColor = '#CD853F';
                    }}
                  >
                    Make Reservation
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          {/* Staff/Admin Section */}
          {(user.role === 'admin' || user.role === 'staff') && (
            <Card 
              className="shadow-lg border-0 mb-5" 
              style={{ backgroundColor: '#8B4513' }}
            >
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h2 style={{ color: '#F5DEB3' }}>Staff Operations</h2>
                  <p style={{ color: '#CD853F' }}>Manage daily operations efficiently</p>
                </div>
                <Row>
                  <Col md={6} className="mb-4">
                    <Card 
                      className="h-100 shadow-sm border-0" 
                      style={{ 
                        backgroundColor: '#F5DEB3',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <Card.Body className="text-center p-4">
                        <Package size={48} style={{ color: '#8B4513' }} className="mb-3" />
                        <h5 style={{ color: '#8B4513', fontWeight: 'bold' }}>Inventory</h5>
                        <p style={{ color: '#5D4037', lineHeight: '1.6' }}>
                          Manage inventory and stock levels in real-time
                        </p>
                        <Button 
                          as={Link} 
                          to="/inventory" 
                          style={{ 
                            backgroundColor: '#8B4513',
                            borderColor: '#8B4513',
                            color: '#F5DEB3',
                            fontWeight: 'bold'
                          }}
                        >
                          View Inventory
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col md={6} className="mb-4">
                    <Card 
                      className="h-100 shadow-sm border-0" 
                      style={{ 
                        backgroundColor: '#F5DEB3',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <Card.Body className="text-center p-4">
                        <Receipt size={48} style={{ color: '#8B4513' }} className="mb-3" />
                        <h5 style={{ color: '#8B4513', fontWeight: 'bold' }}>Bills</h5>
                        <p style={{ color: '#5D4037', lineHeight: '1.6' }}>
                          Handle billing and payments seamlessly
                        </p>
                        <Button 
                          as={Link} 
                          to="/bills" 
                          style={{ 
                            backgroundColor: '#8B4513',
                            borderColor: '#8B4513',
                            color: '#F5DEB3',
                            fontWeight: 'bold'
                          }}
                        >
                          Manage Bills
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
          
          {/* Admin Only Section */}
          {user.role === 'admin' && (
            <Card 
              className="shadow-lg border-0" 
              style={{ backgroundColor: '#CD853F' }}
            >
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h2 style={{ color: '#F5DEB3' }}>Admin Dashboard</h2>
                  <p style={{ color: '#8B4513' }}>Advanced management tools</p>
                </div>
                <Row>
                  <Col md={6} className="mb-4">
                    <Card 
                      className="h-100 shadow-sm border-0" 
                      style={{ 
                        backgroundColor: '#F5DEB3',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <Card.Body className="text-center p-4">
                        <Users size={48} style={{ color: '#8B4513' }} className="mb-3" />
                        <h5 style={{ color: '#8B4513', fontWeight: 'bold' }}>Staff Management</h5>
                        <p style={{ color: '#5D4037', lineHeight: '1.6' }}>
                          Manage staff schedules and performance
                        </p>
                        <Button 
                          as={Link} 
                          to="/staff" 
                          style={{ 
                            backgroundColor: '#CD853F',
                            borderColor: '#CD853F',
                            color: '#F5DEB3',
                            fontWeight: 'bold'
                          }}
                        >
                          Manage Staff
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col md={6} className="mb-4">
                    <Card 
                      className="h-100 shadow-sm border-0" 
                      style={{ 
                        backgroundColor: '#F5DEB3',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <Card.Body className="text-center p-4">
                        <BarChart3 size={48} style={{ color: '#8B4513' }} className="mb-3" />
                        <h5 style={{ color: '#8B4513', fontWeight: 'bold' }}>Analytics</h5>
                        <p style={{ color: '#5D4037', lineHeight: '1.6' }}>
                          View comprehensive reports and insights
                        </p>
                        <Button 
                          as={Link} 
                          to="/analytics" 
                          style={{ 
                            backgroundColor: '#CD853F',
                            borderColor: '#CD853F',
                            color: '#F5DEB3',
                            fontWeight: 'bold'
                          }}
                        >
                          View Analytics
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Container>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#FFF8DC', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ backgroundColor: '#8B4513', color: '#F5DEB3' }} className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="d-flex align-items-center mb-4">
                <Coffee size={60} style={{ color: '#F5DEB3' }} className="me-3" />
                <h1 className="display-4 fw-bold mb-0">Welcome to Glenz Cafe</h1>
              </div>
              <p className="lead mb-4" style={{ fontSize: '1.3rem', lineHeight: '1.6' }}>
                Experience the finest coffee, delicious food, and exceptional service 
                in a warm and welcoming atmosphere that feels like home.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button 
                  as={Link} 
                  to="/register" 
                  size="lg" 
                  style={{ 
                    backgroundColor: '#CD853F',
                    borderColor: '#CD853F',
                    color: '#F5DEB3',
                    fontWeight: 'bold',
                    padding: '12px 30px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#A0522D';
                    e.target.style.borderColor = '#A0522D';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#CD853F';
                    e.target.style.borderColor = '#CD853F';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  Get Started
                </Button>
                <Button 
                  as={Link} 
                  to="/login" 
                  variant="outline-light" 
                  size="lg"
                  style={{ 
                    borderColor: '#F5DEB3',
                    color: '#F5DEB3',
                    fontWeight: 'bold',
                    padding: '12px 30px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#F5DEB3';
                    e.target.style.color = '#8B4513';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#F5DEB3';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  Login
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <div className="text-center">
                <Card 
                  className="shadow-lg border-0" 
                  style={{ 
                    backgroundColor: '#CD853F',
                    minHeight: '350px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    <Coffee size={80} style={{ color: '#F5DEB3' }} className="mb-3" />
                    <h3 style={{ color: '#F5DEB3', fontWeight: 'bold' }}>Premium Coffee Experience</h3>
                    <p style={{ color: '#8B4513', fontSize: '1.1rem', textAlign: 'center' }}>
                      Crafted with passion, served with love
                    </p>
                    <div className="d-flex gap-3 mt-3">
                      <div className="text-center">
                        <Star size={24} style={{ color: '#F5DEB3' }} />
                        <div style={{ color: '#F5DEB3', fontSize: '1.2rem', fontWeight: 'bold' }}>4.9</div>
                        <small style={{ color: '#8B4513' }}>Rating</small>
                      </div>
                      <div className="text-center">
                        <Award size={24} style={{ color: '#F5DEB3' }} />
                        <div style={{ color: '#F5DEB3', fontSize: '1.2rem', fontWeight: 'bold' }}>50+</div>
                        <small style={{ color: '#8B4513' }}>Awards</small>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5" style={{ color: '#8B4513' }}>Why Choose Glenz Cafe?</h2>
              <p className="lead" style={{ color: '#A0522D' }}>Discover what makes us special</p>
            </Col>
          </Row>
          
          <Row>
            <Col md={4} className="mb-4">
              <Card 
                className="h-100 shadow-lg border-0" 
                style={{ 
                  backgroundColor: '#FFFFFF',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(139, 69, 19, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 69, 19, 0.1)';
                }}
              >
                <Card.Body className="text-center p-4">
                  <div className="mb-4">
                    <div 
                      className="rounded-circle d-inline-flex align-items-center justify-content-center" 
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        backgroundColor: '#8B4513'
                      }}
                    >
                      <Coffee size={32} style={{ color: '#F5DEB3' }} />
                    </div>
                  </div>
                  <h5 style={{ color: '#8B4513', fontWeight: 'bold' }}>Premium Coffee</h5>
                  <p style={{ color: '#5D4037', lineHeight: '1.6' }}>
                    Freshly roasted beans sourced from the finest coffee regions worldwide, 
                    ensuring every cup delivers exceptional taste and aroma.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-4">
              <Card 
                className="h-100 shadow-lg border-0" 
                style={{ 
                  backgroundColor: '#FFFFFF',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(139, 69, 19, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 69, 19, 0.1)';
                }}
              >
                <Card.Body className="text-center p-4">
                  <div className="mb-4">
                    <div 
                      className="rounded-circle d-inline-flex align-items-center justify-content-center" 
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        backgroundColor: '#CD853F'
                      }}
                    >
                      <Clock size={32} style={{ color: '#F5DEB3' }} />
                    </div>
                  </div>
                  <h5 style={{ color: '#8B4513', fontWeight: 'bold' }}>Quick Service</h5>
                  <p style={{ color: '#5D4037', lineHeight: '1.6' }}>
                    Fast and efficient service without compromising on quality, 
                    ensuring you get your perfect cup when you need it.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-4">
              <Card 
                className="h-100 shadow-lg border-0" 
                style={{ 
                  backgroundColor: '#FFFFFF',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(139, 69, 19, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 69, 19, 0.1)';
                }}
              >
                <Card.Body className="text-center p-4">
                  <div className="mb-4">
                    <div 
                      className="rounded-circle d-inline-flex align-items-center justify-content-center" 
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        backgroundColor: '#A0522D'
                      }}
                    >
                      <Heart size={32} style={{ color: '#F5DEB3' }} />
                    </div>
                  </div>
                  <h5 style={{ color: '#8B4513', fontWeight: 'bold' }}>Cozy Atmosphere</h5>
                  <p style={{ color: '#5D4037', lineHeight: '1.6' }}>
                    Relax in our comfortable and inviting space perfect for any occasion, 
                    from casual meetings to peaceful solo moments.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section style={{ backgroundColor: '#CD853F' }} className="py-5">
        <Container>
          <Row className="text-center">
            <Col>
              <div className="mb-4">
                <Coffee size={60} style={{ color: '#F5DEB3' }} className="mb-3" />
                <h2 style={{ color: '#F5DEB3', fontWeight: 'bold' }}>Ready to Experience Glenz Cafe?</h2>
                <p className="lead mb-4" style={{ color: '#8B4513', fontSize: '1.2rem' }}>
                  Join our community and enjoy the best cafe experience in town. 
                  Every cup tells a story, every visit creates memories.
                </p>
                <Button 
                  as={Link} 
                  to="/register" 
                  size="lg"
                  style={{ 
                    backgroundColor: '#8B4513',
                    borderColor: '#8B4513',
                    color: '#F5DEB3',
                    fontWeight: 'bold',
                    padding: '15px 40px',
                    fontSize: '1.1rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#A0522D';
                    e.target.style.borderColor = '#A0522D';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#8B4513';
                    e.target.style.borderColor = '#8B4513';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  Join Now
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Home;