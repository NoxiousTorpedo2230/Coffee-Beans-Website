import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Coffee, Heart, Users, Leaf, Award, Target, Star } from 'lucide-react';

function About() {
  return (
    <div style={{ backgroundColor: '#FFF8DC', minHeight: '100vh', paddingTop: '0px' }}>
      <Container className="py-5">
        {/* Header Section */}
        <Row className="text-center mb-5">
          <Col>
            <div className="d-flex align-items-center justify-content-center mb-3">
              <Coffee size={40} style={{ color: '#8B4513' }} className="me-3" />
              <h1 className="display-4 mb-0" style={{ color: '#8B4513' }}>About Glenz Cafe</h1>
            </div>
            <p className="lead" style={{ color: '#A0522D' }}>
              Discover our story, mission, and the passion behind every cup
            </p>
          </Col>
        </Row>

        {/* Our Story Section */}
        <Row className="mb-5">
          <Col lg={6} className="mb-4">
            <Card className="h-100 shadow-sm border-0" style={{ backgroundColor: '#FFFFFF' }}>
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <Heart size={32} style={{ color: '#CD853F' }} className="me-3" />
                  <h2 style={{ color: '#8B4513' }}>Our Story</h2>
                </div>
                <p style={{ color: '#5D4037', lineHeight: '1.6' }}>
                  Founded in 2020, Glenz Cafe began as a small dream to create a space where 
                  coffee lovers could come together and enjoy exceptional beverages in a 
                  warm, welcoming environment. What started as a single location has grown 
                  into a beloved community gathering place.
                </p>
                <p style={{ color: '#5D4037', lineHeight: '1.6' }}>
                  Our founders, passionate about both coffee and community, believed that 
                  a great cafe should be more than just a place to grab a quick drink. 
                  It should be a place where people connect, ideas flow, and memories are made.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} className="mb-4">
            <Card className="h-100 shadow-sm border-0" style={{ backgroundColor: '#8B4513' }}>
              <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center p-4">
                <Coffee size={64} style={{ color: '#F5DEB3' }} className="mb-3" />
                <h3 style={{ color: '#F5DEB3' }}>Since 2020</h3>
                <p style={{ color: '#F5DEB3', fontSize: '1.1rem' }}>
                  Serving our community with passion and dedication
                </p>
                <div className="d-flex gap-3 mt-3">
                  <div className="text-center">
                    <div style={{ color: '#F5DEB3', fontSize: '2rem', fontWeight: 'bold' }}>1000+</div>
                    <small style={{ color: '#CD853F' }}>Happy Customers</small>
                  </div>
                  <div className="text-center">
                    <div style={{ color: '#F5DEB3', fontSize: '2rem', fontWeight: 'bold' }}>50+</div>
                    <small style={{ color: '#CD853F' }}>Coffee Varieties</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Our Mission Section */}
        <Row className="mb-5">
          <Col lg={6} className="mb-4">
            <Card className="h-100 shadow-sm border-0" style={{ backgroundColor: '#CD853F' }}>
              <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center p-4">
                <Target size={64} style={{ color: '#F5DEB3' }} className="mb-3" />
                <h3 style={{ color: '#F5DEB3' }}>Our Mission</h3>
                <p style={{ color: '#F5DEB3', fontSize: '1.1rem' }}>
                  To serve exceptional coffee and create lasting connections within our community
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} className="mb-4">
            <Card className="h-100 shadow-sm border-0" style={{ backgroundColor: '#FFFFFF' }}>
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <Target size={32} style={{ color: '#CD853F' }} className="me-3" />
                  <h2 style={{ color: '#8B4513' }}>Our Mission</h2>
                </div>
                <p style={{ color: '#5D4037', lineHeight: '1.6' }}>
                  At Glenz Cafe, our mission is simple: to serve exceptional coffee and food 
                  while creating a space where our community can thrive. We are committed to:
                </p>
                <ul style={{ color: '#5D4037', lineHeight: '1.6' }}>
                  <li>Sourcing the finest, ethically-sourced coffee beans</li>
                  <li>Providing outstanding customer service</li>
                  <li>Supporting local suppliers and producers</li>
                  <li>Creating a sustainable and environmentally conscious business</li>
                  <li>Building lasting relationships with our customers</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Our Values Section */}
        <Row className="mb-5">
          <Col>
            <div className="text-center mb-4">
              <h2 style={{ color: '#8B4513' }}>Our Values</h2>
              <p style={{ color: '#A0522D' }}>The principles that guide everything we do</p>
            </div>
            <Row>
              <Col md={4} className="mb-4">
                <Card className="h-100 shadow-sm border-0" style={{ backgroundColor: '#FFFFFF' }}>
                  <Card.Body className="text-center p-4">
                    <div className="mb-3">
                      <div 
                        className="rounded-circle d-inline-flex align-items-center justify-content-center" 
                        style={{ 
                          width: '80px', 
                          height: '80px', 
                          backgroundColor: '#CD853F'
                        }}
                      >
                        <Award size={32} style={{ color: '#F5DEB3' }} />
                      </div>
                    </div>
                    <h5 style={{ color: '#8B4513' }}>Quality</h5>
                    <p style={{ color: '#5D4037', lineHeight: '1.6' }}>
                      We never compromise on quality, from our coffee beans to our service. 
                      Every cup is crafted with care and attention to detail.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={4} className="mb-4">
                <Card className="h-100 shadow-sm border-0" style={{ backgroundColor: '#FFFFFF' }}>
                  <Card.Body className="text-center p-4">
                    <div className="mb-3">
                      <div 
                        className="rounded-circle d-inline-flex align-items-center justify-content-center" 
                        style={{ 
                          width: '80px', 
                          height: '80px', 
                          backgroundColor: '#8B4513'
                        }}
                      >
                        <Users size={32} style={{ color: '#F5DEB3' }} />
                      </div>
                    </div>
                    <h5 style={{ color: '#8B4513' }}>Community</h5>
                    <p style={{ color: '#5D4037', lineHeight: '1.6' }}>
                      We believe in the power of community and strive to create a space 
                      where everyone feels welcome and valued.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={4} className="mb-4">
                <Card className="h-100 shadow-sm border-0" style={{ backgroundColor: '#FFFFFF' }}>
                  <Card.Body className="text-center p-4">
                    <div className="mb-3">
                      <div 
                        className="rounded-circle d-inline-flex align-items-center justify-content-center" 
                        style={{ 
                          width: '80px', 
                          height: '80px', 
                          backgroundColor: '#A0522D'
                        }}
                      >
                        <Leaf size={32} style={{ color: '#F5DEB3' }} />
                      </div>
                    </div>
                    <h5 style={{ color: '#8B4513' }}>Sustainability</h5>
                    <p style={{ color: '#5D4037', lineHeight: '1.6' }}>
                      We are committed to environmental responsibility and sustainable 
                      practices in everything we do.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Meet Our Team Section */}
        <Card 
          className="shadow-sm border-0" 
          style={{ backgroundColor: '#8B4513' }}
        >
          <Card.Body className="p-5">
            <div className="text-center mb-4">
              <h2 style={{ color: '#F5DEB3' }}>Meet Our Team</h2>
              <p style={{ color: '#CD853F' }}>The passionate people behind Glenz Cafe</p>
            </div>
            <Row>
              <Col md={4} className="text-center mb-4">
                <div 
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" 
                  style={{ 
                    width: '120px', 
                    height: '120px', 
                    backgroundColor: '#CD853F'
                  }}
                >
                  <Users size={48} style={{ color: '#F5DEB3' }} />
                </div>
                <h5 style={{ color: '#F5DEB3' }}>Sarah Johnson</h5>
                <p style={{ color: '#CD853F' }}>Founder & CEO</p>
                <p style={{ color: '#F5DEB3', fontSize: '0.9rem' }}>
                  Sarah's passion for coffee and community drives the vision of Glenz Cafe.
                </p>
              </Col>
              
              <Col md={4} className="text-center mb-4">
                <div 
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" 
                  style={{ 
                    width: '120px', 
                    height: '120px', 
                    backgroundColor: '#A0522D'
                  }}
                >
                  <Coffee size={48} style={{ color: '#F5DEB3' }} />
                </div>
                <h5 style={{ color: '#F5DEB3' }}>Michael Chen</h5>
                <p style={{ color: '#CD853F' }}>Head Barista</p>
                <p style={{ color: '#F5DEB3', fontSize: '0.9rem' }}>
                  Michael brings years of experience and expertise to every cup he crafts.
                </p>
              </Col>
              
              <Col md={4} className="text-center mb-4">
                <div 
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" 
                  style={{ 
                    width: '120px', 
                    height: '120px', 
                    backgroundColor: '#CD853F'
                  }}
                >
                  <Star size={48} style={{ color: '#F5DEB3' }} />
                </div>
                <h5 style={{ color: '#F5DEB3' }}>Emma Rodriguez</h5>
                <p style={{ color: '#CD853F' }}>Operations Manager</p>
                <p style={{ color: '#F5DEB3', fontSize: '0.9rem' }}>
                  Emma ensures smooth operations and exceptional customer experiences.
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default About;