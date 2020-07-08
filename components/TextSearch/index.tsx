import react, { useState, FC } from 'react';
import InlineTextBox from '../InlineTextBox';
import InlineSelect, { DropdownEntry } from '../InlineSelect';
import { PlaceRequest } from '../Search';

type Props = {
    onSubmit: (placeRequest: PlaceRequest) => void;
};

const typeEntries: DropdownEntry[] = [
    { label: 'anything', value: 'anything' },
    { label: 'a bar', value: 'bar' },
    { label: 'a cafe', value: 'cafe' },
    { label: 'a restaurant', value: 'restaurant' },
];

const radiusEntries: DropdownEntry[] = [
    { label: '500m', value: 500 },
    { label: '1000m', value: 1000 },
    { label: '1500m', value: 1500 },
    { label: '2000m', value: 2000 },
];

const keywordsEntries: DropdownEntry[] = [
    { label: 'cozy', value: 'cozy' },
    { label: 'romantic', value: 'romantic' },
    { label: 'good for groups', value: 'good for groups' },
    { label: 'have cocktails', value: 'have cocktails' },
    { label: 'upscale', value: 'upscale' },
];

const priceLevelEntries: DropdownEntry[] = [
    { label: 'cheap', value: 1 },
    { label: 'affordable', value: 2 },
    { label: 'expensive', value: 3 },
    { label: 'luxurious', value: 4 },
];

const TextSearch: FC<Props> = ({ onSubmit }) => {
    const [type, setType] = useState<DropdownEntry>(typeEntries[1]);
    const [priceLevel, setPriceLevel] = useState<DropdownEntry>(
        priceLevelEntries[0]
    );
    const [keywords, setKeywords] = useState<DropdownEntry>(keywordsEntries[0]);
    const [locationQuery, setLocationQuery] = useState('Immermannstr. 40');
    const [radius, setRadius] = useState<DropdownEntry>(radiusEntries[0]);

    const submitHandler = () => {
        const payload: PlaceRequest = {
            address: locationQuery,
            maxPriceLevel: Number(priceLevel.value),
            minPriceLevel: 1,
            type: type.value as string,
            keyword: keywords.value as string,
            radius: Number(radius.value),
        };

        onSubmit(payload);
    };

    return (
        <>
            <div className="textForm">
                <div className="textContainer">
                    I'm here
                    <InlineTextBox
                        onChange={(event) =>
                            setLocationQuery(event.target.value)
                        }
                        value={locationQuery}
                    />
                    .
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
                <button className="textButton" onClick={submitHandler}>
                    Find me a place
                </button>
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
                    margin-bottom: 2rem;
                }

                .textInput {
                    font-weight: bold;
                    text-decoration: underline;
                }

                .textButton {
                    font-family: 'Bitter', serif;
                    font-family: 'Zilla Slab', serif;
                    border: none;
                    background: black;
                    color: white;
                    border-radius: 0.5rem;
                    padding: 1rem 1.5rem;
                    font-size: 1.6rem;
                }
            `}</style>
        </>
    );
};

export default TextSearch;
