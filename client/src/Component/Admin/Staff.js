import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Alert, Badge } from 'react-bootstrap';

function Staff({ user, token }) {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    salary: '',
    shift: 'morning'
  });

  // Fetch staff data
  const fetchStaff = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/staff', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch staff');
      }
      
      const data = await response.json();
      setStaff(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [token]);

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
      name: '',
      email: '',
      phone: '',
      position: '',
      salary: '',
      shift: 'morning'
    });
    setEditingStaff(null);
  };

  // Handle add staff
  const handleAddStaff = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // First create user account
      const userResponse = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: 'staff123', // Default password
          role: 'staff'
        })
      });

      if (!userResponse.ok) {
        throw new Error('Failed to create user account');
      }

      const userData = await userResponse.json();

      // Then create staff record
      const staffResponse = await fetch('http://localhost:5000/api/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user: userData.user.id,
          position: formData.position,
          salary: parseFloat(formData.salary),
          shift: formData.shift
        })
      });

      if (!staffResponse.ok) {
        throw new Error('Failed to add staff');
      }

      setSuccess('Staff member added successfully!');
      setShowAddModal(false);
      resetForm();
      fetchStaff();
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle edit staff
  const handleEditStaff = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`http://localhost:5000/api/staff/${editingStaff._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          position: formData.position,
          salary: parseFloat(formData.salary),
          shift: formData.shift
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update staff');
      }

      setSuccess('Staff member updated successfully!');
      setShowEditModal(false);
      resetForm();
      fetchStaff();
    } catch (err) {
      setError(err.message);
    }
  };

  // Open edit modal
  const openEditModal = (staffMember) => {
    setEditingStaff(staffMember);
    setFormData({
      name: staffMember.user?.name || '',
      email: staffMember.user?.email || '',
      phone: staffMember.user?.phone || '',
      position: staffMember.position,
      salary: staffMember.salary.toString(),
      shift: staffMember.shift
    });
    setShowEditModal(true);
  };

  // Toggle staff status
  const toggleStaffStatus = async (staffId, currentStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/staff/${staffId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          isActive: !currentStatus
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update staff status');
      }

      setSuccess('Staff status updated successfully!');
      fetchStaff();
    } catch (err) {
      setError(err.message);
    }
  };

  // Get shift badge variant
  const getShiftBadgeVariant = (shift) => {
    switch (shift) {
      case 'morning': return 'success';
      case 'afternoon': return 'warning';
      case 'evening': return 'info';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#FFF8DC', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
        <Container>
          <div className="text-center">
            <div className="spinner-border" role="status" style={{ color: '#8B4513' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#FFF8DC', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
      <Container fluid className="px-4">
        <Row>
          <Col>
            <Card className="shadow-sm border-0" style={{ backgroundColor: '#FFFFFF' }}>
              <Card.Header 
                className="d-flex justify-content-between align-items-center"
                style={{ backgroundColor: '#8B4513', color: '#F5DEB3' }}
              >
                <h3 className="mb-0">Staff Management</h3>
                <Button 
                  variant="light"
                  onClick={() => setShowAddModal(true)}
                  style={{ 
                    backgroundColor: '#CD853F',
                    borderColor: '#CD853F',
                    color: '#F5DEB3'
                  }}
                >
                  Add New Staff
                </Button>
              </Card.Header>
              <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                
                {staff.length === 0 ? (
                  <div className="text-center py-4">
                    <p style={{ color: '#5D4037' }}>No staff members found.</p>
                  </div>
                ) : (
                  <Table responsive hover>
                    <thead>
                      <tr style={{ backgroundColor: '#CD853F' }}>
                        <th style={{ color: '#F5DEB3' }}>Name</th>
                        <th style={{ color: '#F5DEB3' }}>Email</th>
                        <th style={{ color: '#F5DEB3' }}>Position</th>
                        <th style={{ color: '#F5DEB3' }}>Salary</th>
                        <th style={{ color: '#F5DEB3' }}>Shift</th>
                        <th style={{ color: '#F5DEB3' }}>Join Date</th>
                        <th style={{ color: '#F5DEB3' }}>Status</th>
                        <th style={{ color: '#F5DEB3' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staff.map((member) => (
                        <tr key={member._id}>
                          <td style={{ color: '#5D4037' }}>{member.user?.name || 'N/A'}</td>
                          <td style={{ color: '#5D4037' }}>{member.user?.email || 'N/A'}</td>
                          <td style={{ color: '#5D4037' }}>{member.position}</td>
                          <td style={{ color: '#5D4037' }}>₹{member.salary.toLocaleString()}</td>
                          <td>
                            <Badge 
                              bg={getShiftBadgeVariant(member.shift)}
                              style={{ backgroundColor: '#A0522D', color: '#F5DEB3' }}
                            >
                              {member.shift}
                            </Badge>
                          </td>
                          <td style={{ color: '#5D4037' }}>
                            {new Date(member.joinDate).toLocaleDateString()}
                          </td>
                          <td>
                            <Badge 
                              bg={member.isActive ? 'success' : 'danger'}
                              style={{ 
                                backgroundColor: member.isActive ? '#8B4513' : '#CD853F',
                                color: '#F5DEB3'
                              }}
                            >
                              {member.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-2"
                              onClick={() => openEditModal(member)}
                              style={{ 
                                borderColor: '#8B4513',
                                color: '#8B4513'
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant={member.isActive ? 'outline-danger' : 'outline-success'}
                              size="sm"
                              onClick={() => toggleStaffStatus(member._id, member.isActive)}
                              style={{ 
                                borderColor: member.isActive ? '#CD853F' : '#8B4513',
                                color: member.isActive ? '#CD853F' : '#8B4513'
                              }}
                            >
                              {member.isActive ? 'Deactivate' : 'Activate'}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Add Staff Modal */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
          <Modal.Header 
            closeButton 
            style={{ backgroundColor: '#8B4513', color: '#F5DEB3' }}
          >
            <Modal.Title>Add New Staff Member</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#FFFFFF' }}>
            <Form onSubmit={handleAddStaff}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#5D4037' }}>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      style={{ borderColor: '#CD853F' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#5D4037' }}>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={{ borderColor: '#CD853F' }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#5D4037' }}>Position</Form.Label>
                    <Form.Control
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      placeholder="e.g., Chef, Waiter, Cashier"
                      required
                      style={{ borderColor: '#CD853F' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#5D4037' }}>Salary (₹)</Form.Label>
                    <Form.Control
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      required
                      style={{ borderColor: '#CD853F' }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#5D4037' }}>Shift</Form.Label>
                    <Form.Select
                      name="shift"
                      value={formData.shift}
                      onChange={handleInputChange}
                      required
                      style={{ borderColor: '#CD853F' }}
                    >
                      <option value="morning">Morning</option>
                      <option value="afternoon">Afternoon</option>
                      <option value="evening">Evening</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() => setShowAddModal(false)}
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
                  variant="primary"
                  style={{ 
                    backgroundColor: '#8B4513',
                    borderColor: '#8B4513',
                    color: '#F5DEB3'
                  }}
                >
                  Add Staff
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Edit Staff Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
          <Modal.Header 
            closeButton
            style={{ backgroundColor: '#8B4513', color: '#F5DEB3' }}
          >
            <Modal.Title>Edit Staff Member</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#FFFFFF' }}>
            <Form onSubmit={handleEditStaff}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#5D4037' }}>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.name}
                      disabled
                      style={{ borderColor: '#CD853F' }}
                    />
                    <Form.Text className="text-muted">
                      Name cannot be changed from here
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#5D4037' }}>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={formData.email}
                      disabled
                      style={{ borderColor: '#CD853F' }}
                    />
                    <Form.Text className="text-muted">
                      Email cannot be changed from here
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#5D4037' }}>Position</Form.Label>
                    <Form.Control
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      style={{ borderColor: '#CD853F' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#5D4037' }}>Salary (₹)</Form.Label>
                    <Form.Control
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      required
                      style={{ borderColor: '#CD853F' }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#5D4037' }}>Shift</Form.Label>
                    <Form.Select
                      name="shift"
                      value={formData.shift}
                      onChange={handleInputChange}
                      required
                      style={{ borderColor: '#CD853F' }}
                    >
                      <option value="morning">Morning</option>
                      <option value="afternoon">Afternoon</option>
                      <option value="evening">Evening</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() => setShowEditModal(false)}
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
                  variant="primary"
                  style={{ 
                    backgroundColor: '#8B4513',
                    borderColor: '#8B4513',
                    color: '#F5DEB3'
                  }}
                >
                  Update Staff
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default Staff;