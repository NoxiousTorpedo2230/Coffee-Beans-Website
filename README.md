<div align="center">

# ☕ Coffee Beans - Cafe Management System

[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=20&duration=3000&pause=1000&color=8B4513&center=true&vCenter=true&width=600&lines=Modern+Cafe+Management;Role-Based+Access+Control;MERN+Stack+Application;Seamless+User+Experience)](https://git.io/typing-svg)

**Full-Stack Solution** | **React.js** | **Node.js** | **MongoDB** | **Express.js** 🌟

</div>

---

## ✨ Overview

Coffee Beans is a comprehensive cafe management system built with the MERN stack, designed to streamline operations through role-based access control. The application serves customers, staff, and administrators with a warm coffee-themed UI featuring smooth animations and responsive design.

---

<div align="center">

## 🛠️ Tech Stack

### Frontend
<p>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" />
<img src="https://img.shields.io/badge/React_Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" />
<img src="https://img.shields.io/badge/Lucide_React-000000?style=for-the-badge&logo=lucide&logoColor=white" />
</p>

### Backend
<p>
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
</p>

</div>

---

## 📁 Project Structure

```
coffee-beans/
├── client/                        # Frontend React Application
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── Component/
│   │   │   ├── Admin/
│   │   │   │   ├── Analytics.js
│   │   │   │   ├── Bills.js
│   │   │   │   ├── Inventory.js
│   │   │   │   └── Staff.js
│   │   │   ├── Customer/
│   │   │   │   ├── Feedback.js
│   │   │   │   ├── Menu.js
│   │   │   │   ├── Orders.js
│   │   │   │   └── Reservations.js
│   │   │   ├── LandingPage/
│   │   │   │   └── (Landing page components)
│   │   │   ├── Navigation/
│   │   │   │   └── (Navigation components)
│   │   │   └── User/
│   │   │       ├── Login.js
│   │   │       └── Register.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   ├── package.json
│   └── package-lock.json
│
├── server/                        # Backend Node.js Application
│   ├── config/
│   │   └── mongodb.js            # MongoDB connection config
│   ├── controllers/
│   │   └── controllers.js        # Route controllers
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT authentication
│   ├── models/
│   │   └── models.js             # MongoDB schemas
│   ├── routes/
│   │   └── routes.js             # API routes
│   ├── .env                      # Environment variables
│   ├── package.json
│   ├── package-lock.json
│   └── server.js                 # Express server entry
│
└── README.md
```

---

## 🚀 Features

### 👥 Role-Based Access

**For Customers:**
- Browse and search menu items
- Place and track orders in real-time
- Make table reservations
- Submit feedback and reviews
- View order history

**For Staff:**
- Process customer orders efficiently
- Manage inventory and stock levels
- Handle billing and payment processing
- View daily operations dashboard
- Update order status

**For Administrators:**
- Complete system oversight
- Staff management and scheduling
- Business analytics and insights
- Inventory control and reporting
- Financial management and billing
- Customer feedback monitoring

### 🎨 Design Features

- **Coffee-Themed UI**: Warm color palette (#8B4513, #CD853F, #F5DEB3)
- **Responsive Design**: Mobile-first approach for all devices
- **Smooth Animations**: Interactive hover effects and transitions
- **Intuitive Navigation**: Easy-to-use interface with clear routing
- **Real-Time Updates**: Live order tracking and status updates

---

## 🚀 Installation & Setup

### Prerequisites
```bash
Node.js (v14 or higher)
MongoDB (v4.4 or higher)
npm or yarn package manager
```

### Backend Setup

**1. Navigate to server directory**
```bash
cd server
```

**2. Install dependencies**
```bash
npm install
```

**3. Required Backend Dependencies**
```bash
npm install express mongoose dotenv cors bcryptjs jsonwebtoken
npm install nodemon --save-dev
```

**4. Environment Configuration**
Create `.env` file in server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/coffee-beans
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

**5. Start MongoDB**
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

**6. Start backend server**
```bash
npm start
# or for development with nodemon
npm run dev
```
Backend runs on `http://localhost:5000`

### Frontend Setup

**1. Navigate to client directory**
```bash
cd client
```

**2. Install dependencies**
```bash
npm install
```

**3. Required Frontend Dependencies**
```bash
npm install react react-dom react-router-dom
npm install react-bootstrap bootstrap
npm install lucide-react
npm install axios
```

**4. Environment Configuration**
Create `.env` file in client directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**5. Start development server**
```bash
npm start
```
Frontend runs on `http://localhost:3000`

---

## 🔧 API Endpoints

### Authentication
```
POST   /api/auth/register        # Register new user
POST   /api/auth/login           # User login
GET    /api/auth/profile         # Get user profile
```

### Menu Management
```
GET    /api/menu                 # Get all menu items
GET    /api/menu/:id             # Get menu item by ID
POST   /api/menu                 # Create menu item (Admin)
PUT    /api/menu/:id             # Update menu item (Admin)
DELETE /api/menu/:id             # Delete menu item (Admin)
```

### Orders
```
GET    /api/orders               # Get all orders
GET    /api/orders/:id           # Get order by ID
POST   /api/orders               # Create new order
PUT    /api/orders/:id           # Update order status
DELETE /api/orders/:id           # Cancel order
```

### Reservations
```
GET    /api/reservations         # Get all reservations
POST   /api/reservations         # Make reservation
PUT    /api/reservations/:id     # Update reservation
DELETE /api/reservations/:id     # Cancel reservation
```

### Inventory (Staff/Admin)
```
GET    /api/inventory            # Get inventory items
POST   /api/inventory            # Add inventory item
PUT    /api/inventory/:id        # Update inventory
DELETE /api/inventory/:id        # Remove inventory item
```

### Analytics (Admin)
```
GET    /api/analytics/sales      # Sales statistics
GET    /api/analytics/orders     # Order analytics
GET    /api/analytics/revenue    # Revenue reports
```

---

## 📱 Application Routes

### Public Routes
```
/                    # Landing page
/login               # User login
/register            # User registration
```

### Customer Routes
```
/menu                # Browse menu
/orders              # View orders
/reservations        # Make reservations
/feedback            # Submit feedback
```

### Staff Routes
```
/inventory           # Manage inventory
/bills               # Handle billing
/orders              # Process orders
```

### Admin Routes
```
/staff               # Staff management
/analytics           # Business analytics
/inventory           # Inventory control
/bills               # Financial management
```

---

## 🎨 Color Palette

```css
Primary Brown:    #8B4513
Secondary Brown:  #CD853F
Accent Sienna:    #A0522D
Light Wheat:      #F5DEB3
Dark Text:        #5D4037
Background:       #FFF8DC (Cornsilk)
```

---

## 🔐 Authentication & Authorization

- **JWT Tokens**: Secure authentication with JSON Web Tokens
- **Password Hashing**: bcrypt for secure password storage
- **Role-Based Middleware**: Protected routes based on user roles
- **Session Management**: Token expiration and refresh handling

---

## 📊 Database Models

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: ['customer', 'staff', 'admin'],
  phone: String,
  createdAt: Date
}
```

### Menu Item Schema
```javascript
{
  name: String,
  description: String,
  category: String,
  price: Number,
  image: String,
  available: Boolean,
  ingredients: [String]
}
```

### Order Schema
```javascript
{
  userId: ObjectId,
  items: [{ menuItem, quantity, price }],
  totalAmount: Number,
  status: ['pending', 'preparing', 'ready', 'delivered'],
  orderDate: Date,
  notes: String
}
```

### Reservation Schema
```javascript
{
  userId: ObjectId,
  date: Date,
  time: String,
  guests: Number,
  tableNumber: Number,
  status: ['pending', 'confirmed', 'cancelled'],
  specialRequests: String
}
```

---



## 📈 Performance Features

- **Optimized Images**: Compressed assets for faster loading
- **Code Splitting**: React lazy loading for routes
- **API Caching**: Reduced redundant database queries
- **Pagination**: Efficient data loading for large datasets
- **Debouncing**: Optimized search and filter operations

---

## 🔍 Security Features

- Password encryption with bcrypt
- JWT token-based authentication
- Protected API routes with middleware
- Input validation and sanitization
- CORS configuration
- Environment variable protection
- SQL injection prevention with Mongoose

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

<div align="center">


---

**⭐ If you find this project useful, please give it a star! ⭐**

*Built with ☕ for coffee lovers everywhere*

</div>
