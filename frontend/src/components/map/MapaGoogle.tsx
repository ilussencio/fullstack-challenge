import { useEffect, useState } from 'react';
import {
    APIProvider,
    Map,
    useMapsLibrary,
    useMap
} from '@vis.gl/react-google-maps';

const API_KEY = __GOOGLE_API__ || '';

interface MapaGoogleProps {
    origin: string;
    destination: string;
}

export default function MapaGoogle({ origin, destination }: MapaGoogleProps) {
    return (
        <APIProvider apiKey={API_KEY}>
            <Map
                defaultCenter={{ lat: -19.56 ,lng: -47.26}}
                defaultZoom={4}
                gestureHandling={'greedy'}
                fullscreenControl={false}>
                {origin && destination? <Directions origin={origin} destination={destination}  />: ""}
            </Map>
        </APIProvider>
    )
}


function Directions({ origin, destination }: { origin: string, destination: string }) {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionsService, setDirectionsService] =
        useState<google.maps.DirectionsService>();
    const [directionsRenderer, setDirectionsRenderer] =
        useState<google.maps.DirectionsRenderer>();
    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
    const [routeIndex] = useState(0);
    const selected = routes[routeIndex];
    const leg = selected?.legs[0];

    // Initialize directions service and renderer
    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [routesLibrary, map, origin, destination]);

    // Use directions service
    useEffect(() => {
        
        if (!directionsService || !directionsRenderer) return;

        directionsService
            .route({
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true
            })
            .then(response => {
                directionsRenderer.setDirections(response);
                setRoutes(response.routes);
                
            });

        return () => directionsRenderer.setMap(null);
    }, [directionsService, directionsRenderer]);

    // Update direction route
    useEffect(() => {
        if (!directionsRenderer) return;
        directionsRenderer.setRouteIndex(routeIndex);
    }, [routeIndex, directionsRenderer]);

    if (!leg) return null;
}