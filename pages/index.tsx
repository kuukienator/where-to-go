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
            {/* <Search /> */}
            <div className="textForm">
                <div className="textContainer">
                    I'm looking for a <span className="textInput">bar</span>{' '}
                    near <span className="textInput">Immermannstr. 40</span>. It
                    should be <span className="textInput">cozy</span> and{' '}
                    <span className="textInput">affordable</span>.
                </div>
                <button className="textButton">Find me a place ⇒</button>
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
                margin: 1rem;
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
                border: none;
                background: black;
                color:white;
                border-radius: 0.5rem;
                padding: 1rem 1.5rem;
                font-size: 1.3rem;
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
                font-size: 2.2rem;
                margin: 1.75rem 0.5rem;
                text-align: center;
            }

            header {
                font-family: 'Bitter', serif;

                border-bottom: 2px solid var(--primary-color);
                color: var(--primary-color);
                /* border-bottom: 2px solid var(--primary-color);*/
                /* color: var(--primary-color); */
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
