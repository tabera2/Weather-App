import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getLocationDetails } from "../services/weatherApi";

function LocationMap({ location }) {
const [locationDetails, setLocationDetails] = useState(null);
const [mapError, setMapError] = useState("");

    useEffect(() => {
    const loadLocationDetails = async () => {
        try {
        setMapError("");

        const details = await getLocationDetails(
            location.latitude,
            location.longitude
        );

        setLocationDetails(details);
        } catch (error) {
        setMapError(error.message);
        }
    };

    if (location?.latitude && location?.longitude) {
        loadLocationDetails();
    }
    }, [location]);

    const position = [
        location.latitude,
        location.longitude,
    ];

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Location Map
        </h2>

        <p className="text-sm text-muted-foreground">
          Explore the location associated with this weather forecast.
        </p>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <MapContainer
            center={position}
            zoom={10}
            scrollWheelZoom={false}
            className="h-[350px] w-full"
          >
        <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
            <Popup>
            <strong>{location.name}</strong>
            <br />

            {location.state && `${location.state}, `}
            {location.country}
            </Popup>
        </Marker>
          </MapContainer>
            <div className="border-t bg-white p-4">
                {mapError && (
                    <p className="text-sm text-destructive">
                    {mapError}
                    </p>
                )}

                {locationDetails && (
                    <>
                    <p className="text-sm font-medium">
                        OpenStreetMap Location
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {locationDetails.display_name}
                    </p>
                    </>
                )}
                </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default LocationMap;