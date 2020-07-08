import react, { FC } from 'react';
import PlaceCard from '../PlaceCard';

export type PlaceEntry = {
    id: string;
    image: string;
    name: string;
    vicinity: string;
    priceLevel: number;
    rating: number;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
};

type Props = {
    places: PlaceEntry[];
};

const buildMapsUrl = (lat, long, placeId) =>
    `https://www.google.com/maps/search/?api=1&query=${lat},${long}&query_place_id=${placeId}`;

const PlacesList: FC<Props> = ({ places }) => {
    return (
        <div>
            {places.map((place) => (
                <PlaceCard
                    key={place.id}
                    image={place.image}
                    name={place.name}
                    vicinity={place.vicinity}
                    priceLevel={place.priceLevel}
                    rating={place.rating}
                    mapsUrl={buildMapsUrl(
                        place.geometry.location.lat,
                        place.geometry.location.lng,
                        place.id
                    )}
                />
            ))}
        </div>
    );
};

export default PlacesList;
