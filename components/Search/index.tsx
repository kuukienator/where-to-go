import react, { useState, useEffect, FC } from 'react';
import Loading from '../Loading';
import PlacesList, { PlaceEntry } from '../PlacesList';
import NoResults from '../NewResults';

export const LOCATION_IDENTIFIER = '<GPS location>';
export const NO_TYPE_IDENTIFIER = 'anthing';
export const NO_KEYWORD_IDENTIFIER = '-';

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

    let url = `${API_URL}?maxPrice=${maxPriceLevel}&minPrice=${minPriceLevel}&radius=${radius}`;

    if (type !== NO_TYPE_IDENTIFIER) {
        url += `&type=${type}`;
    }

    if (keyword !== NO_KEYWORD_IDENTIFIER) {
        url += `&keyword=${keyword || ''}`;
    }

    if (location && address === LOCATION_IDENTIFIER) {
        url += `&lat=${location.latitude}&long=${location.longitude}`;
    } else {
        url += `&adress=${address}`;
    }

    const response = await fetch(url);
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
    openSearch: Function;
};

const Search: FC<Props> = ({ placeRequest, openSearch }) => {
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
        return <NoResults openSearch={openSearch} />;
    }

    return <PlacesList places={places} openSearch={openSearch} />;
};

export default Search;
