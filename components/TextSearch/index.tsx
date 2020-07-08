import react, { useState, FC } from 'react';
import InlineTextBox from '../InlineTextBox';
import InlineSelect, { DropdownEntry } from '../InlineSelect';
import {
    PlaceRequest,
    Location,
    LOCATION_IDENTIFIER,
    NO_TYPE_IDENTIFIER,
    NO_KEYWORD_IDENTIFIER,
} from '../Search';
import TextButton from '../TextButton';

type Props = {
    onSubmit: (placeRequest: PlaceRequest) => void;
};

const typeEntries: DropdownEntry[] = [
    { label: 'anything', value: NO_TYPE_IDENTIFIER },
    { label: 'a bar', value: 'bar' },
    { label: 'a cafe', value: 'cafe' },
    { label: 'a restaurant', value: 'restaurant' },
];

const radiusEntries: DropdownEntry[] = [
    { label: '500m', value: '500' },
    { label: '1000m', value: '1000' },
    { label: '1500m', value: '1500' },
    { label: '2000m', value: '2000' },
    { label: '3000m', value: '3000' },
];

const keywordsEntries: DropdownEntry[] = [
    { label: '-', value: NO_KEYWORD_IDENTIFIER },
    { label: 'cozy', value: 'cozy' },
    { label: 'romantic', value: 'romantic' },
    { label: 'good for groups', value: 'good for groups' },
    { label: 'have cocktails', value: 'have cocktails' },
    { label: 'upscale', value: 'upscale' },
    { label: 'hipster', value: 'hipster' },
    { label: 'vegan', value: 'vegan' },
    { label: 'vegetarian', value: 'vegetarian' },
    { label: 'trendy', value: 'trendy' },
    { label: 'popular', value: 'popular' },
];

const priceLevelEntries: DropdownEntry[] = [
    { label: 'cheap', value: '1' },
    { label: 'affordable', value: '2' },
    { label: 'expensive', value: '3' },
    { label: 'luxurious', value: '4' },
];

const getLocation = (): Promise<Location> =>
    new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((location) => {
            resolve({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        }, reject);
    });

const TextSearch: FC<Props> = ({ onSubmit }) => {
    const [type, setType] = useState<DropdownEntry>(typeEntries[1]);
    const [priceLevel, setPriceLevel] = useState<DropdownEntry>(
        priceLevelEntries[0]
    );
    const [keywords, setKeywords] = useState<DropdownEntry>(keywordsEntries[1]);
    const [locationQuery, setLocationQuery] = useState('Immermannstr. 40');
    const [location, setLocation] = useState<Location | null>(null);
    const [radius, setRadius] = useState<DropdownEntry>(radiusEntries[1]);

    const submitHandler = () => {
        const payload: PlaceRequest = {
            address: locationQuery,
            location,
            maxPriceLevel: Number(priceLevel.value),
            minPriceLevel: 1,
            type: type.value as string,
            keyword: keywords.value as string,
            radius: Number(radius.value),
        };

        onSubmit(payload);
    };

    const onLocationFinderClick = async () => {
        try {
            const location = await getLocation();
            console.log(location);
            setLocation(location);
            setLocationQuery(LOCATION_IDENTIFIER);
        } catch (e) {
            console.log('onLocationFinderClick', e);
            setLocation(null);
            setLocationQuery('');
        }
    };

    return (
        <>
            <div className="textForm">
                <div className="textContainer">
                    I'm here,
                    <InlineTextBox
                        onChange={(event) =>
                            setLocationQuery(event.target.value)
                        }
                        onButtonClick={onLocationFinderClick}
                        value={locationQuery}
                    />
                    {/* . */}
                </div>

                <div className="textContainer">
                    I'm looking for{' '}
                    <InlineSelect
                        entries={typeEntries}
                        selected={type}
                        onChange={(dropDownEntry) => setType(dropDownEntry)}
                    />{' '}
                    within{' '}
                    <InlineSelect
                        entries={radiusEntries}
                        selected={radius}
                        onChange={(dropDownEntry) => setRadius(dropDownEntry)}
                    />{' '}
                    . It should be{' '}
                    <InlineSelect
                        entries={priceLevelEntries}
                        selected={priceLevel}
                        onChange={(dropDownEntry) =>
                            setPriceLevel(dropDownEntry)
                        }
                    />{' '}
                    and{' '}
                    <InlineSelect
                        entries={keywordsEntries}
                        selected={keywords}
                        onChange={(dropDownEntry) => setKeywords(dropDownEntry)}
                    />
                    .
                </div>
                <TextButton onClick={submitHandler}>Find me a place</TextButton>
            </div>
            <style jsx>{`
                .textForm {
                    font-family: 'Bitter', serif;
                    font-family: 'Zilla Slab', serif;

                    margin: 1rem;
                    align-self: flex-start;
                    margin-top: 3rem;
                }
                .textContainer {
                    font-size: 2.5rem;
                    margin-bottom: 3.5rem;
                }

                .textInput {
                    font-weight: bold;
                    text-decoration: underline;
                }
            `}</style>
        </>
    );
};

export default TextSearch;
