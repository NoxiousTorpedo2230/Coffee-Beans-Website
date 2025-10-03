import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { MapPin, Phone, Clock, Mail, Send, MessageSquare } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setShowAlert(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setTimeout(() => setShowAlert(false), 5000);
  };

  return (
    <div style={{ backgroundColor: '#FFF8DC', minHeight: '100vh', paddingTop: '0px' }}>
      <Container className="py-5">
        {/* Header Section */}
        <Row className="text-center mb-5">
          <Col>
            <div className="d-flex align-items-center justify-content-center mb-3">
              <MessageSquare size={40} style={{ color: '#8B4513' }} className="me-3" />
              <h1 className="display-4 mb-0" style={{ color: '#8B4513' }}>Contact Us</h1>
            </div>
            <p className="lead" style={{ color: '#A0522D' }}>
              Get in touch with us for any inquiries, feedback, or support
            </p>
          </Col>
        </Row>

        {/* Alert */}
        {showAlert && (
          <Alert 
            variant="success" 
            dismissible 
            onClose={() => setShowAlert(false)}
            className="mb-4"
            style={{ backgroundColor: '#CD853F', borderColor: '#8B4513', color: '#FFFFFF' }}
          >
            Thank you for your message! We'll get back to you soon.
          </Alert>
        )}

        {/* Contact Form Section */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto">
            <Card className="shadow-sm border-0" style={{ backgroundColor: '#FFFFFF' }}>
              <Card.Header 
                className="text-center py-3"
                style={{ backgroundColor: '#8B4513', borderBottom: 'none' }}
              >
                <div className="d-flex align-items-center justify-content-center">
                  <Send size={24} style={{ color: '#F5DEB3' }} className="me-2" />
                  <h4 className="mb-0" style={{ color: '#F5DEB3' }}>Send us a Message</h4>
                </div>
              </Card.Header>
              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ color: '#8B4513', fontWeight: '500' }}>
                          Name *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter your full name"
                          style={{ 
                            borderColor: '#CD853F',
                            padding: '12px'
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#8B4513'}
                          onBlur={(e) => e.target.style.borderColor = '#CD853F'}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ color: '#8B4513', fontWeight: '500' }}>
                          Email *
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Enter your email address"
                          style={{ 
                            borderColor: '#CD853F',
                            padding: '12px'
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#8B4513'}
                          onBlur={(e) => e.target.style.borderColor = '#CD853F'}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ color: '#8B4513', fontWeight: '500' }}>
                          Phone
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          style={{ 
                            borderColor: '#CD853F',
                            padding: '12px'
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#8B4513'}
                          onBlur={(e) => e.target.style.borderColor = '#CD853F'}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ color: '#8B4513', fontWeight: '500' }}>
                          Subject *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="Enter the subject"
                          style={{ 
                            borderColor: '#CD853F',
                            padding: '12px'
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#8B4513'}
                          onBlur={(e) => e.target.style.borderColor = '#CD853F'}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: '#8B4513', fontWeight: '500' }}>
                      Message *
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Enter your message"
                      style={{ 
                        borderColor: '#CD853F',
                        padding: '12px'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#8B4513'}
                      onBlur={(e) => e.target.style.borderColor = '#CD853F'}
                    />
                  </Form.Group>

                  <div className="text-center">
                    <Button 
                      type="submit" 
                      size="lg"
                      style={{ 
                        backgroundColor: '#8B4513',
                        borderColor: '#8B4513',
                        padding: '12px 40px',
                        fontWeight: '500'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#A0522D'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#8B4513'}
                    >
                      <Send size={20} className="me-2" />
                      Send Message
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Contact Information Cards */}
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
                    <MapPin size={32} style={{ color: '#F5DEB3' }} />
                  </div>
                </div>
                <h5 style={{ color: '#8B4513' }}>Visit Us</h5>
                <p style={{ color: '#5D4037', lineHeight: '1.6' }}>
                  123 Cafe Street<br />
                  Downtown Area<br />
                  Salem, Tamil Nadu 636001
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
                    <Phone size={32} style={{ color: '#F5DEB3' }} />
                  </div>
                </div>
                <h5 style={{ color: '#8B4513' }}>Call Us</h5>
                <p style={{ color: '#5D4037', lineHeight: '1.6' }}>
                  Phone: +91 98765 43210<br />
                  Landline: 0427-123-4567<br />
                  Support: +91 87654 32109
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
                    <Clock size={32} style={{ color: '#F5DEB3' }} />
                  </div>
                </div>
                <h5 style={{ color: '#8B4513' }}>Hours</h5>
                <p style={{ color: '#5D4037', lineHeight: '1.6' }}>
                  Mon-Fri: 7:00 AM - 10:00 PM<br />
                  Sat-Sun: 8:00 AM - 11:00 PM<br />
                  Holidays: 9:00 AM - 9:00 PM
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Additional Contact Options */}
        <Row className="mt-5">
          <Col>
            <Card className="shadow-sm border-0" style={{ backgroundColor: '#8B4513' }}>
              <Card.Body className="text-center p-4">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <Mail size={32} style={{ color: '#F5DEB3' }} className="me-3" />
                  <h4 style={{ color: '#F5DEB3' }}>Email Us Directly</h4>
                </div>
                <p style={{ color: '#CD853F' }}>
                  For immediate assistance or specific inquiries, reach out to us directly:
                </p>
                <div className="row">
                  <div className="col-md-4 mb-2">
                    <strong style={{ color: '#F5DEB3' }}>General:</strong>
                    <div style={{ color: '#CD853F' }}>hello@glenzcafe.com</div>
                  </div>
                  <div className="col-md-4 mb-2">
                    <strong style={{ color: '#F5DEB3' }}>Support:</strong>
                    <div style={{ color: '#CD853F' }}>support@glenzcafe.com</div>
                  </div>
                  <div className="col-md-4 mb-2">
                    <strong style={{ color: '#F5DEB3' }}>Events:</strong>
                    <div style={{ color: '#CD853F' }}>events@glenzcafe.com</div>
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

export default Contact;