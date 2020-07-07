import Head from 'next/head';
import Search from '../components/Search';
import InlineSelect from '../components/InlineSelect';
import { useState } from 'react';
import InlineTextBox from '../components/InlineTextBox';

const Home = () => {
    const [type, setType] = useState('a bar');
    const [priceLevel, setPriceLevel] = useState('affordable');
    const [keywords, setKeywords] = useState('cozy');
    const [locationQuery, setLocationQuery] = useState('Immermannstr. 40');
    const [radius, setRadius] = useState('500m');

    return (
        <div className="container">
            <Head>
                <title>🍹🥙☕Where to go?</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Zilla+Slab:wght@400;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <header>
                <h1>Where to go?</h1>
            </header>
            <main>
                {/* <Search /> */}
                <div className="textForm">
                    <div className="textContainer">
                        I'm here
                        <InlineTextBox
                            onChange={(event) =>
                                setLocationQuery(event.target.value)
                            }
                            value={locationQuery}
                        />
                        .
                    </div>

                    <div className="textContainer">
                        I'm looking for{' '}
                        <InlineSelect
                            values={[
                                'anything',
                                'a bar',
                                'a cafe',
                                'a restaurant',
                            ]}
                            selected={type}
                            onChange={(event) => setType(event.target.value)}
                        />{' '}
                        within{' '}
                        <InlineSelect
                            values={['500m', '1000m', '1500m', '2000m']}
                            selected={radius}
                            onChange={(event) => setRadius(event.target.value)}
                        />{' '}
                        . It should be{' '}
                        <InlineSelect
                            values={[
                                'cheap',
                                'affordable',
                                'expensive',
                                'luxurious',
                            ]}
                            selected={priceLevel}
                            onChange={(event) =>
                                setPriceLevel(event.target.value)
                            }
                        />{' '}
                        and{' '}
                        <InlineSelect
                            values={[
                                'cozy',
                                'romantic',
                                'good for groups',
                                'upscale',
                                'have cocktails',
                            ]}
                            selected={keywords}
                            onChange={(event) =>
                                setKeywords(event.target.value)
                            }
                        />
                        .
                    </div>
                    <button className="textButton">Find me a place</button>
                </div>
            </main>
            {/* <footer>
        Built by{' '}
        <a
            href="https://twitter.com/kuukienator"
            target="_blank"
            rel="noopener"
        >
            @kuukienator
        </a>
    </footer> */}
            <style jsx>{`
        .textForm {
            font-family: 'Bitter', serif;
            font-family: 'Zilla Slab', serif;

            margin: 1rem;
            align-self: flex-start;
            margin-top: 3rem;
        }
        .textContainer {
            font-size: 2.5rem;
            margin-bottom: 2rem;
        }

        .textInput {
            font-weight: bold;
            text-decoration: underline;
        }

        .textButton {
            font-family: 'Bitter', serif;
            font-family: 'Zilla Slab', serif;
            border: none;
            background: black;
            color:white;
            border-radius: 0.5rem;
            padding: 1rem 1.5rem;
            font-size: 1.6rem;
        }

        main {
            flex-grow:2;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .container {
            display: flex;
            flex-direction: column;
            height 100vh;
        }

        h1 {
            margin: 0.3rem 0.5rem;
            font-size: 2.5rem;
            margin: 1.75rem 0.5rem;
            text-align: center;
        }

        header {
            font-family: 'Bitter', serif;
            font-family: 'Zilla Slab', serif;

            /* border-bottom: 2px solid var(--primary-color);*/
            /* color: var(--primary-color); */
            color: black;
        }

        footer {
            background: var(--primary-color);
            color: white;
            border-top: 2px solid white;
            text-align: center;
            padding: 0.3rem;
            font-size: 0.7rem;
            position: fixed;
            bottom: 0;
            width: 100%;
        }


        footer a {
            color: white;
        }
    `}</style>
            <style jsx global>{`
                :root {
                    --primary-color: #10375c;
                    --primary-color: #1b6ca8;
                    --background-color: white;
                    --tertiary-color: black;
                }

                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;

                    font-family: 'Open Sans', sans-serif;

                    background: white;
                    color: black;
                    font-size: 16px;
                }

                * {
                    box-sizing: border-box;
                }

                @media (max-width: 360px) {
                    html,
                    body {
                        font-size: 12px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Home;
