import React, { FunctionComponent } from 'react';
import MoneyIcon from '../../svg-icons/iconmonstr-currency-6.svg';
import StarIcon from '../../svg-icons/iconmonstr-star-3.svg';

type Props = {
    name: string;
    vicinity: string;
    image: string;
    rating: number;
    priceLevel: number;
    mapsUrl: string;
};

type StarsProps = {
    stars: number;
    starsTotal: number;
};

type PriceLevelProps = {
    level: number;
};

const Stars: FunctionComponent<StarsProps> = ({ stars, starsTotal }) => {
    const starsList = Array(starsTotal)
        .fill('⭐')
        .map((s, i) => <span key={`star-${i}`}>{s}</span>);
    return (
        <div style={{ position: 'relative' }}>
            <div className="starsBase">{starsList}</div>
            <div className="starsOverlay">{starsList}</div>
            <style jsx>{`
                .starsBase {
                    filter: grayscale(1);
                }
                .starsOverlay {
                    position: absolute;
                    top: 0;
                    overflow: hidden;
                    width: ${(stars / starsTotal) * 100}%;
                    right: 0%;
                    transform: rotateY(180deg);
                }
            `}</style>
        </div>
    );
};

const PriceLevel: FunctionComponent<PriceLevelProps> = ({ level }) => (
    <div className="priceLevel">
        {Array(level)
            .fill('💰')
            .map((pl, i) => (
                <div key={`price-level-${i}`}>
                    <MoneyIcon fill="white" width="20" height="20" />
                </div>
            ))}
        <style jsx>{`
            .priceLevel {
                display: flex;
            }
            div {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 0.2rem;
            }
        `}</style>
    </div>
);

const PlaceCard: FunctionComponent<Props> = ({
    image,
    name,
    vicinity,
    priceLevel,
    rating,
    mapsUrl,
}) => {
    return (
        <a className="placeCard" href={mapsUrl}>
            <div className="image">
                {/* <div className="counters">
                    <Stars stars={Number(rating)} starsTotal={5} />
                    <PriceLevel level={priceLevel} />
                </div> */}
            </div>
            <div className="information">
                <div className="details">
                    <div className="name">{name}</div>
                    <div className="vicinity">{vicinity}</div>
                </div>
                <div className="inlineCounters">
                    <div>
                        <span>{rating}</span>
                        <StarIcon fill="black" width="18" height="18" />
                    </div>
                    <div>
                        <span>{priceLevel}</span>
                        <MoneyIcon fill="black" width="18" height="18" />
                    </div>
                </div>
            </div>

            <style jsx>{`
                .placeCard {
                    font-family: inherit;
                    margin: 0.5rem 1rem;
                    display: block;
                    text-decoration: none;
                    margin-bottom: 1.5rem;
                    color: black;
                    /* box-shadow: 0.5rem 0.5rem; */
                }

                .image {
                    background-image: url(${image});
                    width: 100%;
                    height: 250px;
                    height: 25vh;
                    position: relative;
                    background-size: cover;
                    background-repeat: no-repeat;
                }

                .information {
                    padding: 0.5rem;
                    background: black;
                    color: white;

                    display: flex;
                    justify-content: space-between;

                    background: white;
                    color: black;
                    border: 0.2rem solid black;
                    /* border-top: none; */
                }

                .name {
                    font-weight: bold;
                    font-size: 1.2rem;
                    margin-bottom: 0.5rem;
                }

                .vicinity {
                    font-family: 'Open Sans', sans-serif;
                }

                .inlineCounters {
                    font-size: 1.2rem;
                    display: flex;
                    flex-direction: column;
                    border-left: 0.2rem solid;
                }

                .inlineCounters > div {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 0.2rem;
                }

                .inlineCounters span {
                    margin: 0 1rem;
                    margin-right: 0.5rem;
                }

                .counters {
                    display: flex;
                    position: absolute;
                    bottom: 0;

                    position: absolute;
                    bottom: 0;
                    justify-content: space-between;
                    width: 100%;
                    padding: 0.3rem;
                    background-color: rgba(0, 0, 0, 0.5);
                    font-size: 1.2rem;
                }

                @media (min-width: 400px) {
                    .image {
                        height: 32vh;
                    }
                }
            `}</style>
        </a>
    );
};

export default PlaceCard;
