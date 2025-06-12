import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Note: In a real application, you would set this from environment variables
mapboxgl.accessToken = 'pk.eyJ1IjoidGF4aXRvZGF5IiwiYSI6ImNscXh5ejF6YjBhZmQya3BjcWVxdGNkZGcifQ.example';

interface MapComponentProps {
  pickup?: string;
  destination?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ pickup, destination }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [4.9041, 52.3676], // Amsterdam coordinates
      zoom: 12
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current || !pickup || !destination) return;

    // Here you would typically geocode the addresses and add markers/route
    // For now, we'll just show a placeholder
    console.log('Pickup:', pickup, 'Destination:', destination);
  }, [pickup, destination]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
      {(!pickup || !destination) && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/80 rounded-lg">
          <p className="text-muted-foreground text-center">
            Voer ophaal- en bestemmingslocatie in<br />
            om de route te bekijken
          </p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;