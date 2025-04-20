# Digital Diner - Restaurant Ordering System

Digital Diner is a full-stack restaurant ordering application that allows customers to browse menu items, place orders, and track their order history. The application uses a hybrid database approach with MongoDB for menu items and PostgreSQL for order management.

## Live Demo

[View the live application on Netlify](https://your-netlify-app-url.netlify.app)

## Features

- Browse restaurant menu items by category
- Search functionality for menu items
- Add items to cart with quantity selection
- Checkout process with customer information
- Order confirmation with estimated pickup time
- Order history tracking by phone number
- Responsive design for mobile and desktop

## Technology Stack

### Frontend

- React.js with Vite
- React Router for navigation
- Context API for state management
- Tailwind CSS for styling
- Axios for API requests

### Backend

- Node.js with Express
- MongoDB for menu items (using Mongoose)
- PostgreSQL for orders and customer data (using Sequelize)
- RESTful API architecture

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- PostgreSQL database

### Backend Setup

1. Clone the repository

```bash
git clone https://github.com/Rohit1419/DigitalDiner.git
cd DigitalDiner/backend
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:

```
PORT=3000
MONGO_URL=your_mongodb_connection_string
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=your_postgres_password
PG_DATABASE=digitaldiner
```

4. Set up PostgreSQL database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE digitaldiner;

# Exit psql
\q
```

5. Start the backend server

```bash
npm start
```

The server will start on http://localhost:3000

### Frontend Setup

1. Navigate to the frontend directory

```bash
cd ../frontend
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the frontend directory:

```
VITE_API_URL=http://localhost:3000/api/v1
```

4. Start the development server

```bash
npm run dev
```

The frontend will be available at http://localhost:5173

## Database Design Justification

This project uses a hybrid database approach:

### MongoDB (Document Database)

- **Used for**: Menu items
- **Justification**: Menu items have a relatively simple structure with minimal relationships. MongoDB's flexible schema is ideal for menu items that might have varying attributes (e.g., some items might have allergen information, others might have customization options).

### PostgreSQL (Relational Database)

- **Used for**: Orders, customers, and order items
- **Justification**: Order management involves complex relationships between customers, orders, and order items. PostgreSQL's relational structure ensures data integrity through foreign key constraints and transactions, which is crucial for financial and order processing systems.

This hybrid approach leverages the strengths of both database types:

- MongoDB's flexibility and performance for read-heavy menu browsing
- PostgreSQL's ACID compliance and relational capabilities for critical order processing

## API Endpoints

### Menu Items

- `GET /api/v1/menu-items/all-items` - Get all menu items
- `POST /api/v1/menu-items/add-item` - Add a new menu item
- `GET /api/v1/menu-items/menu-item/:id` - Get a specific menu item
- `DELETE /api/v1/menu-items/menu-item/:id` - Delete a menu item

### Orders

- `POST /api/v1/orders` - Create a new order
- `GET /api/v1/orders` - Get all orders (admin)
- `GET /api/v1/orders/:id` - Get a specific order
- `PUT /api/v1/orders/:id` - Update order status
- `GET /api/v1/orders/history/:phone` - Get order history by phone number

## Assumptions and Challenges

### Assumptions

- Users will primarily access the application on mobile devices
- The restaurant will handle payment at pickup (no online payment integration)
- Menu items don't have complex variations or customizations
- Order pickup times are estimated based on preparation time of items

### Challenges

- **Database Integration**: Integrating two different database systems required careful planning of data flow and error handling
- **Order Status Management**: Creating a reliable system for tracking order status through the preparation process
- **Pickup Time Calculation**: Developing an algorithm to estimate realistic pickup times based on order items and volume
- **State Management**: Managing cart state across different components while ensuring data consistency

## Future Improvements

- User authentication for customer accounts
- Admin dashboard for restaurant staff
- Real-time order status updates
- Online payment integration
- Email/SMS notifications for order updates
- Menu item image upload functionality
- Analytics for popular items and busy periods

## License

[MIT License](LICENSE)
