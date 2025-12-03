import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { motion } from 'framer-motion';
import { MapPin, Package, Home } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const DeliveryMap = ({ order }) => {
  // Sample coordinates for Bulalacao
  const vendorLocation = [12.3333, 121.3333]; // Bulalacao coordinates
  const customerLocation = [12.3500, 121.3500]; // Sample customer location
  const currentLocation = [12.3400, 121.3400]; // Current delivery location

  const pathCoordinates = [
    vendorLocation,
    [12.3350, 121.3350],
    currentLocation,
    [12.3450, 121.3450],
    customerLocation
  ];

  return (
    <div className="basket-card overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-forest-green to-sea-blue text-white">
        <h3 className="text-2xl font-playfair font-bold mb-2">Delivery Tracking</h3>
        <p className="text-coconut-tan">Order #{order?.id || '12345'}</p>
      </div>

      <div className="relative h-96">
        <MapContainer
          center={currentLocation}
          zoom={13}
          className="h-full w-full"
          style={{ background: '#F5F1E8' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {/* Vendor Marker */}
          <Marker position={vendorLocation}>
            <Popup>
              <div className="text-center">
                <Package className="w-6 h-6 text-forest-green mx-auto mb-2" />
                <strong>Vendor Location</strong>
                <p className="text-sm">Bulalacao Market</p>
              </div>
            </Popup>
          </Marker>

          {/* Current Delivery Location */}
          <Marker position={currentLocation}>
            <Popup>
              <div className="text-center">
                <MapPin className="w-6 h-6 text-dawn-orange mx-auto mb-2" />
                <strong>Current Location</strong>
                <p className="text-sm">On the way</p>
              </div>
            </Popup>
          </Marker>

          {/* Customer Location */}
          <Marker position={customerLocation}>
            <Popup>
              <div className="text-center">
                <Home className="w-6 h-6 text-sea-blue mx-auto mb-2" />
                <strong>Delivery Address</strong>
                <p className="text-sm">Customer Location</p>
              </div>
            </Popup>
          </Marker>

          {/* Delivery Route */}
          <Polyline
            positions={pathCoordinates}
            color="#E2953A"
            weight={4}
            opacity={0.7}
            dashArray="10, 10"
          />
        </MapContainer>

        {/* Overlay Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 basket-card p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-earth-brown mb-1">Estimated Arrival</p>
              <p className="text-lg font-bold text-forest-green">25 minutes</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-earth-brown mb-1">Distance</p>
              <p className="text-lg font-bold text-forest-green">3.2 km</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Status Timeline */}
      <div className="p-6">
        <div className="space-y-4">
          {[
            { label: 'Order Placed', time: '10:30 AM', completed: true },
            { label: 'Order Confirmed', time: '10:35 AM', completed: true },
            { label: 'Out for Delivery', time: '11:00 AM', completed: true },
            { label: 'Delivered', time: 'Pending', completed: false },
          ].map((status, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                status.completed ? 'bg-dawn-orange' : 'bg-coconut-tan'
              }`}>
                {status.completed && (
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className={`font-semibold ${status.completed ? 'text-forest-green' : 'text-earth-brown'}`}>
                  {status.label}
                </p>
                <p className="text-sm text-earth-brown">{status.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryMap;
