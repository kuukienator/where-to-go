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
                <span>Try something else</span>
                <SearchIcon
                    fill="white"
                    style={{ width: '1.6rem', height: '1.6rem' }}
                />
            </button>
            <style jsx>{`
                .placesContainer {
                    width: 100%;
                    margin-bottom: 3.5rem;
                }

                .floatingSearchButton {
                    position: fixed;
                    right: 0;
                    background: black;

                    color: white;
                    bottom: 0;
                    width: 100%;
                    border: none;
                    border-radius: 0;
                    height: 3.5rem;

                    font-family: 'Bitter', serif;
                    font-family: 'Zilla Slab', serif;
                    font-size: 1.6rem;

                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .floatingSearchButton span {
                    margin-right: 0.5rem;
                }
            `}</style>
        </div>
    );
};

export default PlacesList;
