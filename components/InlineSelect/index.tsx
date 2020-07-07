import react, {
    useState,
    useEffect,
    FunctionComponent,
    ChangeEvent,
} from 'react';

type Props = {
    values: string[];
    selected?: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    inverse?: boolean;
};

const InlineSelect: FunctionComponent<Props> = ({
    values,
    onChange,
    selected,
    inverse,
}) => {
    return (
        <>
            <select
                className={inverse ? 'inverse' : ''}
                value={!!selected ? selected : values[0]}
                onChange={onChange}
            >
                {values.map((v) => (
                    <option value={v} key={v}>
                        {v}
                    </option>
                ))}
            </select>
            <style jsx>{`
                select {
                    font-size: inherit;
                    border: none;
                    background: none;
                    font-family: inherit;
                    font-weight: bold;
                    border-bottom: 0.4rem solid;
                }

                .inverse {
                    background: black;
                    color: white;
                }
            `}</style>
        </>
    );
};

export default InlineSelect;
