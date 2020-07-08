import react, { useState, FC } from 'react';
import TextButton from '../TextButton';

type Props = {
    openSearch: Function;
};

const NoResults: FC<Props> = ({ openSearch }) => {
    return (
        <div className="noResults">
            <span>No places found :(</span>
            <TextButton onClick={() => openSearch()}>
                Try something else
            </TextButton>
            <style jsx>{`
                span {
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .noResults {
                    font-family: 'Bitter', serif;
                    font-family: 'Zilla Slab', serif;
                    font-size: 4rem;
                    height: 100%;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }
            `}</style>
        </div>
    );
};

export default NoResults;
