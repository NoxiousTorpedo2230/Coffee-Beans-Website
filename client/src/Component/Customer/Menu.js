import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, Modal, Alert } from 'react-bootstrap';
import { Coffee, Plus, Edit3, Eye, EyeOff } from 'lucide-react';

function Menu({ user, token }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    isAvailable: true
  });

  const categories = ['all', 'beverages', 'food', 'desserts', 'snacks'];

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/menu');
      const data = await response.json();
      
      if (response.ok) {
        setMenuItems(data);
      } else {
        setError('Failed to fetch menu items');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newItem,
          price: parseFloat(newItem.price)
        })
      });

      if (response.ok) {
        setShowAddModal(false);
        setNewItem({ name: '', description: '', price: '', category: '', image: '', isAvailable: true });
        fetchMenuItems();
      } else {
        setError('Failed to add menu item');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const toggleAvailability = async (itemId, currentStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/menu/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isAvailable: !currentStatus })
      });

      if (response.ok) {
        fetchMenuItems();
      }
    } catch (err) {
      setError('Failed to update item');
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <div style={{ backgroundColor: '#FFF8DC', minHeight: '100vh', paddingTop: '0px' }}>
        <div className="text-center py-5" style={{ color: '#8B4513' }}>
          <Coffee size={48} style={{ color: '#8B4513' }} className="mb-3" />
          <div>Loading menu...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#FFF8DC', minHeight: '100vh', paddingTop: '0px' }}>
      <Container className="py-5">
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center">
                <Coffee size={40} style={{ color: '#8B4513' }} className="me-3" />
                <h1 className="display-5 mb-0" style={{ color: '#8B4513' }}>Our Menu</h1>
              </div>
              {user?.role === 'admin' && (
                <Button 
                  onClick={() => setShowAddModal(true)}
                  style={{ 
                    backgroundColor: '#8B4513', 
                    borderColor: '#8B4513',
                    color: '#F5DEB3'
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
                  <Plus size={16} className="me-2" />
                  Add New Item
                </Button>
              )}
            </div>

            <p className="lead mb-4" style={{ color: '#A0522D' }}>
              Discover our carefully crafted selection of beverages, food, and treats
            </p>

            {error && (
              <Alert 
                variant="danger" 
                dismissible 
                onClose={() => setError('')}
                style={{ 
                  backgroundColor: '#f8d7da',
                  borderColor: '#f5c6cb',
                  color: '#721c24'
                }}
              >
                {error}
              </Alert>
            )}

            {/* Category Filter */}
            <div className="mb-4">
              <Form.Select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ 
                  width: '250px',
                  backgroundColor: '#FFFFFF',
                  borderColor: '#CD853F',
                  color: '#8B4513'
                }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </Form.Select>
            </div>
          </Col>
        </Row>

        <Row>
          {filteredItems.length === 0 ? (
            <Col className="text-center py-5">
              <Coffee size={64} style={{ color: '#CD853F' }} className="mb-3" />
              <h4 style={{ color: '#8B4513' }}>No items found</h4>
              <p style={{ color: '#A0522D' }}>Try selecting a different category</p>
            </Col>
          ) : (
            filteredItems.map(item => (
              <Col md={6} lg={4} key={item._id} className="mb-4">
                <Card 
                  className="h-100 shadow-sm border-0"
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    transition: 'transform 0.2s ease-in-out'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {item.image && (
                    <Card.Img 
                      variant="top" 
                      src={item.image} 
                      style={{ 
                        height: '200px', 
                        objectFit: 'cover',
                        filter: item.isAvailable ? 'none' : 'grayscale(100%)'
                      }}
                    />
                  )}
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <Card.Title style={{ color: '#8B4513', fontSize: '1.25rem' }}>
                        {item.name}
                      </Card.Title>
                      <Badge 
                        style={{ 
                          backgroundColor: item.isAvailable ? '#28a745' : '#dc3545',
                          color: '#FFFFFF'
                        }}
                      >
                        {item.isAvailable ? 'Available' : 'Out of Stock'}
                      </Badge>
                    </div>
                    
                    <Card.Text style={{ color: '#5D4037', lineHeight: '1.6' }}>
                      {item.description}
                    </Card.Text>
                    
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 style={{ color: '#8B4513', fontWeight: 'bold' }}>
                        ₹{item.price}
                      </h5>
                      <Badge 
                        style={{ 
                          backgroundColor: '#CD853F',
                          color: '#F5DEB3'
                        }}
                      >
                        {item.category}
                      </Badge>
                    </div>
                    
                    {user?.role === 'admin' && (
                      <div className="d-flex gap-2">
                        <Button 
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => toggleAvailability(item._id, item.isAvailable)}
                          style={{ 
                            borderColor: item.isAvailable ? '#CD853F' : '#28a745',
                            color: item.isAvailable ? '#CD853F' : '#28a745'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = item.isAvailable ? '#CD853F' : '#28a745';
                            e.target.style.color = '#FFFFFF';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = item.isAvailable ? '#CD853F' : '#28a745';
                          }}
                        >
                          {item.isAvailable ? <EyeOff size={16} /> : <Eye size={16} />}
                          <span className="ms-2">
                            {item.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                          </span>
                        </Button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>

        {/* Add Item Modal */}
        <Modal 
          show={showAddModal} 
          onHide={() => setShowAddModal(false)}
          centered
        >
          <Modal.Header 
            closeButton
            style={{ 
              backgroundColor: '#8B4513',
              borderBottom: '1px solid #CD853F'
            }}
          >
            <Modal.Title style={{ color: '#F5DEB3' }}>
              <Plus size={24} className="me-2" />
              Add New Menu Item
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#FFFFFF' }}>
            <Form onSubmit={handleAddItem}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#8B4513', fontWeight: '600' }}>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  required
                  style={{ 
                    borderColor: '#CD853F',
                    color: '#5D4037'
                  }}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#8B4513', fontWeight: '600' }}>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  style={{ 
                    borderColor: '#CD853F',
                    color: '#5D4037'
                  }}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#8B4513', fontWeight: '600' }}>Price</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  value={newItem.price}
                  onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  required
                  style={{ 
                    borderColor: '#CD853F',
                    color: '#5D4037'
                  }}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#8B4513', fontWeight: '600' }}>Category</Form.Label>
                <Form.Select
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  required
                  style={{ 
                    borderColor: '#CD853F',
                    color: '#5D4037'
                  }}
                >
                  <option value="">Select Category</option>
                  <option value="beverages">Beverages</option>
                  <option value="food">Food</option>
                  <option value="desserts">Desserts</option>
                  <option value="snacks">Snacks</option>
                </Form.Select>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#8B4513', fontWeight: '600' }}>Image URL</Form.Label>
                <Form.Control
                  type="url"
                  value={newItem.image}
                  onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                  style={{ 
                    borderColor: '#CD853F',
                    color: '#5D4037'
                  }}
                />
              </Form.Group>
              
              <div className="d-flex justify-content-end gap-2">
                <Button 
                  variant="outline-secondary" 
                  onClick={() => setShowAddModal(false)}
                  style={{ 
                    borderColor: '#A0522D',
                    color: '#A0522D'
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
                  Add Item
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default Menu;