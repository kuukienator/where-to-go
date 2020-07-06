import react, { useState, useEffect } from 'react';
import PlaceCard from '../PlaceCard';
import InputBar, { PlaceRequest } from '../InputBar';

const fetchPlaces = async ({
    location,
    address,
    type,
    maxPriceLevel,
    minPriceLevel,
    keyword,
}: PlaceRequest) => {
    const API_URL = '/api/places';

    // const response = await fetch(
    //     `${API_URL}?lat=${location.latitude}&long=${
    //         location.longitude
    //     }&maxPrice=${maxPriceLevel}&minPrice=${minPriceLevel}&types=${types.join(
    //         ','
    //     )}&keyword=${keyword || ''}`
    // );

    const response = await fetch(
        `${API_URL}?maxPrice=${maxPriceLevel}&minPrice=${minPriceLevel}&type=${type}&adress=${address}&keyword=${
            keyword || ''
        }`
    );
    const { places } = await response.json();

    return places;
};

const buildMapsUrl = (lat, long, placeId) =>
    `https://www.google.com/maps/search/?api=1&query=${lat},${long}&query_place_id=${placeId}`;

const LoadingSpinner = () => {
    return (
        <div className="loadingContainer">
            <div className="loadingSquares">
                <div className="loadingSquare">🍹</div>
                <div className="loadingSquare">🥙</div>
                <div className="loadingSquare">☕</div>
                <div className="loadingSquare">🥗</div>
                <div className="loadingSquare">🍸</div>
            </div>
            {/* <div className="loadingText">Loading...</div> */}
            <style jsx>{`
                .loadingContainer {
                    margin: 5rem 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .loadingSquares {
                    display: flex;
                }
                .loadingSquare {
                    animation: sliding 3s infinite;
                    display: flex;
                    justify-content: center;
                    font-size: 2rem;
                    margin: 0 0.2rem;
                }

                .loadingText {
                    margin-top: 1.5rem;
                }

                @keyframes sliding {
                    from {
                        transform: rotate(0);
                    }

                    50% {
                        transform: rotate(180deg);
                    }

                    to {
                        transform: rotate(0);
                    }
                }
            `}</style>
        </div>
    );
};

const Search = () => {
    const [location, setLocation] = useState<Location>();
    const [places, setPlaces] = useState<any[]>([]);
    const [loading, setLoading] = useState<Boolean>(false);

    const getPlaces = async (placeRequest: PlaceRequest) => {
        setLoading(true);
        const places = await fetchPlaces(placeRequest);
        setPlaces(places);
        setLoading(false);
    };

    useEffect(() => {
        const getData = async () => {
            // const location = await getLocation();
            // console.log(location);
            // const places = await fetchPlaces({
            //     location,
            //     types: ['bar'],
            //     maxPriceLevel: 4,
            //     minPriceLevel: 1,
            // });
            // console.log('places', places);
            // // const places = await getPlaces(position);
            // setLocation(location);
            // setPlaces(places);
        };

        // getData();
    }, []);

    return (
        <div className="searchContainers">
            <InputBar
                searchHandler={(payload: PlaceRequest) => getPlaces(payload)}
            />
            {loading && <LoadingSpinner />}
            {!loading &&
                places.map((place) => (
                    <PlaceCard
                        key={place.place_id}
                        image={place.image}
                        name={place.name}
                        vicinity={place.vicinity}
                        priceLevel={place.price_level}
                        rating={place.rating}
                        mapsUrl={buildMapsUrl(
                            place.geometry.location.lat,
                            place.geometry.location.lng,
                            place.place_id
                        )}
                    />
                ))}
            <style jsx>{`
                .searchContainer {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
            `}</style>
        </div>
    );
};

export default Search;
