import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Table, Modal, Form, Alert } from 'react-bootstrap';

function Inventory({ user, token }) {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    quantity: '',
    unit: '',
    minThreshold: '',
    supplier: ''
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/inventory', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (response.ok) {
        setInventory(data);
      } else {
        setError('Failed to fetch inventory');
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

  const resetForm = () => {
    setFormData({
      itemName: '',
      category: '',
      quantity: '',
      unit: '',
      minThreshold: '',
      supplier: ''
    });
    setEditingItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingItem ? `http://localhost:5000/api/inventory/${editingItem._id}` : 'http://localhost:5000/api/inventory';
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          quantity: parseInt(formData.quantity),
          minThreshold: parseInt(formData.minThreshold)
        })
      });

      if (response.ok) {
        setShowCreateModal(false);
        resetForm();
        fetchInventory();
        setError('');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to save inventory item');
      }
    } catch (err) {
      setError('Network error while saving inventory item');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      itemName: item.itemName,
      category: item.category,
      quantity: item.quantity.toString(),
      unit: item.unit,
      minThreshold: item.minThreshold.toString(),
      supplier: item.supplier || ''
    });
    setShowCreateModal(true);
  };

  const handleCreateNew = () => {
    resetForm();
    setShowCreateModal(true);
  };

  const getStockStatus = (item) => {
    if (item.quantity <= item.minThreshold) {
      return { text: 'Low Stock', variant: 'danger' };
    } else if (item.quantity <= item.minThreshold * 2) {
      return { text: 'Medium Stock', variant: 'warning' };
    } else {
      return { text: 'Good Stock', variant: 'success' };
    }
  };

  const categories = [
    'Beverages',
    'Food Items',
    'Dairy',
    'Vegetables',
    'Fruits',
    'Meat',
    'Spices',
    'Bakery',
    'Cleaning Supplies',
    'Other'
  ];

  const units = [
    'kg', 'g', 'L', 'ml', 'pieces', 'packets', 'bottles', 'cans', 'boxes'
  ];

  if (loading) {
    return (
      <div style={{ backgroundColor: '#FFF8DC', minHeight: '100vh', paddingTop: '20px' }}>
        <Container className="mt-4">
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
      <Container className="mt-4">
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 style={{ color: '#8B4513' }}>Inventory Management</h2>
              <Button 
                onClick={handleCreateNew}
                style={{ 
                  backgroundColor: '#8B4513', 
                  borderColor: '#8B4513',
                  color: '#F5DEB3'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#A0522D';
                  e.target.style.borderColor = '#A0522D';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#8B4513';
                  e.target.style.borderColor = '#8B4513';
                }}
              >
                Add New Item
              </Button>
            </div>

            {error && (
              <Alert 
                variant="danger" 
                style={{ 
                  backgroundColor: '#f8d7da',
                  borderColor: '#f5c6cb',
                  color: '#721c24'
                }}
              >
                {error}
              </Alert>
            )}

            {/* Stock Alerts */}
            <Row className="mb-4">
              <Col>
                <Card className="shadow-sm border-0" style={{ backgroundColor: '#FFFFFF' }}>
                  <Card.Header style={{ backgroundColor: '#CD853F', color: '#F5DEB3' }}>
                    <h5 className="mb-0">Stock Alerts</h5>
                  </Card.Header>
                  <Card.Body style={{ backgroundColor: '#FFFFFF' }}>
                    {inventory.filter(item => item.quantity <= item.minThreshold).length > 0 ? (
                      <div>
                        <p className="mb-2" style={{ color: '#5D4037' }}>Items running low:</p>
                        {inventory
                          .filter(item => item.quantity <= item.minThreshold)
                          .map(item => (
                            <Badge 
                              key={item._id} 
                              className="me-2 mb-1"
                              style={{ 
                                backgroundColor: '#dc3545',
                                color: '#F5DEB3'
                              }}
                            >
                              {item.itemName}: {item.quantity} {item.unit}
                            </Badge>
                          ))}
                      </div>
                    ) : (
                      <p className="mb-0" style={{ color: '#28a745' }}>All items are well stocked!</p>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Card className="shadow-sm border-0" style={{ backgroundColor: '#FFFFFF' }}>
              <Card.Body>
                <Table responsive striped>
                  <thead>
                    <tr style={{ backgroundColor: '#8B4513', color: '#F5DEB3' }}>
                      <th style={{ color: '#F5DEB3' }}>Item Name</th>
                      <th style={{ color: '#F5DEB3' }}>Category</th>
                      <th style={{ color: '#F5DEB3' }}>Quantity</th>
                      <th style={{ color: '#F5DEB3' }}>Unit</th>
                      <th style={{ color: '#F5DEB3' }}>Min Threshold</th>
                      <th style={{ color: '#F5DEB3' }}>Status</th>
                      <th style={{ color: '#F5DEB3' }}>Supplier</th>
                      <th style={{ color: '#F5DEB3' }}>Last Updated</th>
                      <th style={{ color: '#F5DEB3' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map(item => {
                      const stockStatus = getStockStatus(item);
                      return (
                        <tr key={item._id}>
                          <td style={{ color: '#5D4037' }}>{item.itemName}</td>
                          <td style={{ color: '#5D4037' }}>{item.category}</td>
                          <td style={{ color: '#5D4037' }}>{item.quantity}</td>
                          <td style={{ color: '#5D4037' }}>{item.unit}</td>
                          <td style={{ color: '#5D4037' }}>{item.minThreshold}</td>
                          <td>
                            <Badge 
                              style={{ 
                                backgroundColor: stockStatus.variant === 'danger' ? '#dc3545' : 
                                                stockStatus.variant === 'warning' ? '#ffc107' : '#28a745',
                                color: stockStatus.variant === 'warning' ? '#5D4037' : '#F5DEB3'
                              }}
                            >
                              {stockStatus.text}
                            </Badge>
                          </td>
                          <td style={{ color: '#5D4037' }}>{item.supplier || 'N/A'}</td>
                          <td style={{ color: '#5D4037' }}>{new Date(item.lastUpdated).toLocaleDateString()}</td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handleEdit(item)}
                              style={{ 
                                borderColor: '#8B4513',
                                color: '#8B4513'
                              }}
                              onMouseOver={(e) => {
                                e.target.style.backgroundColor = '#8B4513';
                                e.target.style.color = '#F5DEB3';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '#8B4513';
                              }}
                            >
                              Edit
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* Create/Edit Modal */}
            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
              <Modal.Header closeButton style={{ backgroundColor: '#8B4513', color: '#F5DEB3' }}>
                <Modal.Title style={{ color: '#F5DEB3' }}>
                  {editingItem ? 'Edit Inventory Item' : 'Add New Inventory Item'}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ backgroundColor: '#FFF8DC' }}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#8B4513' }}>Item Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="itemName"
                      value={formData.itemName}
                      onChange={handleInputChange}
                      required
                      style={{ 
                        borderColor: '#CD853F',
                        color: '#5D4037'
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#8B4513' }}>Category</Form.Label>
                    <Form.Select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      style={{ 
                        borderColor: '#CD853F',
                        color: '#5D4037'
                      }}
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ color: '#8B4513' }}>Quantity</Form.Label>
                        <Form.Control
                          type="number"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleInputChange}
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
                        <Form.Label style={{ color: '#8B4513' }}>Unit</Form.Label>
                        <Form.Select
                          name="unit"
                          value={formData.unit}
                          onChange={handleInputChange}
                          required
                          style={{ 
                            borderColor: '#CD853F',
                            color: '#5D4037'
                          }}
                        >
                          <option value="">Select Unit</option>
                          {units.map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#8B4513' }}>Minimum Threshold</Form.Label>
                    <Form.Control
                      type="number"
                      name="minThreshold"
                      value={formData.minThreshold}
                      onChange={handleInputChange}
                      min="0"
                      required
                      style={{ 
                        borderColor: '#CD853F',
                        color: '#5D4037'
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#8B4513' }}>Supplier</Form.Label>
                    <Form.Control
                      type="text"
                      name="supplier"
                      value={formData.supplier}
                      onChange={handleInputChange}
                      style={{ 
                        borderColor: '#CD853F',
                        color: '#5D4037'
                      }}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-end">
                    <Button
                      variant="secondary"
                      onClick={() => setShowCreateModal(false)}
                      className="me-2"
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
                      {editingItem ? 'Update' : 'Add'} Item
                    </Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Inventory;