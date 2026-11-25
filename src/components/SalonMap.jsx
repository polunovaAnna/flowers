import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { MAP_ZOOM, SALON } from '../constants';
import { ErrorMessage } from './ErrorMessage';

const salonIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
})

export function SalonMap() {
    const containerRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const map = L.map(containerRef.current).setView(SALON.coordinates, MAP_ZOOM);

        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 19,
        }).addTo(map);

        tiles.on('tileerror', () => {
            setError("Не вдалося завантажити мапу. Перевірте з'єднання");
        });

        tiles.on("load", () => setError(null));

        L.marker(SALON.coordinates, { icon: salonIcon }).addTo(map).bindPopup(SALON.address);

        return () => map.remove();
    }, []);

    return (
        <div className="salon-map">
            <div
                ref={containerRef}
                className="salon-map__canvas"
                role="region"
                aria-label={`Мапа: ${SALON.address}`}
            />
            {error && <ErrorMessage message={error} />}
        </div>
    )
}