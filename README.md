# Mini Business Operations App

A 4-week full-stack internship project using React, Tailwind CSS, Node.js, Express, PostgreSQL, Prisma, GitHub, automated tests, and deployment practices.

## Business Goal

This application manages a simplified business workflow:

- Product management
- Customer management
- Sales order creation
- Sales order line items
- Backend total calculation
- Stock validation
- Order confirmation
- Stock movement tracking

## Planned Modules

- Dashboard
- Products
- Customers
- Sales Orders
- Stock Movements

## Tech Stack

### Frontend

- React
- Tailwind CSS
- React Router

### Backend

- Node.js
- Express.js
- Prisma ORM

### Database

- PostgreSQL

## Prisma Setup
 - This project uses Prisma ORM with PostgreSQL.

### Engineering Workflow

- Git
- GitHub
- Pull requests
- Automated tests
- GitHub Actions
- Hostinger deployment

## Week 3 Business Flow Test Scenarios

### Backend API tests

```powershell
cd backend
npm test
```

Covered API scenarios:

- Health endpoint works
- Product can be created
- Customer can be created
- Draft sales order can be created
- Sales order can be confirmed
- Product stock reduces after confirmation
- Double confirmation is blocked
- Insufficient stock is rejected