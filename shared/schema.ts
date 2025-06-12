import { pgTable, text, timestamp, uuid, boolean, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  phone: text('phone'),
  address: text('address'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const bookings = pgTable('bookings', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  pickupLocation: text('pickup_location').notNull(),
  destination: text('destination').notNull(),
  scheduledFor: timestamp('scheduled_for').notNull(),
  passengers: integer('passengers').notNull().default(1),
  vehicleType: text('vehicle_type').notNull().default('standard'),
  notes: text('notes'),
  status: text('status').notNull().default('pending'), // pending, confirmed, in_progress, completed, cancelled
  estimatedPrice: text('estimated_price'),
  actualPrice: text('actual_price'),
  driverId: uuid('driver_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});