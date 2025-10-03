import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Coffee, Package, Truck, Calendar, PartyPopper, Wifi, Clock, Star, DollarSign, Utensils } from 'lucide-react';

function Services() {
  const services = [
    {
      title: "Dine-In Experience",
      description: "Enjoy our cozy atmosphere with comfortable seating, ambient lighting, and excellent personalized service that makes every visit memorable.",
      icon: <Utensils size={40} />,
      color: "#8B4513"
    },
    {
      title: "Takeaway Orders",
      description: "Quick and convenient takeaway service for busy customers with pre-order options and express pickup counters.",
      icon: <Package size={40} />,
      color: "#CD853F"
    },
    {
      title: "Home Delivery",
      description: "Get your favorite cafe items delivered right to your doorstep with our reliable delivery service covering Salem city.",
      icon: <Truck size={40} />,
      color: "#A0522D"
    },
    {
      title: "Table Reservations",
      description: "Book your table in advance for special occasions, business meetings, and intimate gatherings with our easy reservation system.",
      icon: <Calendar size={40} />,
      color: "#8B4513"
    },
    {
      title: "Catering Services",
      description: "Professional catering for your events, corporate meetings, and celebrations with customizable menu options.",
      icon: <PartyPopper size={40} />,
      color: "#CD853F"
    },
    {
      title: "Free Wi-Fi",
      description: "Stay connected with complimentary high-speed internet access perfect for remote work, study sessions, or casual browsing.",
      icon: <Wifi size={40} />,
      color: "#A0522D"
    }
  ];

  const features = [
    {
      icon: <Clock size={32} />,
      title: "Quick Service",
      description: "Fast and efficient service without compromising on quality, with average wait times under 10 minutes"
    },
    {
      icon: <Star size={32} />,
      title: "Quality Ingredients",
      description: "Fresh, locally sourced ingredients and premium coffee beans for the best taste and health benefits"
    },
    {
      icon: <DollarSign size={32} />,
      title: "Affordable Prices",
      description: "Great value for money with competitive pricing and special combo deals for students and families"
    }
  ];

  return (
    <div style={{ backgroundColor: '#FFF8DC', minHeight: '100vh', paddingTop: '0px' }}>
      <Container className="py-5">
        {/* Header Section */}
        <Row className="text-center mb-5">
          <Col>
            <div className="d-flex align-items-center justify-content-center mb-3">
              <Coffee size={40} style={{ color: '#8B4513' }} className="me-3" />
              <h1 className="display-4 mb-0" style={{ color: '#8B4513' }}>Our Services</h1>
            </div>
            <p className="lead" style={{ color: '#A0522D' }}>
              Discover the wide range of services we offer to make your cafe experience exceptional
            </p>
          </Col>
        </Row>
        
        {/* Services Grid */}
        <Row className="mb-5">
          {services.map((service, index) => (
            <Col md={6} lg={4} key={index} className="mb-4">
              <Card 
                className="h-100 shadow-sm border-0" 
                style={{ 
                  backgroundColor: '#FFFFFF',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 69, 19, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                }}
              >
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <div 
                      className="rounded-circle d-inline-flex align-items-center justify-content-center" 
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        backgroundColor: service.color,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ color: '#F5DEB3' }}>
                        {service.icon}
                      </div>
                    </div>
                  </div>
                  <Card.Title style={{ color: '#8B4513', fontWeight: '600', marginBottom: '1rem' }}>
                    {service.title}
                  </Card.Title>
                  <Card.Text style={{ color: '#5D4037', lineHeight: '1.6' }}>
                    {service.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
        {/* Why Choose Us Section */}
        <Row className="mt-5">
          <Col>
            <Card className="shadow-sm border-0" style={{ backgroundColor: '#8B4513' }}>
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h3 style={{ color: '#F5DEB3', fontWeight: '600' }}>Why Choose Glenz Cafe?</h3>
                  <p style={{ color: '#CD853F', fontSize: '1.1rem', marginTop: '1rem' }}>
                    Experience the perfect blend of quality, service, and value that sets us apart
                  </p>
                </div>
                
                <Row className="mt-4">
                  {features.map((feature, index) => (
                    <Col md={4} key={index} className="mb-4">
                      <div className="text-center">
                        <div className="mb-3">
                          <div 
                            className="rounded-circle d-inline-flex align-items-center justify-content-center mx-auto" 
                            style={{ 
                              width: '70px', 
                              height: '70px', 
                              backgroundColor: '#A0522D',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <div style={{ color: '#F5DEB3' }}>
                              {feature.icon}
                            </div>
                          </div>
                        </div>
                        <h5 style={{ color: '#F5DEB3', fontWeight: '600', marginBottom: '1rem' }}>
                          {feature.title}
                        </h5>
                        <p style={{ color: '#CD853F', lineHeight: '1.6' }}>
                          {feature.description}
                        </p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Call to Action Section */}
        <Row className="mt-5">
          <Col>
            <Card className="shadow-sm border-0" style={{ backgroundColor: '#FFFFFF' }}>
              <Card.Body className="text-center p-5">
                <div className="mb-4">
                  <div 
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mx-auto" 
                    style={{ 
                      width: '90px', 
                      height: '90px', 
                      backgroundColor: '#CD853F'
                    }}
                  >
                    <Coffee size={45} style={{ color: '#F5DEB3' }} />
                  </div>
                </div>
                <h4 style={{ color: '#8B4513', fontWeight: '600', marginBottom: '1rem' }}>
                  Ready to Experience Glenz Cafe?
                </h4>
                <p style={{ color: '#A0522D', fontSize: '1.1rem', marginBottom: '2rem' }}>
                  Visit us today and discover why we're Salem's favorite cafe destination. 
                  Whether you're looking for a quick coffee, a hearty meal, or a place to relax and work, 
                  we've got everything you need.
                </p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <div className="text-center">
                    <div style={{ color: '#8B4513', fontWeight: '600' }}>📍 Location</div>
                    <div style={{ color: '#A0522D' }}>Salem, Tamil Nadu</div>
                  </div>
                  <div className="text-center">
                    <div style={{ color: '#8B4513', fontWeight: '600' }}>📞 Call Us</div>
                    <div style={{ color: '#A0522D' }}>+91 98765 43210</div>
                  </div>
                  <div className="text-center">
                    <div style={{ color: '#8B4513', fontWeight: '600' }}>⏰ Hours</div>
                    <div style={{ color: '#A0522D' }}>7:00 AM - 10:00 PM</div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Services;