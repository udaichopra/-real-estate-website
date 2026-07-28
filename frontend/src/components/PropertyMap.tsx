import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

type PropertyMapProps = {
    latitude: number;
    longitude: number;
    address: string;
};

export default function PropertyMap({
    latitude,
    longitude,
    address,
}: PropertyMapProps) {
    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={15}
            className="h-96 w-full"
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[latitude, longitude]}>
                <Popup>{address}</Popup>
            </Marker>
        </MapContainer>
    );
}