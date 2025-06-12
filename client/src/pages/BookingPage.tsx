import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, MapPin, Clock, Users, Car } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import MapComponent from '@/components/booking/MapComponent';
import { useBooking } from '@/contexts/BookingContext';
import { cn } from '@/lib/utils';

const BookingPage = () => {
  const { booking, updateBooking, submitBooking } = useBooking();
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const vehicleTypes = [
    { id: 'standard', name: 'Standaard', description: '4 personen', price: '€2.50/km', icon: <Car className="h-5 w-5" /> },
    { id: 'comfort', name: 'Comfort', description: '4 personen, luxe', price: '€3.50/km', icon: <Car className="h-5 w-5" /> },
    { id: 'van', name: 'Van', description: '8 personen', price: '€4.50/km', icon: <Car className="h-5 w-5" /> },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitBooking();
      // Handle success
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Boek Uw Taxi</h1>
            <p className="text-xl text-muted-foreground">
              Vul de details in voor uw rit
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Form */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Rit Details
                </CardTitle>
                <CardDescription>
                  Voer uw ophaal- en bestemmingslocatie in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Pickup Location */}
                  <div className="space-y-2">
                    <Label htmlFor="pickup">Ophaallocatie</Label>
                    <Input
                      id="pickup"
                      placeholder="Voer uw ophaallocatie in"
                      value={booking.pickupLocation}
                      onChange={(e) => updateBooking({ pickupLocation: e.target.value })}
                      required
                    />
                  </div>

                  {/* Destination */}
                  <div className="space-y-2">
                    <Label htmlFor="destination">Bestemming</Label>
                    <Input
                      id="destination"
                      placeholder="Voer uw bestemming in"
                      value={booking.destination}
                      onChange={(e) => updateBooking({ destination: e.target.value })}
                      required
                    />
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Datum</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP", { locale: nl }) : "Selecteer datum"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Tijd</Label>
                      <Input
                        id="time"
                        type="time"
                        value={booking.time}
                        onChange={(e) => updateBooking({ time: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Passengers */}
                  <div className="space-y-2">
                    <Label htmlFor="passengers">Aantal Passagiers</Label>
                    <Select
                      value={booking.passengers.toString()}
                      onValueChange={(value) => updateBooking({ passengers: parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer aantal passagiers" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              {num} {num === 1 ? 'persoon' : 'personen'}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Vehicle Type */}
                  <div className="space-y-3">
                    <Label>Voertuigtype</Label>
                    <div className="grid grid-cols-1 gap-3">
                      {vehicleTypes.map((vehicle) => (
                        <div
                          key={vehicle.id}
                          className={cn(
                            "border rounded-lg p-4 cursor-pointer transition-all duration-200",
                            booking.vehicleType === vehicle.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          )}
                          onClick={() => updateBooking({ vehicleType: vehicle.id })}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {vehicle.icon}
                              <div>
                                <div className="font-medium">{vehicle.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {vehicle.description}
                                </div>
                              </div>
                            </div>
                            <Badge variant="secondary">{vehicle.price}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">Speciale Verzoeken (Optioneel)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Eventuele speciale verzoeken of opmerkingen"
                      value={booking.notes}
                      onChange={(e) => updateBooking({ notes: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Bezig met boeken...' : 'Boek Nu'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Route Kaart
                </CardTitle>
                <CardDescription>
                  Bekijk uw route op de kaart
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                  <MapComponent
                    pickup={booking.pickupLocation}
                    destination={booking.destination}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingPage;