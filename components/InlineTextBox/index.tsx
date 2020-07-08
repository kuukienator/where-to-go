import react, {
    useState,
    useEffect,
    FunctionComponent,
    ChangeEvent,
} from 'react';

import LocationIcon from '../../svg-icons/iconmonstr-location-2.svg';

type Props = {
    value?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onButtonClick: (event) => void;
};

const InlineTextBox: FunctionComponent<Props> = ({
    onChange,
    value,
    onButtonClick,
}) => {
    return (
        <div className="container">
            <input type="text" value={value} onChange={onChange} />
            <div className="iconContainer" onClick={onButtonClick}>
                <LocationIcon fill="white" />
            </div>
            <style jsx>{`
                input {
                    font-size: inherit;
                    border: none;
                    background: none;
                    font-family: inherit;
                    font-weight: bold;
                    border-bottom: 0.4rem solid;
                    width: 85%;
                }
                .container {
                    display: flex;
                }
                .iconContainer {
                    display: flex;
                    width: 14%;
                    background: black;
                    justify-content: center;
                    align-items: center;
                }
            `}</style>
        </div>
    );
};

export default InlineTextBox;
