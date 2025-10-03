import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Modal, Form, Alert } from 'react-bootstrap';
import { Receipt, Plus, DollarSign, Clock, CheckCircle, XCircle, Coffee } from 'lucide-react';

function Bills({ user, token }) {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    order: '',
    subtotal: '',
    tax: '',
    discount: '',
    total: '',
    paymentMethod: '',
    paymentStatus: 'pending'
  });

  useEffect(() => {
    fetchBills();
    fetchOrders();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/bills', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (response.ok) {
        setBills(data || []);
      } else {
        setError('Failed to fetch bills');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (response.ok) {
        setOrders((data || []).filter(order => order.status === 'ready' || order.status === 'delivered'));
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      if (name === 'subtotal' || name === 'tax' || name === 'discount') {
        const subtotal = parseFloat(newData.subtotal) || 0;
        const tax = parseFloat(newData.tax) || 0;
        const discount = parseFloat(newData.discount) || 0;
        newData.total = (subtotal + tax - discount).toFixed(2);
      }
      
      return newData;
    });
  };

  const resetForm = () => {
    setFormData({
      order: '',
      subtotal: '',
      tax: '',
      discount: '',
      total: '',
      paymentMethod: '',
      paymentStatus: 'pending'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/bills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          subtotal: parseFloat(formData.subtotal),
          tax: parseFloat(formData.tax),
          discount: parseFloat(formData.discount),
          total: parseFloat(formData.total)
        })
      });

      if (response.ok) {
        setShowCreateModal(false);
        resetForm();
        fetchBills();
        setError('');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to create bill');
      }
    } catch (err) {
      setError('Network error while creating bill');
    }
  };

  const updatePaymentStatus = async (billId, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bills/${billId}/payment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ paymentStatus: status })
      });

      if (response.ok) {
        fetchBills();
        setError('');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to update payment status');
      }
    } catch (err) {
      setError('Network error while updating payment status');
    }
  };

  const getPaymentStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return <Badge style={{ backgroundColor: '#28a745', color: '#F5DEB3' }}>✓ Paid</Badge>;
      case 'pending':
        return <Badge style={{ backgroundColor: '#CD853F', color: '#F5DEB3' }}>⏳ Pending</Badge>;
      case 'failed':
        return <Badge style={{ backgroundColor: '#dc3545', color: '#F5DEB3' }}>✗ Failed</Badge>;
      default:
        return <Badge style={{ backgroundColor: '#A0522D', color: '#F5DEB3' }}>Unknown</Badge>;
    }
  };

  const calculateTotalRevenue = () => {
    return bills
      .filter(bill => bill && bill.paymentStatus === 'paid')
      .reduce((total, bill) => total + (bill.total || 0), 0)
      .toFixed(2);
  };

  const calculatePendingAmount = () => {
    return bills
      .filter(bill => bill && bill.paymentStatus === 'pending')
      .reduce((total, bill) => total + (bill.total || 0), 0)
      .toFixed(2);
  };

  const getShortId = (id) => {
    return id && typeof id === 'string' ? id.slice(-6) : 'N/A';
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#FFF8DC', minHeight: '100vh', paddingTop: '0px' }}>
        <Container className="pt-4">
          <div className="text-center" style={{ paddingTop: '100px' }}>
            <div className="spinner-border" role="status" style={{ color: '#8B4513' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3" style={{ color: '#8B4513' }}>Loading bills...</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#FFF8DC', minHeight: '100vh', paddingTop: '0px' }}>
      <Container className="py-4">
        {/* Header Section */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <Receipt size={40} style={{ color: '#8B4513' }} className="me-3" />
                <h1 className="display-5 mb-0" style={{ color: '#8B4513' }}>Bills Management</h1>
              </div>
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="d-flex align-items-center"
                style={{ 
                  backgroundColor: '#8B4513', 
                  borderColor: '#8B4513',
                  color: '#F5DEB3',
                  fontSize: '1.1rem',
                  padding: '12px 24px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#CD853F';
                  e.target.style.borderColor = '#CD853F';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#8B4513';
                  e.target.style.borderColor = '#8B4513';
                }}
              >
                <Plus size={20} className="me-2" />
                Create New Bill
              </Button>
            </div>
          </Col>
        </Row>

        {error && (
          <Alert 
            variant="danger" 
            className="mb-4"
            style={{ 
              backgroundColor: '#f8d7da', 
              borderColor: '#f5c6cb', 
              color: '#721c24' 
            }}
          >
            {error}
          </Alert>
        )}

        {/* Revenue Summary Cards */}
        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <Card className="h-100 shadow-sm border-0" style={{ backgroundColor: '#8B4513' }}>
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <DollarSign size={48} style={{ color: '#F5DEB3' }} />
                </div>
                <h5 style={{ color: '#F5DEB3' }}>Total Revenue</h5>
                <h2 style={{ color: '#F5DEB3', fontSize: '2.5rem', fontWeight: 'bold' }}>
                  ₹{calculateTotalRevenue()}
                </h2>
                <small style={{ color: '#CD853F' }}>From paid bills</small>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="mb-3">
            <Card className="h-100 shadow-sm border-0" style={{ backgroundColor: '#CD853F' }}>
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <Clock size={48} style={{ color: '#F5DEB3' }} />
                </div>
                <h5 style={{ color: '#F5DEB3' }}>Pending Amount</h5>
                <h2 style={{ color: '#F5DEB3', fontSize: '2.5rem', fontWeight: 'bold' }}>
                  ₹{calculatePendingAmount()}
                </h2>
                <small style={{ color: '#8B4513' }}>Awaiting payment</small>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="mb-3">
            <Card className="h-100 shadow-sm border-0" style={{ backgroundColor: '#A0522D' }}>
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <Coffee size={48} style={{ color: '#F5DEB3' }} />
                </div>
                <h5 style={{ color: '#F5DEB3' }}>Total Bills</h5>
                <h2 style={{ color: '#F5DEB3', fontSize: '2.5rem', fontWeight: 'bold' }}>
                  {bills.length}
                </h2>
                <small style={{ color: '#CD853F' }}>All time</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Bills Table */}
        <Card className="shadow-sm border-0" style={{ backgroundColor: '#FFFFFF' }}>
          <Card.Header style={{ backgroundColor: '#8B4513', color: '#F5DEB3' }}>
            <h5 className="mb-0">Bills Overview</h5>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table className="mb-0" style={{ fontSize: '0.95rem' }}>
                <thead style={{ backgroundColor: '#F5DEB3' }}>
                  <tr>
                    <th style={{ color: '#8B4513', fontWeight: '600' }}>Bill ID</th>
                    <th style={{ color: '#8B4513', fontWeight: '600' }}>Order ID</th>
                    <th style={{ color: '#8B4513', fontWeight: '600' }}>Subtotal</th>
                    <th style={{ color: '#8B4513', fontWeight: '600' }}>Tax</th>
                    <th style={{ color: '#8B4513', fontWeight: '600' }}>Discount</th>
                    <th style={{ color: '#8B4513', fontWeight: '600' }}>Total</th>
                    <th style={{ color: '#8B4513', fontWeight: '600' }}>Payment Method</th>
                    <th style={{ color: '#8B4513', fontWeight: '600' }}>Status</th>
                    <th style={{ color: '#8B4513', fontWeight: '600' }}>Created</th>
                    <th style={{ color: '#8B4513', fontWeight: '600' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bills.map(bill => (
                    <tr key={bill._id || Math.random()} style={{ borderBottom: '1px solid #F5DEB3' }}>
                      <td style={{ color: '#5D4037' }}>{getShortId(bill._id)}</td>
                      <td style={{ color: '#5D4037' }}>{getShortId(bill.order?._id)}</td>
                      <td style={{ color: '#5D4037' }}>₹{bill.subtotal || 0}</td>
                      <td style={{ color: '#5D4037' }}>₹{bill.tax || 0}</td>
                      <td style={{ color: '#5D4037' }}>₹{bill.discount || 0}</td>
                      <td style={{ color: '#8B4513', fontWeight: '600' }}>₹{bill.total || 0}</td>
                      <td style={{ color: '#5D4037' }} className="text-capitalize">{bill.paymentMethod || 'N/A'}</td>
                      <td>{getPaymentStatusBadge(bill.paymentStatus)}</td>
                      <td style={{ color: '#5D4037' }}>{bill.createdAt ? new Date(bill.createdAt).toLocaleDateString() : 'N/A'}</td>
                      <td>
                        {bill.paymentStatus === 'pending' && (
                          <div className="d-flex gap-2">
                            <Button
                              size="sm"
                              className="d-flex align-items-center"
                              style={{ 
                                backgroundColor: '#28a745', 
                                borderColor: '#28a745',
                                color: '#F5DEB3',
                                fontSize: '0.8rem'
                              }}
                              onClick={() => updatePaymentStatus(bill._id, 'paid')}
                            >
                              <CheckCircle size={14} className="me-1" />
                              Paid
                            </Button>
                            <Button
                              size="sm"
                              className="d-flex align-items-center"
                              style={{ 
                                backgroundColor: '#dc3545', 
                                borderColor: '#dc3545',
                                color: '#F5DEB3',
                                fontSize: '0.8rem'
                              }}
                              onClick={() => updatePaymentStatus(bill._id, 'failed')}
                            >
                              <XCircle size={14} className="me-1" />
                              Failed
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

        {/* Create Bill Modal */}
        <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg">
          <Modal.Header closeButton style={{ backgroundColor: '#8B4513', color: '#F5DEB3' }}>
            <Modal.Title className="d-flex align-items-center">
              <Receipt size={24} className="me-2" />
              Create New Bill
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#FFF8DC' }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#8B4513', fontWeight: '600' }}>Order</Form.Label>
                <Form.Select
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  required
                  style={{ 
                    borderColor: '#CD853F',
                    color: '#5D4037'
                  }}
                >
                  <option value="">Select Order</option>
                  {orders.map(order => (
                    <option key={order._id} value={order._id}>
                      Order #{getShortId(order._id)} - ₹{order.totalAmount || 0}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#8B4513', fontWeight: '600' }}>Subtotal</Form.Label>
                    <Form.Control
                      type="number"
                      name="subtotal"
                      value={formData.subtotal}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      required
                      style={{ 
                        borderColor: '#CD853F',
                        color: '#5D4037'
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#8B4513', fontWeight: '600' }}>Tax</Form.Label>
                    <Form.Control
                      type="number"
                      name="tax"
                      value={formData.tax}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      required
                      style={{ 
                        borderColor: '#CD853F',
                        color: '#5D4037'
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#8B4513', fontWeight: '600' }}>Discount</Form.Label>
                    <Form.Control
                      type="number"
                      name="discount"
                      value={formData.discount}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      style={{ 
                        borderColor: '#CD853F',
                        color: '#5D4037'
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#8B4513', fontWeight: '600' }}>Total</Form.Label>
                    <Form.Control
                      type="number"
                      name="total"
                      value={formData.total}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      required
                      readOnly
                      style={{ 
                        borderColor: '#CD853F',
                        color: '#5D4037',
                        backgroundColor: '#F5DEB3'
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#8B4513', fontWeight: '600' }}>Payment Method</Form.Label>
                <Form.Select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  required
                  style={{ 
                    borderColor: '#CD853F',
                    color: '#5D4037'
                  }}
                >
                  <option value="">Select Payment Method</option>
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="upi">UPI</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#8B4513', fontWeight: '600' }}>Payment Status</Form.Label>
                <Form.Select
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleInputChange}
                  required
                  style={{ 
                    borderColor: '#CD853F',
                    color: '#5D4037'
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                </Form.Select>
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setShowCreateModal(false)}
                  style={{ 
                    backgroundColor: '#A0522D',
                    borderColor: '#A0522D',
                    color: '#F5DEB3'
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  style={{ 
                    backgroundColor: '#8B4513',
                    borderColor: '#8B4513',
                    color: '#F5DEB3'
                  }}
                >
                  Create Bill
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default Bills;