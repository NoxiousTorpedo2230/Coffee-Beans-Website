import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Table, Badge, Modal } from 'react-bootstrap';
import { MessageSquare, Star, Coffee, Calendar, User, Plus, Edit3 } from 'lucide-react';

function Feedback({ user, token }) {
  const [feedback, setFeedback] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    order: '',
    rating: 5,
    comment: '',
    category: 'overall'
  });

  // Fetch feedback data
  const fetchFeedback = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch feedback');
      }
      
      const data = await response.json();
      setFeedback(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch user's orders for feedback
  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      
      const data = await response.json();
      // Filter orders for current user if not admin
      const userOrders = user.role === 'admin' 
        ? data 
        : data.filter(order => order.customer._id === user.id);
      setOrders(userOrders);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
    fetchOrders();
  }, [token, user.id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      order: '',
      rating: 5,
      comment: '',
      category: 'overall'
    });
  };

  // Handle submit feedback
  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          rating: parseInt(formData.rating)
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      setSuccess('Feedback submitted successfully!');
      setShowAddModal(false);
      resetForm();
      fetchFeedback();
    } catch (err) {
      setError(err.message);
    }
  };

  // Get rating stars
  const getRatingStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  // Get category badge variant and color
  const getCategoryInfo = (category) => {
    switch (category) {
      case 'food': return { variant: 'success', color: '#8B4513', bg: '#F5DEB3' };
      case 'service': return { variant: 'primary', color: '#CD853F', bg: '#F5DEB3' };
      case 'ambiance': return { variant: 'info', color: '#A0522D', bg: '#F5DEB3' };
      case 'overall': return { variant: 'warning', color: '#8B4513', bg: '#CD853F' };
      default: return { variant: 'secondary', color: '#8B4513', bg: '#F5DEB3' };
    }
  };

  // Filter feedback based on user role
  const displayFeedback = user.role === 'admin' 
    ? feedback 
    : feedback.filter(fb => fb.customer._id === user.id);

  if (loading) {
    return (
      <div style={{ backgroundColor: '#FFF8DC', minHeight: '100vh', paddingTop: '0px' }}>
        <Container className="py-5">
          <div className="text-center">
            <div className="d-flex align-items-center justify-content-center mb-3">
              <Coffee size={40} style={{ color: '#8B4513' }} className="me-3" />
              <div className="spinner-border" role="status" style={{ color: '#8B4513' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            <p style={{ color: '#A0522D' }}>Loading feedback...</p>
          </div>
        </Container>
      </div>
    );
  }

  const customStyles = `
    .feedback-card {
      background-color: #FFFFFF;
      border: none;
      box-shadow: 0 4px 6px rgba(139, 69, 19, 0.1);
      transition: all 0.3s ease;
    }
    
    .feedback-card:hover {
      box-shadow: 0 6px 12px rgba(139, 69, 19, 0.15);
      transform: translateY(-2px);
    }
    
    .feedback-btn-primary {
      background-color: #8B4513;
      border-color: #8B4513;
      color: #F5DEB3;
      transition: all 0.3s ease;
    }
    
    .feedback-btn-primary:hover {
      background-color: #CD853F;
      border-color: #CD853F;
      color: #FFFFFF;
    }
    
    .feedback-btn-secondary {
      background-color: #A0522D;
      border-color: #A0522D;
      color: #F5DEB3;
      transition: all 0.3s ease;
    }
    
    .feedback-btn-secondary:hover {
      background-color: #8B4513;
      border-color: #8B4513;
      color: #FFFFFF;
    }
    
    .feedback-table {
      background-color: #FFFFFF;
      border-radius: 10px;
      overflow: hidden;
    }
    
    .feedback-table th {
      background-color: #8B4513;
      color: #F5DEB3;
      border: none;
      font-weight: 600;
    }
    
    .feedback-table td {
      border-color: #F5DEB3;
      color: #5D4037;
      vertical-align: middle;
    }
    
    .feedback-table tr:hover {
      background-color: #FFF8DC;
    }
    
    .feedback-modal .modal-header {
      background-color: #8B4513;
      color: #F5DEB3;
      border-bottom: none;
    }
    
    .feedback-modal .modal-body {
      background-color: #FFF8DC;
    }
    
    .feedback-form-control {
      border-color: #CD853F;
      color: #5D4037;
    }
    
    .feedback-form-control:focus {
      border-color: #8B4513;
      box-shadow: 0 0 0 0.2rem rgba(139, 69, 19, 0.25);
    }
    
    .feedback-form-label {
      color: #8B4513;
      font-weight: 600;
    }
    
    .rating-stars {
      color: #CD853F;
      font-size: 1.2rem;
    }
    
    .custom-badge {
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
      border-radius: 20px;
      font-weight: 500;
    }
  `;

  return (
    <>
      <style>{customStyles}</style>
      <div style={{ backgroundColor: '#FFF8DC', minHeight: '100vh', paddingTop: '0px' }}>
        <Container className="py-5">
          <Row>
            <Col>
              {/* Header Section */}
              <div className="text-center mb-5">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <MessageSquare size={40} style={{ color: '#8B4513' }} className="me-3" />
                  <h1 className="display-4 mb-0" style={{ color: '#8B4513' }}>
                    {user.role === 'admin' ? 'Customer Feedback' : 'My Feedback'}
                  </h1>
                </div>
                <p className="lead" style={{ color: '#A0522D' }}>
                  {user.role === 'admin' 
                    ? 'Review and manage customer feedback' 
                    : 'Share your experience and help us improve'}
                </p>
              </div>

              {/* Main Content Card */}
              <Card className="feedback-card">
                <Card.Header 
                  className="d-flex justify-content-between align-items-center"
                  style={{ backgroundColor: '#8B4513', color: '#F5DEB3', border: 'none' }}
                >
                  <div className="d-flex align-items-center">
                    <Star size={24} className="me-2" />
                    <h4 className="mb-0">
                      {user.role === 'admin' ? 'All Customer Reviews' : 'Your Reviews'}
                    </h4>
                  </div>
                  <Button 
                    className="feedback-btn-primary d-flex align-items-center"
                    onClick={() => setShowAddModal(true)}
                    disabled={user.role === 'admin'}
                  >
                    <Plus size={18} className="me-2" />
                    {user.role === 'admin' ? 'Admin View Only' : 'Add Review'}
                  </Button>
                </Card.Header>
                
                <Card.Body style={{ backgroundColor: '#FFFFFF' }}>
                  {error && (
                    <Alert 
                      variant="danger" 
                      style={{ 
                        backgroundColor: '#FFF8DC', 
                        borderColor: '#A0522D', 
                        color: '#8B4513' 
                      }}
                    >
                      {error}
                    </Alert>
                  )}
                  {success && (
                    <Alert 
                      variant="success" 
                      style={{ 
                        backgroundColor: '#F5DEB3', 
                        borderColor: '#8B4513', 
                        color: '#8B4513' 
                      }}
                    >
                      {success}
                    </Alert>
                  )}
                  
                  {displayFeedback.length === 0 ? (
                    <div className="text-center py-5">
                      <Coffee size={64} style={{ color: '#CD853F' }} className="mb-3" />
                      <h5 style={{ color: '#8B4513' }}>No feedback found</h5>
                      <p style={{ color: '#A0522D' }}>
                        {user.role === 'admin' 
                          ? 'No customer feedback has been submitted yet.' 
                          : 'You haven\'t submitted any feedback yet. Share your experience!'}
                      </p>
                    </div>
                  ) : (
                    <div className="feedback-table">
                      <Table responsive striped hover className="mb-0">
                        <thead>
                          <tr>
                            {user.role === 'admin' && (
                              <th>
                                <User size={18} className="me-2" />
                                Customer
                              </th>
                            )}
                            <th>
                              <Coffee size={18} className="me-2" />
                              Order ID
                            </th>
                            <th>
                              <Star size={18} className="me-2" />
                              Rating
                            </th>
                            <th>
                              <Edit3 size={18} className="me-2" />
                              Category
                            </th>
                            <th>
                              <MessageSquare size={18} className="me-2" />
                              Comment
                            </th>
                            <th>
                              <Calendar size={18} className="me-2" />
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {displayFeedback.map((fb) => {
                            const categoryInfo = getCategoryInfo(fb.category);
                            return (
                              <tr key={fb._id}>
                                {user.role === 'admin' && (
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div 
                                        className="rounded-circle d-flex align-items-center justify-content-center me-2"
                                        style={{ 
                                          width: '32px', 
                                          height: '32px', 
                                          backgroundColor: '#CD853F',
                                          color: '#F5DEB3'
                                        }}
                                      >
                                        {fb.customer?.name?.charAt(0) || 'U'}
                                      </div>
                                      <strong>{fb.customer?.name || 'N/A'}</strong>
                                    </div>
                                  </td>
                                )}
                                <td>
                                  <code 
                                    style={{ 
                                      backgroundColor: '#FFF8DC', 
                                      color: '#8B4513',
                                      padding: '0.25rem 0.5rem',
                                      borderRadius: '4px',
                                      fontSize: '0.85rem'
                                    }}
                                  >
                                    #{fb.order?._id?.slice(-6) || 'N/A'}
                                  </code>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <span className="rating-stars me-2">
                                      {getRatingStars(fb.rating)}
                                    </span>
                                    <small style={{ color: '#A0522D' }}>
                                      ({fb.rating}/5)
                                    </small>
                                  </div>
                                </td>
                                <td>
                                  <span 
                                    className="custom-badge"
                                    style={{ 
                                      backgroundColor: categoryInfo.bg,
                                      color: categoryInfo.color
                                    }}
                                  >
                                    {fb.category}
                                  </span>
                                </td>
                                <td>
                                  <div style={{ maxWidth: '300px' }}>
                                    {fb.comment || (
                                      <em style={{ color: '#A0522D' }}>No comment</em>
                                    )}
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Calendar size={16} className="me-2" style={{ color: '#A0522D' }} />
                                    {new Date(fb.createdAt).toLocaleDateString()}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Add Feedback Modal */}
          <Modal 
            show={showAddModal} 
            onHide={() => setShowAddModal(false)} 
            size="lg"
            className="feedback-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title className="d-flex align-items-center">
                <Star size={24} className="me-2" />
                Add Your Feedback
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmitFeedback}>
                <Form.Group className="mb-3">
                  <Form.Label className="feedback-form-label">
                    <Coffee size={18} className="me-2" />
                    Select Order
                  </Form.Label>
                  <Form.Select
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    className="feedback-form-control"
                    required
                  >
                    <option value="">Choose an order to review</option>
                    {orders.map((order) => (
                      <option key={order._id} value={order._id}>
                        Order #{order._id.slice(-6)} - {new Date(order.createdAt).toLocaleDateString()} - ₹{order.totalAmount}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="feedback-form-label">
                        <Star size={18} className="me-2" />
                        Rating
                      </Form.Label>
                      <Form.Select
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        className="feedback-form-control"
                        required
                      >
                        <option value={5}>5 - Excellent ★★★★★</option>
                        <option value={4}>4 - Good ★★★★☆</option>
                        <option value={3}>3 - Average ★★★☆☆</option>
                        <option value={2}>2 - Poor ★★☆☆☆</option>
                        <option value={1}>1 - Very Poor ★☆☆☆☆</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="feedback-form-label">
                        <Edit3 size={18} className="me-2" />
                        Category
                      </Form.Label>
                      <Form.Select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="feedback-form-control"
                        required
                      >
                        <option value="overall">Overall Experience</option>
                        <option value="food">Food Quality</option>
                        <option value="service">Service</option>
                        <option value="ambiance">Ambiance</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label className="feedback-form-label">
                    <MessageSquare size={18} className="me-2" />
                    Your Comment
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    className="feedback-form-control"
                    placeholder="Share your experience with us... What did you love? What could we improve?"
                    style={{ resize: 'vertical' }}
                  />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button
                    type="button"
                    className="feedback-btn-secondary me-3"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="feedback-btn-primary">
                    <Star size={18} className="me-2" />
                    Submit Review
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </>
  );
}

export default Feedback;