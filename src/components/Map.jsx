import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
    return (
        <MapContainer center={[3.045639, 101.618222]} zoom={13} style={{ height: 500, borderRadius: 20 }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[3.045639, 101.618222]} />
        </MapContainer>
    );
}
