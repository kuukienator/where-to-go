import react, { useState, useEffect, FC } from 'react';
import Loading from '../Loading';
import PlacesList, { PlaceEntry } from '../PlacesList';

export type Location = {
    longitude: number;
    latitude: number;
};

export type PlaceRequest = {
    location?: Location;
    address: string;
    type?: string;
    maxPriceLevel: number;
    minPriceLevel: number;
    keyword?: string;
    radius: number;
};

const transformToPlaces = (responsePlaces: any[]): PlaceEntry[] => {
    return responsePlaces.map((e) => ({
        geometry: e.geometry,
        id: e.place_id,
        image: e.image,
        vicinity: e.vicinity,
        rating: e.rating,
        name: e.name,
        priceLevel: e.price_level,
    }));
};

const fetchPlaces = async ({
    location,
    address,
    type,
    maxPriceLevel,
    minPriceLevel,
    keyword,
    radius,
}: PlaceRequest): Promise<PlaceEntry[]> => {
    const API_URL = '/api/places';

    // const response = await fetch(
    //     `${API_URL}?lat=${location.latitude}&long=${
    //         location.longitude
    //     }&maxPrice=${maxPriceLevel}&minPrice=${minPriceLevel}&types=${types.join(
    //         ','
    //     )}&keyword=${keyword || ''}`
    // );

    const response = await fetch(
        `${API_URL}?maxPrice=${maxPriceLevel}&minPrice=${minPriceLevel}&type=${type}&radius=${radius}&adress=${address}&keyword=${
            keyword || ''
        }`
    );
    const { places } = await response.json();

    return transformToPlaces(places);
};

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

type Props = {
    placeRequest: PlaceRequest;
};

const Search: FC<Props> = ({ placeRequest }) => {
    const [places, setPlaces] = useState<PlaceEntry[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);

    const getPlaces = async (placeRequest: PlaceRequest) => {
        console.log('placeRequest', placeRequest);
        setLoading(true);
        const places = await fetchPlaces(placeRequest);
        setPlaces(places);
        setLoading(false);
    };

    useEffect(() => {
        getPlaces(placeRequest);
    }, [placeRequest]);

    if (loading) {
        return <Loading />;
    }

    if (!places || places.length === 0) {
        return <div>Nothing found</div>;
    }

    return <PlacesList places={places} />;
};

export default Search;
