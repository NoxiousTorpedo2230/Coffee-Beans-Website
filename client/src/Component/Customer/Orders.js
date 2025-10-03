import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Table, Modal, Form, Alert } from 'react-bootstrap';
import { Coffee, ShoppingCart, Plus, Minus, X } from 'lucide-react';

function Orders({ user, token }) {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [orderForm, setOrderForm] = useState({
    tableNumber: '',
    orderType: 'dine-in'
  });

  useEffect(() => {
    fetchOrders();
    fetchMenuItems();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (response.ok) {
        setOrders(data);
      } else {
        setError('Failed to fetch orders');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/menu');
      const data = await response.json();
      
      if (response.ok) {
        setMenuItems(data);
      }
    } catch (err) {
      console.error('Failed to fetch menu items');
    }
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.menuItem === item._id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.menuItem === item._id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { menuItem: item._id, name: item.name, quantity: 1, price: item.price }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.menuItem !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item.menuItem === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCreateOrder = async () => {
    if (cart.length === 0) {
      setError('Please add items to cart');
      return;
    }

    try {
      const orderData = {
        items: cart.map(item => ({
          menuItem: item.menuItem,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: calculateTotal(),
        tableNumber: orderForm.tableNumber ? parseInt(orderForm.tableNumber) : undefined,
        orderType: orderForm.orderType
      };

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        setShowCreateModal(false);
        setCart([]);
        setOrderForm({ tableNumber: '', orderType: 'dine-in' });
        fetchOrders();
        setError('');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to create order');
      }
    } catch (err) {
      setError('Network error while creating order');
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchOrders();
      } else {
        setError('Failed to update order status');
      }
    } catch (err) {
      setError('Network error while updating order');
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'preparing': return 'info';
      case 'ready': return 'success';
      case 'delivered': return 'primary';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  const getStatusActions = (order) => {
    const { status, _id } = order;
    const buttons = [];

    if (user.role === 'admin' || user.role === 'staff') {
      if (status === 'pending') {
        buttons.push(
          <Button
            key="preparing"
            size="sm"
            style={{ backgroundColor: '#CD853F', borderColor: '#CD853F', color: '#F5DEB3' }}
            onClick={() => updateOrderStatus(_id, 'preparing')}
            className="me-1"
          >
            Start Preparing
          </Button>
        );
      }
      if (status === 'preparing') {
        buttons.push(
          <Button
            key="ready"
            size="sm"
            style={{ backgroundColor: '#8B4513', borderColor: '#8B4513', color: '#F5DEB3' }}
            onClick={() => updateOrderStatus(_id, 'ready')}
            className="me-1"
          >
            Mark Ready
          </Button>
        );
      }
      if (status === 'ready') {
        buttons.push(
          <Button
            key="delivered"
            size="sm"
            style={{ backgroundColor: '#A0522D', borderColor: '#A0522D', color: '#F5DEB3' }}
            onClick={() => updateOrderStatus(_id, 'delivered')}
            className="me-1"
          >
            Mark Delivered
          </Button>
        );
      }
      if (status !== 'delivered' && status !== 'cancelled') {
        buttons.push(
          <Button
            key="cancelled"
            size="sm"
            variant="danger"
            onClick={() => updateOrderStatus(_id, 'cancelled')}
          >
            Cancel
          </Button>
        );
      }
    }

    return buttons;
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#FFF8DC', minHeight: '100vh', paddingTop: '20px' }}>
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
    <div style={{ backgroundColor: '#FFF8DC', minHeight: '100vh', paddingTop: '20px' }}>
      <Container className="py-4">
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center">
                <Coffee size={32} style={{ color: '#8B4513' }} className="me-3" />
                <h2 style={{ color: '#8B4513', marginBottom: 0 }}>Orders Management</h2>
              </div>
              <Button 
                style={{ backgroundColor: '#8B4513', borderColor: '#8B4513', color: '#F5DEB3' }}
                onClick={() => setShowCreateModal(true)}
                className="d-flex align-items-center"
              >
                <Plus size={16} className="me-2" />
                Create New Order
              </Button>
            </div>

            {error && (
              <Alert variant="danger" style={{ backgroundColor: '#f8d7da', borderColor: '#f5c6cb', color: '#721c24' }}>
                {error}
              </Alert>
            )}

            <Card className="shadow-sm border-0" style={{ backgroundColor: '#FFFFFF' }}>
              <Card.Body>
                <Table responsive className="mb-0">
                  <thead style={{ backgroundColor: '#8B4513' }}>
                    <tr>
                      <th style={{ color: '#F5DEB3', borderColor: '#8B4513' }}>Order ID</th>
                      <th style={{ color: '#F5DEB3', borderColor: '#8B4513' }}>Customer</th>
                      <th style={{ color: '#F5DEB3', borderColor: '#8B4513' }}>Items</th>
                      <th style={{ color: '#F5DEB3', borderColor: '#8B4513' }}>Total</th>
                      <th style={{ color: '#F5DEB3', borderColor: '#8B4513' }}>Type</th>
                      <th style={{ color: '#F5DEB3', borderColor: '#8B4513' }}>Table</th>
                      <th style={{ color: '#F5DEB3', borderColor: '#8B4513' }}>Status</th>
                      <th style={{ color: '#F5DEB3', borderColor: '#8B4513' }}>Date</th>
                      <th style={{ color: '#F5DEB3', borderColor: '#8B4513' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id} style={{ borderColor: '#CD853F' }}>
                        <td style={{ color: '#5D4037' }}>{order._id.slice(-6)}</td>
                        <td style={{ color: '#5D4037' }}>{order.customer?.name || 'N/A'}</td>
                        <td style={{ color: '#5D4037' }}>
                          {order.items.map(item => (
                            <div key={item._id} className="mb-1">
                              <span style={{ color: '#8B4513', fontWeight: '500' }}>
                                {item.menuItem?.name || 'Unknown Item'}
                              </span>
                              <span style={{ color: '#A0522D' }}> x{item.quantity}</span>
                            </div>
                          ))}
                        </td>
                        <td style={{ color: '#8B4513', fontWeight: '600' }}>₹{order.totalAmount}</td>
                        <td style={{ color: '#5D4037' }}>{order.orderType}</td>
                        <td style={{ color: '#5D4037' }}>{order.tableNumber || 'N/A'}</td>
                        <td>
                          <Badge bg={getStatusVariant(order.status)}>
                            {order.status}
                          </Badge>
                        </td>
                        <td style={{ color: '#5D4037' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>
                          {getStatusActions(order)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                
                {orders.length === 0 && (
                  <div className="text-center py-5">
                    <Coffee size={48} style={{ color: '#CD853F' }} className="mb-3" />
                    <p style={{ color: '#A0522D', fontSize: '1.1rem' }}>No orders found.</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Create Order Modal */}
        <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg">
          <Modal.Header closeButton style={{ backgroundColor: '#8B4513', color: '#F5DEB3' }}>
            <Modal.Title className="d-flex align-items-center">
              <ShoppingCart size={24} className="me-2" />
              Create New Order
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#FFF8DC' }}>
            <Row>
              <Col md={8}>
                <h5 style={{ color: '#8B4513', marginBottom: '1rem' }}>Menu Items</h5>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <Row>
                    {menuItems.map(item => (
                      <Col md={6} key={item._id} className="mb-3">
                        <Card className="h-100 shadow-sm border-0" style={{ backgroundColor: '#FFFFFF' }}>
                          <Card.Body>
                            <Card.Title className="h6" style={{ color: '#8B4513' }}>
                              {item.name}
                            </Card.Title>
                            <Card.Text className="small" style={{ color: '#5D4037' }}>
                              {item.description}
                            </Card.Text>
                            <div className="d-flex justify-content-between align-items-center">
                              <strong style={{ color: '#8B4513' }}>₹{item.price}</strong>
                              <Button 
                                size="sm" 
                                style={{ backgroundColor: '#CD853F', borderColor: '#CD853F', color: '#F5DEB3' }}
                                onClick={() => addToCart(item)}
                              >
                                <Plus size={14} className="me-1" />
                                Add
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Col>
              <Col md={4}>
                <Card className="shadow-sm border-0" style={{ backgroundColor: '#8B4513' }}>
                  <Card.Body>
                    <h5 style={{ color: '#F5DEB3', marginBottom: '1rem' }}>
                      <ShoppingCart size={20} className="me-2" />
                      Cart
                    </h5>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {cart.map(item => (
                        <div key={item.menuItem} className="d-flex justify-content-between align-items-center mb-2 p-2" 
                             style={{ backgroundColor: '#CD853F', borderRadius: '8px' }}>
                          <div>
                            <strong style={{ color: '#F5DEB3' }}>{item.name}</strong><br />
                            <small style={{ color: '#F5DEB3' }}>₹{item.price} each</small>
                          </div>
                          <div className="d-flex align-items-center">
                            <Button 
                              size="sm" 
                              style={{ backgroundColor: '#A0522D', borderColor: '#A0522D', color: '#F5DEB3' }}
                              onClick={() => updateQuantity(item.menuItem, item.quantity - 1)}
                            >
                              <Minus size={12} />
                            </Button>
                            <span className="mx-2" style={{ color: '#F5DEB3', fontWeight: '600' }}>
                              {item.quantity}
                            </span>
                            <Button 
                              size="sm" 
                              style={{ backgroundColor: '#A0522D', borderColor: '#A0522D', color: '#F5DEB3' }}
                              onClick={() => updateQuantity(item.menuItem, item.quantity + 1)}
                            >
                              <Plus size={12} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline-light"
                              className="ms-2"
                              onClick={() => removeFromCart(item.menuItem)}
                            >
                              <X size={12} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <hr style={{ borderColor: '#CD853F' }} />
                    <div className="mb-3 text-center">
                      <strong style={{ color: '#F5DEB3', fontSize: '1.2rem' }}>
                        Total: ₹{calculateTotal()}
                      </strong>
                    </div>
                  </Card.Body>
                </Card>
                
                <Card className="mt-3 shadow-sm border-0" style={{ backgroundColor: '#FFFFFF' }}>
                  <Card.Body>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ color: '#8B4513' }}>Order Type</Form.Label>
                        <Form.Select 
                          value={orderForm.orderType}
                          onChange={(e) => setOrderForm({...orderForm, orderType: e.target.value})}
                          style={{ borderColor: '#CD853F' }}
                        >
                          <option value="dine-in">Dine In</option>
                          <option value="takeaway">Takeaway</option>
                          <option value="delivery">Delivery</option>
                        </Form.Select>
                      </Form.Group>
                      
                      {orderForm.orderType === 'dine-in' && (
                        <Form.Group className="mb-3">
                          <Form.Label style={{ color: '#8B4513' }}>Table Number</Form.Label>
                          <Form.Control 
                            type="number"
                            value={orderForm.tableNumber}
                            onChange={(e) => setOrderForm({...orderForm, tableNumber: e.target.value})}
                            placeholder="Enter table number"
                            style={{ borderColor: '#CD853F' }}
                          />
                        </Form.Group>
                      )}
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: '#FFF8DC' }}>
            <Button 
              variant="outline-secondary" 
              onClick={() => setShowCreateModal(false)}
              style={{ borderColor: '#A0522D', color: '#A0522D' }}
            >
              Cancel
            </Button>
            <Button 
              style={{ backgroundColor: '#8B4513', borderColor: '#8B4513', color: '#F5DEB3' }}
              onClick={handleCreateOrder}
            >
              Create Order
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Orders;