import React, { useState } from 'react';

import InformationIcon from '../../svg-icons/iconmonstr-info-4.svg';
import CloseIcon from '../../svg-icons/iconmonstr-x-mark-7.svg';

const Information = () => {
    const [showInformation, toggleShowInformation] = useState(false);

    return (<div className="informationContainer">
        <div className="icon" onClick={() => toggleShowInformation(!showInformation)}>
            <InformationIcon fill="white" width="30" height="30"/>
        </div>
        {showInformation && (
            <div className="informtionOverlay" onClick={() => toggleShowInformation(!showInformation)}>
                <div className="information">
                    <div className="icon" onClick={() => toggleShowInformation(!showInformation)}>
                        <CloseIcon fill="white" width="30" height="30"/>
                    </div>
                    <h2>Information</h2>
                    <p>Built by Emmanuel Meinike.</p>
                    <p>Powered by Google Maps Places API.</p>
                    <p><a href="https://twitter.com/kuukienator" target="_blank" rel="noopener">@kuukienator</a></p>
                    <p><a href="https://github.com/kuukienator/where-to-go" target="_blank" rel="noopener">Source</a></p>
                    <p>© 2021</p>
                </div>
            </div>
        )}
        <style jsx>{`
            .icon {
                position: absolute;
                top: 0;
                right: 0;
                padding: 0.5em;
                display: flex;
                background: black;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }

            .informtionOverlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgb(0 0 0 / 90%);
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .information {
                position: relative;
                text-align: center;
                background: white;
                color: black;
                padding: 2em;
            }
            `}</style>
    </div>)
}

export default Information;