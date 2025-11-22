import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import L from 'leaflet';
import type { User } from '@shared/schema';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const donorIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'filter hue-rotate-180',
});

const ngoIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'filter hue-rotate-90',
});

export function DonorNGOMap() {
  const { data: allUsers = [] } = useQuery<User[]>({
    queryKey: ['/api/admin/users'],
  });

  const donors = allUsers.filter(u => u.role === 'donor' && u.donorProfile?.address?.coordinates);
  const ngos = allUsers.filter(u => u.role === 'ngo' && u.ngoProfile?.address?.coordinates);

  const mapCenter: [number, number] = donors[0]?.donorProfile?.address?.coordinates || 
                                      ngos[0]?.ngoProfile?.address?.coordinates || 
                                      [40.7128, -74.0060];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Network Map - Donors & NGOs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96 rounded-md overflow-hidden border">
          <MapContainer center={mapCenter} zoom={12} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            
            {donors.map((donor) => {
              const coords = donor.donorProfile?.address?.coordinates;
              if (!coords) return null;
              
              return (
                <div key={donor.id}>
                  <Marker position={coords} icon={donorIcon}>
                    <Popup>
                      <div className="text-sm">
                        <p className="font-semibold text-blue-600">{donor.donorProfile?.businessName}</p>
                        <p className="text-xs text-muted-foreground">{donor.donorProfile?.address?.city}</p>
                        <p className="text-xs">📍 {coords[0].toFixed(4)}, {coords[1].toFixed(4)}</p>
                      </div>
                    </Popup>
                  </Marker>
                  <Circle center={coords} radius={2000} pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.1 }} />
                </div>
              );
            })}
            
            {ngos.map((ngo) => {
              const coords = ngo.ngoProfile?.address?.coordinates;
              if (!coords) return null;
              
              return (
                <div key={ngo.id}>
                  <Marker position={coords} icon={ngoIcon}>
                    <Popup>
                      <div className="text-sm">
                        <p className="font-semibold text-green-600">{ngo.ngoProfile?.organizationName}</p>
                        <p className="text-xs text-muted-foreground">Capacity: {ngo.ngoProfile?.capacity} meals</p>
                        <p className="text-xs">📍 {coords[0].toFixed(4)}, {coords[1].toFixed(4)}</p>
                      </div>
                    </Popup>
                  </Marker>
                  <Circle center={coords} radius={3000} pathOptions={{ color: 'green', fillColor: 'green', fillOpacity: 0.1 }} />
                </div>
              );
            })}
          </MapContainer>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <p className="font-semibold text-blue-900 dark:text-blue-100">🏪 Donors: {donors.length}</p>
            <p className="text-xs text-blue-700 dark:text-blue-300">Restaurants & food sources</p>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
            <p className="font-semibold text-green-900 dark:text-green-100">🤝 NGOs: {ngos.length}</p>
            <p className="text-xs text-green-700 dark:text-green-300">Distribution partners</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
