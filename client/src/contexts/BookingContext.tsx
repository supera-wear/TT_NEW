import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BookingData {
  pickupLocation: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  vehicleType: string;
  notes: string;
}

interface BookingContextType {
  booking: BookingData;
  updateBooking: (data: Partial<BookingData>) => void;
  submitBooking: () => Promise<void>;
  resetBooking: () => void;
}

const defaultBooking: BookingData = {
  pickupLocation: '',
  destination: '',
  date: '',
  time: '',
  passengers: 1,
  vehicleType: 'standard',
  notes: '',
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [booking, setBooking] = useState<BookingData>(defaultBooking);

  const updateBooking = (data: Partial<BookingData>) => {
    setBooking(prev => ({ ...prev, ...data }));
  };

  const submitBooking = async () => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      });

      if (!response.ok) {
        throw new Error('Booking submission failed');
      }

      const result = await response.json();
      console.log('Booking submitted:', result);
      
      // Reset booking after successful submission
      resetBooking();
    } catch (error) {
      console.error('Booking submission failed:', error);
      throw error;
    }
  };

  const resetBooking = () => {
    setBooking(defaultBooking);
  };

  const value = {
    booking,
    updateBooking,
    submitBooking,
    resetBooking,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};