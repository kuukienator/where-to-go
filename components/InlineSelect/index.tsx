import React, {
    useState,
    useEffect,
    FunctionComponent,
    ChangeEvent,
} from 'react';

export type DropdownEntry = {
    value: string | number;
    label: string;
};

type Props = {
    entries: DropdownEntry[];
    selected?: DropdownEntry;
    onChange: (dropdownEntry: DropdownEntry) => void;
    inverse?: boolean;
};

const getEntryByValue = (entries: DropdownEntry[], value: string | number) =>
    entries.find((e) => e.value === value);

const InlineSelect: FunctionComponent<Props> = ({
    entries,
    onChange,
    selected,
    inverse,
}) => {
    return (
        <>
            <select
                className={inverse ? 'inverse' : ''}
                value={!!selected ? selected.value : entries[0].value}
                onChange={(event) =>
                    onChange(getEntryByValue(entries, event.target.value))
                }
            >
                {entries.map((entry) => (
                    <option value={entry.value} key={entry.value}>
                        {entry.label}
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
