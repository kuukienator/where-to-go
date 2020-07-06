import Head from 'next/head';
import Search from '../components/Search';

const Home = () => (
    <div className="container">
        <Head>
            <title>🍹🥙☕Where to go?</title>
            <link rel="icon" href="/favicon.ico" />
            <link
                href="https://fonts.googleapis.com/css2?family=Bitter:wght@400,700&family=Open+Sans:wght@400;700&display=swap"
                rel="stylesheet"
            />
        </Head>
        <header>
            <h1>Where to go?</h1>
        </header>
        <main>
            <Search />
        </main>
        <footer>
            Built by{' '}
            <a
                href="https://twitter.com/kuukienator"
                target="_blank"
                rel="noopener"
            >
                @kuukienator
            </a>
        </footer>
        <style jsx>{`
            .container {
                display: flex;
                flex-direction: column;
            }

            h1 {
                margin: 0.3rem 0.5rem;
                text-align: center;
            }

            header {
                font-family: 'Bitter', serif;

                border-bottom: 2px solid var(--primary-color);
                color: var(--primary-color);
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
                font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                    Helvetica Neue, sans-serif;

                font-family: 'Open Sans', sans-serif;

                background: white;
                color: black;
            }

            * {
                box-sizing: border-box;
            }
        `}</style>
    </div>
);

export default Home;
