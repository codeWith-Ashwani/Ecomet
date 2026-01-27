# Ecomet

mern-ecommerce/
├── README.md
├── .env
├── .gitignore
│
├── frontend/
├── backend/
    ├── package.json
    ├── package-lock.json
    ├── app.js
    ├── .env
    │
    ├── config/
    │ ├── db.js
    │ ├── cloudinary.js 
    │ └── stripe.js
    │
    ├── models/
    │ ├── User.js
    │ ├── Product.js
    │ ├── Order.js
    │ └── Review.js
    │
    ├── controllers/
    │ ├── authController.js
    │ ├── userController.js
    │ ├── productController.js
    │ ├── orderController.js
    │ └── paymentController.js
    │
    ├── routes/
    │ ├── authRoutes.js
    │ ├── userRoutes.js
    │ ├── productRoutes.js
    │ ├── orderRoutes.js
    │ └── paymentRoutes.js
    │
    ├── middleware/
    │ ├── authMiddleware.js
    │ ├── adminMiddleware.js
    │ ├── errorMiddleware.js
    │ └── uploadMiddleware.js
    │
    ├── utils/
    │ └── sendEmail.js
    │
    ├── validators
    │ └── productValidator.js