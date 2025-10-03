import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Table, Badge, ProgressBar } from 'react-bootstrap';
import { TrendingUp, DollarSign, Package, AlertTriangle, Star, Users, BarChart3, Coffee, Target, Award } from 'lucide-react';

function Analytics({ user, token }) {
  const [analytics, setAnalytics] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    topMenuItems: [],
    lowStockItems: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch analytics data
  const fetchAnalytics = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/analytics', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      
      const data = await response.json();
      setAnalytics(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [token]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  // Get stock level color
  const getStockLevelColor = (current, min) => {
    const percentage = (current / min) * 100;
    if (percentage <= 50) return 'danger';
    if (percentage <= 100) return 'warning';
    return 'success';
  };

  // Get stock level percentage
  const getStockPercentage = (current, min) => {
    return Math.min((current / min) * 100, 100);
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#FFF8DC', minHeight: '100vh', paddingTop: '2rem' }}>
        <Container>
          <div className="text-center">
            <div className="spinner-border" role="status" style={{ color: '#8B4513' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3" style={{ color: '#8B4513' }}>Loading analytics data...</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#FFF8DC', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
      <Container>
        <Row>
          <Col>
            <div className="text-center mb-5">
              <div className="d-flex align-items-center justify-content-center mb-3">
                <BarChart3 size={40} style={{ color: '#8B4513' }} className="me-3" />
                <h1 className="display-4 mb-0" style={{ color: '#8B4513' }}>Analytics Dashboard</h1>
              </div>
              <p className="lead" style={{ color: '#A0522D' }}>
                Comprehensive insights into your cafe's performance
              </p>
            </div>
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
          </Col>
        </Row>

        {/* Key Metrics Cards */}
        <Row className="mb-5">
          <Col md={6} lg={3} className="mb-4">
            <Card 
              className="h-100 shadow-lg border-0 position-relative overflow-hidden"
              style={{ 
                background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                borderRadius: '15px'
              }}
            >
              <div 
                className="position-absolute"
                style={{
                  top: '-20px',
                  right: '-20px',
                  width: '80px',
                  height: '80px',
                  background: 'rgba(245, 222, 179, 0.1)',
                  borderRadius: '50%'
                }}
              ></div>
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <TrendingUp size={48} style={{ color: '#F5DEB3' }} />
                </div>
                <div className="display-4 mb-2" style={{ color: '#F5DEB3', fontWeight: 'bold' }}>
                  {analytics.totalOrders}
                </div>
                <h5 className="mb-2" style={{ color: '#F5DEB3' }}>Total Orders</h5>
                <p className="mb-0" style={{ color: '#CD853F', fontSize: '0.9rem' }}>
                  All time orders
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} className="mb-4">
            <Card 
              className="h-100 shadow-lg border-0 position-relative overflow-hidden"
              style={{ 
                background: 'linear-gradient(135deg, #CD853F 0%, #8B4513 100%)',
                borderRadius: '15px'
              }}
            >
              <div 
                className="position-absolute"
                style={{
                  top: '-20px',
                  right: '-20px',
                  width: '80px',
                  height: '80px',
                  background: 'rgba(245, 222, 179, 0.1)',
                  borderRadius: '50%'
                }}
              ></div>
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <DollarSign size={48} style={{ color: '#F5DEB3' }} />
                </div>
                <div className="display-4 mb-2" style={{ color: '#F5DEB3', fontWeight: 'bold' }}>
                  {formatCurrency(analytics.totalRevenue)}
                </div>
                <h5 className="mb-2" style={{ color: '#F5DEB3' }}>Total Revenue</h5>
                <p className="mb-0" style={{ color: '#8B4513', fontSize: '0.9rem' }}>
                  Paid orders only
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} className="mb-4">
            <Card 
              className="h-100 shadow-lg border-0 position-relative overflow-hidden"
              style={{ 
                background: 'linear-gradient(135deg, #A0522D 0%, #CD853F 100%)',
                borderRadius: '15px'
              }}
            >
              <div 
                className="position-absolute"
                style={{
                  top: '-20px',
                  right: '-20px',
                  width: '80px',
                  height: '80px',
                  background: 'rgba(245, 222, 179, 0.1)',
                  borderRadius: '50%'
                }}
              ></div>
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <Coffee size={48} style={{ color: '#F5DEB3' }} />
                </div>
                <div className="display-4 mb-2" style={{ color: '#F5DEB3', fontWeight: 'bold' }}>
                  {analytics.topMenuItems.length}
                </div>
                <h5 className="mb-2" style={{ color: '#F5DEB3' }}>Menu Items</h5>
                <p className="mb-0" style={{ color: '#8B4513', fontSize: '0.9rem' }}>
                  Top selling items
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} className="mb-4">
            <Card 
              className="h-100 shadow-lg border-0 position-relative overflow-hidden"
              style={{ 
                background: analytics.lowStockItems.length > 0 
                  ? 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)'
                  : 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                borderRadius: '15px'
              }}
            >
              <div 
                className="position-absolute"
                style={{
                  top: '-20px',
                  right: '-20px',
                  width: '80px',
                  height: '80px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%'
                }}
              ></div>
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <AlertTriangle size={48} style={{ color: '#FFFFFF' }} />
                </div>
                <div className="display-4 mb-2" style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                  {analytics.lowStockItems.length}
                </div>
                <h5 className="mb-2" style={{ color: '#FFFFFF' }}>Low Stock</h5>
                <p className="mb-0" style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                  Items need restock
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Top Menu Items */}
        <Row className="mb-5">
          <Col lg={8} className="mb-4">
            <Card 
              className="shadow-lg border-0"
              style={{ 
                backgroundColor: '#FFFFFF',
                borderRadius: '15px'
              }}
            >
              <Card.Header 
                className="d-flex align-items-center"
                style={{ 
                  backgroundColor: '#8B4513',
                  borderRadius: '15px 15px 0 0',
                  padding: '1.5rem'
                }}
              >
                <Star size={24} style={{ color: '#F5DEB3' }} className="me-2" />
                <h4 className="mb-0" style={{ color: '#F5DEB3' }}>Top Selling Menu Items</h4>
              </Card.Header>
              <Card.Body style={{ padding: '1.5rem' }}>
                {analytics.topMenuItems.length === 0 ? (
                  <div className="text-center py-5">
                    <Coffee size={48} style={{ color: '#CD853F' }} className="mb-3" />
                    <h5 style={{ color: '#8B4513' }}>No data available</h5>
                    <p style={{ color: '#A0522D' }}>Start taking orders to see top items</p>
                  </div>
                ) : (
                  <Table responsive className="mb-0">
                    <thead>
                      <tr style={{ backgroundColor: '#FFF8DC' }}>
                        <th style={{ color: '#8B4513', padding: '1rem' }}>Rank</th>
                        <th style={{ color: '#8B4513', padding: '1rem' }}>Item Name</th>
                        <th style={{ color: '#8B4513', padding: '1rem' }}>Category</th>
                        <th style={{ color: '#8B4513', padding: '1rem' }}>Total Sold</th>
                        <th style={{ color: '#8B4513', padding: '1rem' }}>Popularity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.topMenuItems.map((item, index) => {
                        const maxQuantity = Math.max(...analytics.topMenuItems.map(i => i.totalQuantity));
                        const percentage = (item.totalQuantity / maxQuantity) * 100;
                        
                        return (
                          <tr key={item._id} className="hover-row">
                            <td style={{ padding: '1rem' }}>
                              <Badge 
                                bg={index < 3 ? 'warning' : 'secondary'}
                                style={{ 
                                  fontSize: '0.9rem',
                                  padding: '0.5rem 0.75rem',
                                  borderRadius: '10px'
                                }}
                              >
                                #{index + 1}
                              </Badge>
                            </td>
                            <td style={{ padding: '1rem' }}>
                              <strong style={{ color: '#8B4513' }}>
                                {item.menuItem[0]?.name || 'N/A'}
                              </strong>
                            </td>
                            <td style={{ padding: '1rem' }}>
                              <Badge 
                                style={{ 
                                  backgroundColor: '#CD853F',
                                  color: '#F5DEB3',
                                  fontSize: '0.8rem',
                                  padding: '0.4rem 0.8rem',
                                  borderRadius: '10px'
                                }}
                              >
                                {item.menuItem[0]?.category || 'N/A'}
                              </Badge>
                            </td>
                            <td style={{ padding: '1rem', color: '#8B4513', fontWeight: 'bold' }}>
                              {item.totalQuantity}
                            </td>
                            <td style={{ padding: '1rem' }}>
                              <ProgressBar 
                                now={percentage} 
                                label={`${percentage.toFixed(1)}%`}
                                variant={index < 3 ? 'success' : 'info'}
                                style={{ 
                                  height: '25px',
                                  borderRadius: '12px',
                                  backgroundColor: '#F5DEB3'
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Quick Stats */}
          <Col lg={4} className="mb-4">
            <Card 
              className="shadow-lg border-0"
              style={{ 
                backgroundColor: '#FFFFFF',
                borderRadius: '15px'
              }}
            >
              <Card.Header 
                className="d-flex align-items-center"
                style={{ 
                  backgroundColor: '#CD853F',
                  borderRadius: '15px 15px 0 0',
                  padding: '1.5rem'
                }}
              >
                <Target size={24} style={{ color: '#F5DEB3' }} className="me-2" />
                <h4 className="mb-0" style={{ color: '#F5DEB3' }}>Quick Statistics</h4>
              </Card.Header>
              <Card.Body style={{ padding: '1.5rem' }}>
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span style={{ color: '#8B4513' }}>Average Order Value</span>
                    <strong style={{ color: '#A0522D', fontSize: '1.1rem' }}>
                      {analytics.totalOrders > 0 
                        ? formatCurrency(analytics.totalRevenue / analytics.totalOrders)
                        : formatCurrency(0)
                      }
                    </strong>
                  </div>
                  <div 
                    style={{ 
                      height: '4px',
                      backgroundColor: '#F5DEB3',
                      borderRadius: '2px',
                      overflow: 'hidden'
                    }}
                  >
                    <div 
                      style={{ 
                        height: '100%',
                        backgroundColor: '#8B4513',
                        width: '75%',
                        borderRadius: '2px'
                      }}
                    ></div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span style={{ color: '#8B4513' }}>Items in Menu</span>
                    <strong style={{ color: '#A0522D', fontSize: '1.1rem' }}>
                      {analytics.topMenuItems.length}
                    </strong>
                  </div>
                  <div 
                    style={{ 
                      height: '4px',
                      backgroundColor: '#F5DEB3',
                      borderRadius: '2px',
                      overflow: 'hidden'
                    }}
                  >
                    <div 
                      style={{ 
                        height: '100%',
                        backgroundColor: '#CD853F',
                        width: '60%',
                        borderRadius: '2px'
                      }}
                    ></div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span style={{ color: '#8B4513' }}>Low Stock Alerts</span>
                    <Badge 
                      bg={analytics.lowStockItems.length > 0 ? 'danger' : 'success'}
                      style={{ 
                        fontSize: '0.9rem',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '10px'
                      }}
                    >
                      {analytics.lowStockItems.length}
                    </Badge>
                  </div>
                  <div 
                    style={{ 
                      height: '4px',
                      backgroundColor: '#F5DEB3',
                      borderRadius: '2px',
                      overflow: 'hidden'
                    }}
                  >
                    <div 
                      style={{ 
                        height: '100%',
                        backgroundColor: analytics.lowStockItems.length > 0 ? '#dc3545' : '#28a745',
                        width: analytics.lowStockItems.length > 0 ? '80%' : '20%',
                        borderRadius: '2px'
                      }}
                    ></div>
                  </div>
                </div>

                <div className="mb-0">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span style={{ color: '#8B4513' }}>Total Categories</span>
                    <strong style={{ color: '#A0522D', fontSize: '1.1rem' }}>
                      {new Set(analytics.topMenuItems.map(item => item.menuItem[0]?.category)).size}
                    </strong>
                  </div>
                  <div 
                    style={{ 
                      height: '4px',
                      backgroundColor: '#F5DEB3',
                      borderRadius: '2px',
                      overflow: 'hidden'
                    }}
                  >
                    <div 
                      style={{ 
                        height: '100%',
                        backgroundColor: '#A0522D',
                        width: '40%',
                        borderRadius: '2px'
                      }}
                    ></div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Low Stock Items */}
        <Row>
          <Col>
            <Card 
              className="shadow-lg border-0"
              style={{ 
                backgroundColor: '#FFFFFF',
                borderRadius: '15px'
              }}
            >
              <Card.Header 
                className="d-flex justify-content-between align-items-center"
                style={{ 
                  backgroundColor: analytics.lowStockItems.length > 0 ? '#dc3545' : '#28a745',
                  borderRadius: '15px 15px 0 0',
                  padding: '1.5rem'
                }}
              >
                <div className="d-flex align-items-center">
                  <Package size={24} style={{ color: '#FFFFFF' }} className="me-2" />
                  <h4 className="mb-0" style={{ color: '#FFFFFF' }}>Low Stock Items</h4>
                </div>
                <Badge 
                  bg={analytics.lowStockItems.length > 0 ? 'light' : 'light'}
                  style={{ 
                    color: analytics.lowStockItems.length > 0 ? '#dc3545' : '#28a745',
                    fontSize: '0.9rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '10px'
                  }}
                >
                  {analytics.lowStockItems.length} items
                </Badge>
              </Card.Header>
              <Card.Body style={{ padding: 'rem', paddingBottom: '2rem' }}>
                {analytics.lowStockItems.length === 0 ? (
                  <div className="text-center py-5">
                    <div className="mb-3">
                      <Award size={64} style={{ color: '#28a745' }} />
                    </div>
                    <h3 style={{ color: '#28a745' }}>All items are well stocked!</h3>
                    <p style={{ color: '#A0522D' }}>No items below minimum threshold</p>
                  </div>
                ) : (
                  <Table responsive className="mb-0">
                    <thead>
                      <tr style={{ backgroundColor: '#FFF8DC' }}>
                        <th style={{ color: '#8B4513', padding: '1rem' }}>Item Name</th>
                        <th style={{ color: '#8B4513', padding: '1rem' }}>Category</th>
                        <th style={{ color: '#8B4513', padding: '1rem' }}>Current Stock</th>
                        <th style={{ color: '#8B4513', padding: '1rem' }}>Min. Threshold</th>
                        <th style={{ color: '#8B4513', padding: '1rem' }}>Stock Level</th>
                        <th style={{ color: '#8B4513', padding: '1rem' }}>Supplier</th>
                        <th style={{ color: '#8B4513', padding: '1rem' }}>Last Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.lowStockItems.map((item) => (
                        <tr key={item._id} className="hover-row">
                          <td style={{ padding: '1rem' }}>
                            <strong style={{ color: '#8B4513' }}>{item.itemName}</strong>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <Badge 
                              style={{ 
                                backgroundColor: '#CD853F',
                                color: '#F5DEB3',
                                fontSize: '0.8rem',
                                padding: '0.4rem 0.8rem',
                                borderRadius: '10px'
                              }}
                            >
                              {item.category}
                            </Badge>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <span style={{ color: '#dc3545', fontWeight: 'bold' }}>
                              {item.quantity} {item.unit}
                            </span>
                          </td>
                          <td style={{ padding: '1rem', color: '#8B4513' }}>
                            {item.minThreshold} {item.unit}
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <ProgressBar 
                              now={getStockPercentage(item.quantity, item.minThreshold)}
                              variant={getStockLevelColor(item.quantity, item.minThreshold)}
                              label={`${getStockPercentage(item.quantity, item.minThreshold).toFixed(1)}%`}
                              style={{ 
                                height: '25px',
                                borderRadius: '12px',
                                backgroundColor: '#F5DEB3'
                              }}
                            />
                          </td>
                          <td style={{ padding: '1rem', color: '#8B4513' }}>
                            {item.supplier || 'N/A'}
                          </td>
                          <td style={{ padding: '1rem', color: '#8B4513' }}>
                            {new Date(item.lastUpdated).toLocaleDateString()}
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
      </Container>

      <style jsx>{`
        .hover-row:hover {
          background-color: #FFF8DC !important;
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default Analytics;