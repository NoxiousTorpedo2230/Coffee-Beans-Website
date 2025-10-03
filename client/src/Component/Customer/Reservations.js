import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Table, Modal, Form, Alert } from 'react-bootstrap';
import { Coffee, Calendar, Users, Clock, Edit3, Check, X } from 'lucide-react';

function Reservations({ user, token }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    tableNumber: '',
    guests: '',
    date: '',
    time: '',
    specialRequests: ''
  });

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reservations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (response.ok) {
        setReservations(data);
      } else {
        setError('Failed to fetch reservations');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          tableNumber: parseInt(formData.tableNumber),
          guests: parseInt(formData.guests)
        })
      });

      if (response.ok) {
        setShowCreateModal(false);
        setFormData({
          tableNumber: '',
          guests: '',
          date: '',
          time: '',
          specialRequests: ''
        });
        fetchReservations();
        setError('');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to create reservation');
      }
    } catch (err) {
      setError('Network error while creating reservation');
    }
  };

  const updateReservationStatus = async (reservationId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reservations/${reservationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchReservations();
      } else {
        setError('Failed to update reservation status');
      }
    } catch (err) {
      setError('Network error while updating reservation');
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'cancelled': return 'danger';
      case 'completed': return 'primary';
      default: return 'secondary';
    }
  };

  const getStatusActions = (reservation) => {
    const { status, _id } = reservation;
    const buttons = [];

    if (user.role === 'admin' || user.role === 'staff') {
      if (status === 'confirmed') {
        buttons.push(
          <Button
            key="completed"
            size="sm"
            className="me-2 coffee-btn-success"
            onClick={() => updateReservationStatus(_id, 'completed')}
          >
            <Check size={14} className="me-1" />
            Complete
          </Button>
        );
        buttons.push(
          <Button
            key="cancelled"
            size="sm"
            className="coffee-btn-danger"
            onClick={() => updateReservationStatus(_id, 'cancelled')}
          >
            <X size={14} className="me-1" />
            Cancel
          </Button>
        );
      }
    }

    return buttons;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#FFF8DC', minHeight: '100vh', color: '#8B4513' }}>
        <Container className="pt-5">
          <div className="text-center">
            <div className="spinner-border" role="status" style={{ color: '#CD853F' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Brewing your reservations...</p>
          </div>
        </Container>
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: '#FFF8DC', minHeight: '100vh', color: '#8B4513', paddingTop: '2rem', paddingBottom: '2rem' }}>
      <style jsx>{`
        .coffee-card {
          background: #FFFFFF;
          border: 1px solid rgba(205, 133, 63, 0.2);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          color: #8B4513;
        }
        
        .coffee-btn-primary {
          background: #CD853F;
          border-color: #CD853F;
          color: #FFFFFF;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .coffee-btn-primary:hover {
          background: #A0522D;
          border-color: #A0522D;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(205, 133, 63, 0.3);
        }
        
        .coffee-btn-success {
          background: #28a745;
          border-color: #28a745;
          color: white;
          transition: all 0.3s ease;
        }
        
        .coffee-btn-success:hover {
          background: #218838;
          border-color: #218838;
          transform: translateY(-1px);
        }
        
        .coffee-btn-danger {
          background: #dc3545;
          border-color: #dc3545;
          color: white;
          transition: all 0.3s ease;
        }
        
        .coffee-btn-danger:hover {
          background: #c82333;
          border-color: #c82333;
          transform: translateY(-1px);
        }
        
        .coffee-table {
          background: #FFFFFF;
          border: 1px solid rgba(205, 133, 63, 0.2);
        }
        
        .coffee-table th {
          background: #CD853F;
          color: #FFFFFF;
          border-bottom: 2px solid #A0522D;
          font-weight: 600;
        }
        
        .coffee-table td {
          border-bottom: 1px solid rgba(205, 133, 63, 0.2);
          color: #5D4037;
        }
        
        .coffee-table tbody tr:hover {
          background: rgba(205, 133, 63, 0.1);
        }
        
        .coffee-modal .modal-content {
          background: #FFFFFF;
          border: 1px solid #CD853F;
          color: #8B4513;
        }
        
        .coffee-modal .modal-header {
          border-bottom: 1px solid rgba(205, 133, 63, 0.3);
        }
        
        .coffee-modal .modal-footer {
          border-top: 1px solid rgba(205, 133, 63, 0.3);
        }
        
        .coffee-form-control {
          background: #FFFFFF;
          border: 1px solid rgba(205, 133, 63, 0.4);
          color: #5D4037;
        }
        
        .coffee-form-control:focus {
          background: #FFFFFF;
          border-color: #CD853F;
          box-shadow: 0 0 0 0.2rem rgba(205, 133, 63, 0.25);
          color: #5D4037;
        }
        
        .coffee-form-control::placeholder {
          color: rgba(93, 64, 55, 0.6);
        }
        
        .coffee-form-label {
          color: #8B4513;
          font-weight: 500;
        }
        
        .coffee-alert {
          background: rgba(220, 53, 69, 0.1);
          border: 1px solid rgba(220, 53, 69, 0.3);
          color: #8B4513;
        }
        
        .coffee-header {
          background: #FFFFFF;
          border-radius: 15px;
          padding: 2rem;
          margin-bottom: 2rem;
          border: 1px solid rgba(205, 133, 63, 0.2);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .coffee-stats {
          background: #FFFFFF;
          border: 1px solid rgba(205, 133, 63, 0.2);
          border-radius: 10px;
          padding: 1rem;
          margin-bottom: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .reservation-id {
          font-family: monospace;
          background: rgba(205, 133, 63, 0.2);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.85em;
          color: #8B4513;
        }
        
        .customer-info {
          font-size: 0.9em;
          color: #5D4037;
        }
        
        .customer-email {
          color: #A0522D;
          font-size: 0.8em;
        }
        
        .stats-icon {
          color: #CD853F;
        }
        
        .stats-number {
          color: #8B4513;
          font-weight: bold;
        }
        
        .stats-label {
          color: #A0522D;
        }
      `}</style>
      
      <Container className="pt-4">
        <div className="coffee-header">
          <Row className="align-items-center">
            <Col>
              <div className="d-flex align-items-center mb-3">
                <Coffee size={32} className="me-3" style={{ color: '#8B4513' }} />
                <h2 className="mb-0" style={{ color: '#8B4513' }}>Table Reservations</h2>
              </div>
              <p className="mb-0" style={{ color: '#A0522D' }}>Manage your coffee shop table bookings</p>
            </Col>
            <Col xs="auto">
              <Button className="coffee-btn-primary" onClick={() => setShowCreateModal(true)}>
                <Calendar size={18} className="me-2" />
                Make Reservation
              </Button>
            </Col>
          </Row>
        </div>

        {error && (
          <Alert className="coffee-alert">
            <strong>Oops!</strong> {error}
          </Alert>
        )}

        {/* Stats Row */}
        <Row className="mb-4">
          <Col md={3}>
            <div className="coffee-stats text-center">
              <Calendar size={24} className="stats-icon mb-2" />
              <h5 className="stats-number">{reservations.length}</h5>
              <small className="stats-label">Total Reservations</small>
            </div>
          </Col>
          <Col md={3}>
            <div className="coffee-stats text-center">
              <Check size={24} className="text-success mb-2" />
              <h5 className="stats-number">{reservations.filter(r => r.status === 'confirmed').length}</h5>
              <small className="stats-label">Confirmed</small>
            </div>
          </Col>
          <Col md={3}>
            <div className="coffee-stats text-center">
              <Clock size={24} className="text-primary mb-2" />
              <h5 className="stats-number">{reservations.filter(r => r.status === 'completed').length}</h5>
              <small className="stats-label">Completed</small>
            </div>
          </Col>
          <Col md={3}>
            <div className="coffee-stats text-center">
              <X size={24} className="text-danger mb-2" />
              <h5 className="stats-number">{reservations.filter(r => r.status === 'cancelled').length}</h5>
              <small className="stats-label">Cancelled</small>
            </div>
          </Col>
        </Row>

        <Card className="coffee-card">
          <Card.Body>
            <div className="table-responsive">
              <Table className="coffee-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Table</th>
                    <th>Guests</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Special Requests</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map(reservation => (
                    <tr key={reservation._id}>
                      <td>
                        <span className="reservation-id">
                          {reservation._id.slice(-6)}
                        </span>
                      </td>
                      <td>
                        <div className="customer-info">
                          <div>{reservation.customer?.name || 'Walk-in'}</div>
                          <div className="customer-email">
                            {reservation.customer?.email || ''}
                          </div>
                        </div>
                      </td>
                      <td>
                        <Badge bg="secondary" className="fs-6">
                          Table {reservation.tableNumber}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Users size={14} className="me-1" style={{ color: '#CD853F' }} />
                          {reservation.guests}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Calendar size={14} className="me-1" style={{ color: '#CD853F' }} />
                          {formatDate(reservation.date)}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Clock size={14} className="me-1" style={{ color: '#CD853F' }} />
                          {formatTime(reservation.time)}
                        </div>
                      </td>
                      <td>
                        <Badge bg={getStatusVariant(reservation.status)} className="text-capitalize">
                          {reservation.status}
                        </Badge>
                      </td>
                      <td>
                        <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {reservation.specialRequests || 'None'}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          {getStatusActions(reservation)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            
            {reservations.length === 0 && (
              <div className="text-center py-5">
                <Coffee size={48} className="mb-3" style={{ color: '#CD853F' }} />
                <h5 style={{ color: '#8B4513' }}>No reservations found</h5>
                <p style={{ color: '#A0522D' }}>Start by making your first reservation!</p>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>

      {/* Create Reservation Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} className="coffee-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            <Coffee size={24} className="me-2" style={{ color: '#8B4513' }} />
            Reserve Your Table
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="coffee-form-label">
                    <Edit3 size={16} className="me-2" />
                    Table Number *
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="tableNumber"
                    value={formData.tableNumber}
                    onChange={handleInputChange}
                    required
                    min="1"
                    placeholder="Enter table number"
                    className="coffee-form-control"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="coffee-form-label">
                    <Users size={16} className="me-2" />
                    Number of Guests *
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="20"
                    placeholder="Number of guests"
                    className="coffee-form-control"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="coffee-form-label">
                    <Calendar size={16} className="me-2" />
                    Date *
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="coffee-form-control"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="coffee-form-label">
                    <Clock size={16} className="me-2" />
                    Time *
                  </Form.Label>
                  <Form.Control
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="coffee-form-control"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label className="coffee-form-label">
                <Edit3 size={16} className="me-2" />
                Special Requests
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                placeholder="Any special requests, dietary requirements, or seating preferences..."
                className="coffee-form-control"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button className="coffee-btn-primary" onClick={handleSubmit}>
            <Calendar size={16} className="me-2" />
            Confirm Reservation
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Reservations;