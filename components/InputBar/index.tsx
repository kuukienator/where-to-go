import react, { useState, useEffect, FunctionComponent } from 'react';

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
};

type Props = {
    searchHandler: Function;
};

const KEYWORDS = [
    'cozy',
    'cheap spots',
    'romantic',
    'good for groups',
    'upscale drinks',
    'cocktails bars',
];

const MIN_PRICE = 1;
const MAX_PRICE = 4;

const getLocation = (): Promise<Location> =>
    new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((location) => {
            resolve({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        }, reject);
    });

const SearchSummary = ({ locationQuery, type, keyword }) => {
    return (
        <div className="searchSummary">
            Searching for <b>{type === '' ? 'Everything' : type}</b>
            {keyword === '' ? (
                ''
            ) : (
                <span>
                    {' '}
                    that are <b>{keyword}</b>
                </span>
            )}{' '}
            in <b>{locationQuery}.</b>
            <style jsx>{`
                .searchSummary {
                    text-align: center;
                }
            `}</style>
        </div>
    );
};

const InputBar: FunctionComponent<Props> = ({ searchHandler }) => {
    const [locationQuery, setLocationQuery] = useState('');
    const [minPriceLevel, setMinPriceLevel] = useState(MIN_PRICE);
    const [maxPriceLevel, setMaxPriceLevel] = useState(MAX_PRICE);
    const [type, setType] = useState('');
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState(null);
    const [userRejectedLocation, setUserRejectedLocation] = useState(false);
    const [isCollapsed, toggleCollased] = useState(false);

    /*
    useEffect(() => {
        const init = async () => {
            try {
                const userLocation = await getLocation();
                setLocation(userLocation);
            } catch (error) {
                console.log(error);
                setUserRejectedLocation(true);
            }
        };

        init();
    }, []);
    */

    const onClickHandler = () => {
        const payload: PlaceRequest = {
            address: locationQuery,
            maxPriceLevel,
            minPriceLevel,
            type,
            keyword,
        };

        if (!payload.address || payload.address === '') {
            console.log('Please provide some address');
            alert('Please provide some address');
            return;
        }

        toggleCollased(true);

        searchHandler(payload);
    };

    return (
        <div className="inputBar">
            {!isCollapsed && (
                <>
                    <div className="inputRow">
                        <label htmlFor="location">Location:</label>
                        <input
                            name="location"
                            type="text"
                            placeholder="Address, City, ..."
                            value={locationQuery}
                            onChange={(event) =>
                                setLocationQuery(event.target.value)
                            }
                        />
                    </div>
                    <div className="inputRow">
                        {/* <label htmlFor="typeBar">Type</label> */}
                        <div id="typeBar" className="typeRow">
                            <div>
                                <input
                                    type="radio"
                                    name="type"
                                    id="all"
                                    checked={type === ''}
                                    onChange={(event) => setType('')}
                                />
                                <label htmlFor="all">All</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="type"
                                    id="restaurant"
                                    value="restaurant"
                                    checked={type === 'restaurant'}
                                    onChange={(event) =>
                                        setType(event.target.value)
                                    }
                                />
                                <label htmlFor="restaurant">Restaurants</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="type"
                                    id="bar"
                                    value="bar"
                                    checked={type === 'bar'}
                                    onChange={(event) =>
                                        setType(event.target.value)
                                    }
                                />
                                <label htmlFor="bar">Bars</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="type"
                                    id="cafe"
                                    value="cafe"
                                    checked={type === 'cafe'}
                                    onChange={(event) =>
                                        setType(event.target.value)
                                    }
                                />
                                <label htmlFor="cafe">Cafes</label>
                            </div>
                        </div>
                    </div>
                    <div className="inputRow">
                        <label htmlFor="moreFilters">Keywords:</label>
                        <select
                            value={keyword}
                            onChange={(event) => setKeyword(event.target.value)}
                        >
                            <option value="">none</option>
                            {KEYWORDS.map((e) => (
                                <option key={e} value={e}>
                                    {e}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="inputRow">
                        <div className="inlineSelect">
                            <label htmlFor="minPriceLevel">Min Price:</label>
                            <select
                                name="minPriceLevel"
                                id="minPriceLevel"
                                value={minPriceLevel}
                                onChange={(event) =>
                                    setMinPriceLevel(Number(event.target.value))
                                }
                            >
                                {Array(MAX_PRICE)
                                    .fill(0)
                                    .map((e, i) => (
                                        <option value={i + 1}>{i + 1}</option>
                                    ))}
                            </select>
                        </div>
                        <div className="inlineSelect">
                            <label htmlFor="maxPriceLevel">Max Price:</label>
                            <select
                                name="maxPriceLevel"
                                id="maxPriceLevel"
                                value={maxPriceLevel}
                                onChange={(event) =>
                                    setMaxPriceLevel(Number(event.target.value))
                                }
                            >
                                {Array(MAX_PRICE)
                                    .fill(0)
                                    .map((e, i) => (
                                        <option value={i + 1}>{i + 1}</option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    <div className="buttonBar">
                        <button type="button" onClick={onClickHandler}>
                            Search
                        </button>
                    </div>
                </>
            )}

            {isCollapsed && (
                <>
                    <SearchSummary
                        keyword={keyword}
                        locationQuery={locationQuery}
                        type={type}
                    />
                    <div className="buttonBar">
                        <button
                            type="button"
                            onClick={() => toggleCollased(false)}
                        >
                            Modify search
                        </button>
                    </div>
                </>
            )}

            <style jsx>{`
                input,
                select {
                    border-color: var(--primary-color);
                    border-radius: 5px;
                    background: white;
                }

                .inputBar {
                    max-width: 360px;
                    margin: 0 auto;
                    padding: 0.5rem;
                }
                .typeRow {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                }

                .inputRow {
                    display: flex;
                    justify-content: space-between;
                    font-size: 1.1rem;
                    padding: 0.2rem 0;
                }

                .buttonBar {
                    display: flex;
                    justify-content: center;
                    margin-top: 0.5rem;
                }

                button {
                    min-width: 8rem;
                    padding: 0.4rem;
                    background: var(--primary-color);
                    border: none;
                    border-radius: 1rem;
                    color: white;
                    font-family: 'Bitter', serif;
                    font-size: 1rem;
                    font-weight: bold;
                }

                .inlineSelect {
                    display: flex;
                }

                .inlineSelect > label,
                .inputRow > label {
                    margin-right: 0.5rem;
                }

                .inputRow > input,
                .inputRow > select {
                    flex-grow: 1;
                }

                .inlineSelect > select {
                    width: 2.5rem;
                    flex-grow: 1;
                }

                .searchSummary {
                    text-align: center;
                }
            `}</style>
        </div>
    );
};

export default InputBar;
