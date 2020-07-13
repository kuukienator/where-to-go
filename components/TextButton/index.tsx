import React, { FC, Component } from 'react';

type Props = {
    onClick: (event) => void;
};

const TextButton: FC<Props> = ({ onClick, children }) => {
    return (
        <>
            <button className="textButton" onClick={onClick}>
                {children}
            </button>
            <style jsx>{`
                .textButton {
                    font-family: 'Bitter', serif;
                    font-family: 'Zilla Slab', serif;
                    border: none;
                    background: black;
                    color: white;
                    border-radius: 0.5rem;
                    padding: 1rem 1.5rem;
                    font-size: 1.6rem;
                    display: flex;
                    align-items: center;
                }
            `}</style>
        </>
    );
};

export default TextButton;
