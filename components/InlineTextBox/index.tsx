import react, {
    useState,
    useEffect,
    FunctionComponent,
    ChangeEvent,
} from 'react';

type Props = {
    value?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const InlineTextBox: FunctionComponent<Props> = ({ onChange, value }) => {
    return (
        <>
            <input type="text" value={value} onChange={onChange} />
            <style jsx>{`
                input {
                    font-size: inherit;
                    border: none;
                    background: none;
                    font-family: inherit;
                    font-weight: bold;
                    border-bottom: 0.4rem solid;
                    width: 90%;
                }
            `}</style>
        </>
    );
};

export default InlineTextBox;
