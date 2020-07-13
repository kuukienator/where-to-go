import React, { useState, FC } from 'react';

const Loading = () => {
    return (
        <div className="laodingContainer">
            <span>Loading...</span>
            <span className="outerBar">
                <span className="innerBar"></span>
            </span>
            <style jsx>{`
                .laodingContainer {
                    font-family: 'Bitter', serif;
                    font-family: 'Zilla Slab', serif;
                    font-size: 4rem;
                    margin-top: 6rem;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }

                .outerBar {
                    width: 100%;
                    height: 0.5rem;
                    width: 17rem;
                    position: relative;
                }

                .innerBar {
                    height: 100%;
                    background: black;
                    width: 2rem;
                    position: absolute;
                    animation: bar infinite 1.5s ease-in-out;
                }

                @keyframes bar {
                    from {
                        transform: translate(0rem);
                    }

                    50% {
                        transform: translate(15rem);
                    }

                    to {
                        transform: translate(0rem);
                    }
                }
            `}</style>
        </div>
    );
};

export default Loading;
