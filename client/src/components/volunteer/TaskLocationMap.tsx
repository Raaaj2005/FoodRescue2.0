import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import L from 'leaflet';
import type { VolunteerTask } from '@shared/schema';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const pickupIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const deliveryIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'filter hue-rotate-90',
});

interface TaskLocationMapProps {
  task: VolunteerTask;
}

export function TaskLocationMap({ task }: TaskLocationMapProps) {
  const pickupCoords = task.pickupLocation?.coordinates || [40.7128, -74.0060];
  const deliveryCoords = task.deliveryLocation?.coordinates || [40.7128, -74.0060];

  const bounds: [[number, number], [number, number]] = [
    [
      Math.min(pickupCoords[0], deliveryCoords[0]) - 0.01,
      Math.min(pickupCoords[1], deliveryCoords[1]) - 0.01,
    ],
    [
      Math.max(pickupCoords[0], deliveryCoords[0]) + 0.01,
      Math.max(pickupCoords[1], deliveryCoords[1]) + 0.01,
    ],
  ];

  const center: [number, number] = [
    (pickupCoords[0] + deliveryCoords[0]) / 2,
    (pickupCoords[1] + deliveryCoords[1]) / 2,
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Pickup & Delivery Route</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 rounded-md overflow-hidden border mb-4">
          <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }} bounds={bounds} boundsOptions={{ padding: [50, 50] }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            
            <Marker position={pickupCoords} icon={pickupIcon}>
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold text-blue-600">📍 Pickup Location</p>
                  <p className="text-xs text-muted-foreground">{task.pickupLocation?.address}</p>
                  <p className="text-xs">
                    {pickupCoords[0].toFixed(4)}, {pickupCoords[1].toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>

            <Marker position={deliveryCoords} icon={deliveryIcon}>
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold text-green-600">🎯 Delivery Location</p>
                  <p className="text-xs text-muted-foreground">{task.deliveryLocation?.address}</p>
                  <p className="text-xs">
                    {deliveryCoords[0].toFixed(4)}, {deliveryCoords[1].toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded">
            <p className="font-semibold text-blue-900 dark:text-blue-100">From</p>
            <p className="text-blue-700 dark:text-blue-300">{task.pickupLocation?.address}</p>
          </div>
          <div className="p-2 bg-green-50 dark:bg-green-950 rounded">
            <p className="font-semibold text-green-900 dark:text-green-100">To</p>
            <p className="text-green-700 dark:text-green-300">{task.deliveryLocation?.address}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
