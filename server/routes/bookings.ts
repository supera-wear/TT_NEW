import express from 'express';
import { db } from '../db/index.js';
import { bookings } from '../../shared/schema.js';
import { eq, desc } from 'drizzle-orm';

const router = express.Router();

// Create booking
router.post('/', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const {
      pickupLocation,
      destination,
      date,
      time,
      passengers,
      vehicleType,
      notes
    } = req.body;

    const [newBooking] = await db.insert(bookings).values({
      userId: req.session.userId,
      pickupLocation,
      destination,
      scheduledFor: new Date(`${date} ${time}`),
      passengers,
      vehicleType,
      notes,
      status: 'pending',
    }).returning();

    res.json(newBooking);
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user bookings
router.get('/', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const userBookings = await db.select().from(bookings)
      .where(eq(bookings.userId, req.session.userId))
      .orderBy(desc(bookings.createdAt));

    res.json(userBookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;