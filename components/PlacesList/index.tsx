import react, { FC } from 'react';
import PlaceCard from '../PlaceCard';
import SearchIcon from '../../svg-icons/iconmonstr-magnifier-6.svg';

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
    openSearch: Function;
};

const buildMapsUrl = (lat, long, placeId) =>
    `https://www.google.com/maps/search/?api=1&query=${lat},${long}&query_place_id=${placeId}`;

const PlacesList: FC<Props> = ({ places, openSearch }) => {
    return (
        <div className="placesContainer">
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
            <button
                className="floatingSearchButton"
                onClick={() => openSearch()}
            >
                <SearchIcon fill="white" width="40" height="40" />
            </button>
            <style jsx>{`
                .placesContainer {
                    width: 100%;
                }

                .floatingSearchButton {
                    position: fixed;
                    right: 0;
                    bottom: 100px;
                    background: black;

                    border: none;
                    border-radius: none;

                    padding: 0.5rem 1rem;
                    padding-left: 0.5rem;

                    border-radius: 0.5rem 0 0 0.5rem;
                }
            `}</style>
        </div>
    );
};

export default PlacesList;
