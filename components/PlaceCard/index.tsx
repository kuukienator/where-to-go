import react, { FunctionComponent } from 'react';

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
    <div>
        {Array(level)
            .fill('💰')
            .map((pl, i) => (
                <span key={`price-level-${i}`}>{pl}</span>
            ))}
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
                <div className="counters">
                    <Stars stars={Number(rating)} starsTotal={5} />
                    <PriceLevel level={priceLevel} />
                </div>
            </div>
            <div className="details">
                <div className="name">{name}</div>
                <div>{vicinity}</div>
            </div>

            <style jsx>{`
                .placeCard {
                    font-family: inherit;
                    margin: 0.5rem 1rem;
                    display: block;
                    text-decoration: none;
                    margin-bottom: 1.5rem;
                    color: black;
                }

                .image {
                    background-image: url(${image});
                    width: 100%;
                    height: 250px;
                    height: 25vh;
                    position: relative;
                    background-size: cover;
                    background-repeat: no-repeat;

                    /*
                    border-top-left-radius: 1.5rem;
                    border-top-right-radius: 1.5rem;

                    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
                        0px 1px 1px 0px rgba(0, 0, 0, 0.14),
                        0px 1px 3px 0px rgba(0, 0, 0, 0.12);
                    */
                }

                .details {
                    padding: 0.5rem;
                    padding-bottom: 1rem;
                    background: black;
                    color: white;

                    /*
                    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
                        0px 1px 1px 0px rgba(0, 0, 0, 0.14),
                        0px 1px 3px 0px rgba(0, 0, 0, 0.12);

                    border-bottom-right-radius: 1.5rem;
                    border-bottom-left-radius: 1.5rem;
                    */
                }

                .name {
                    font-weight: bold;
                    font-size: 1.2rem;
                    margin-bottom: 0.5rem;
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
