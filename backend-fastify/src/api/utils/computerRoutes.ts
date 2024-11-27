import GoogleResponseError from "../errors/googleResponseError";
import GoogleResponse from "../models/googleResponse"
import Location from "../models/location"

export default async function ComputeRoutes(origin: string, destination: string) {
    const response = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': `${process.env.GOOGLE_API_KEY}`,
            'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.legs.startLocation,routes.legs.endLocation'
        },
        body: JSON.stringify({
            origin: {
                address: origin
            },
            destination: {
                address: destination
            },
            travelMode: 'DRIVE'
        })
    }).then(response => response.json());

    if (response.error)
        throw new GoogleResponseError(response.error.message);

    let route = response.routes[0]
    let legs = route.legs[0]
    let originLocation: Location = new Location(legs.startLocation.latLng.latitude, legs.startLocation.latLng.longitude)
    let destinationLocation: Location = new Location(legs.endLocation.latLng.latitude, legs.endLocation.latLng.longitude)

    let googleResponse: GoogleResponse = new GoogleResponse(
        originLocation,
        destinationLocation,
        route.distanceMeters,
        route.duration
    );

    return googleResponse;
}