import express from 'express'
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, trackOrder } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.get('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// Payment Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

// User Feature
orderRouter.post('/userorders', authUser, userOrders)

// Verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)

// Track order status
orderRouter.post('/track', authUser, trackOrder)  // Add this line for track order

export default orderRouter;
