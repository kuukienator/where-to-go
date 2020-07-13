import React, { useState, FC } from 'react';
import TextButton from '../TextButton';
import SearchIcon from '../../svg-icons/iconmonstr-magnifier-6.svg';

type Props = {
    openSearch: Function;
};

const NoResults: FC<Props> = ({ openSearch }) => {
    return (
        <div className="noResults">
            <span>No places found :(</span>
            <TextButton onClick={() => openSearch()}>
                Try something else
                <SearchIcon
                    fill="white"
                    style={{
                        width: '1.6rem',
                        height: '1.6rem',
                        marginLeft: '0.5rem',
                    }}
                />
            </TextButton>
            <style jsx>{`
                span {
                    text-align: center;
                    margin-bottom: 4rem;
                }

                .noResults {
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
            `}</style>
        </div>
    );
};

export default NoResults;
