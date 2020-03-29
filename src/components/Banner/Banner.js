import React from 'react'

const Banner = ({onRouteChange, loadTrialUser }) => {
    return(
        <article className="mw7 center ph3 ph5-ns tc br2 pv5 bg-transparent dark-gray mb5 top--1-m">
            <h1 className="fw6 f3 f2-ns lh-title mt0 mb3">
                This is ImageSmart, an image portfolio playground
            </h1>
            <h2 className="fw2 f3 lh-copy mt0 mb3">
                with latest machine learning models
            </h2>
            <p className="fw1 f3 mt0 mb3 b">
                Sign up to build your own image portfolio
            </p>
            <div>
                <div className="f4 br-pill bg-dark-blue no-underline washed-blue ba b--dark-blue grow pv2 ph3 dib mr3 pointer"
                     onClick={() => onRouteChange('register')}
                >
                    Sign Up
                </div>
                <div className="f4 br-pill dark-blue no-underline ba grow pv2 ph3 dib pointer"
                     onClick={() => { loadTrialUser();
                                      onRouteChange('home');
                                    }}
                >
                    Try It
                </div>
            </div>
        </article>

    )
};

export default Banner;