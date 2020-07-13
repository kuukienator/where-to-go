import React, {
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
    hideButton: boolean;
    placeholder?: string;
    isValid: boolean;
};

const InlineTextBox: FunctionComponent<Props> = ({
    onChange,
    value,
    onButtonClick,
    hideButton,
    placeholder,
    isValid,
}) => {
    return (
        <div className="container">
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {!hideButton && (
                <div className="iconContainer" onClick={onButtonClick}>
                    <LocationIcon fill="white" />
                </div>
            )}
            <style jsx>{`
                input {
                    font-size: inherit;
                    border: none;
                    background: none;
                    font-family: inherit;
                    font-weight: bold;
                    border-bottom: 0.4rem solid;
                    width: ${hideButton ? '100%' : '85%'};
                    border-color: ${isValid ? 'black' : 'red'};
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
