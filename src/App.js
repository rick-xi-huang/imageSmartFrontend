import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import ImageView from "./components/ImageView/ImageView";
import Banner from "./components/Banner/Banner";
import './App.css';


const initialState = {
    route: 'init',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        joined: '',
    }
};

const particlesOptions = {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                joined: data.joined,
                images: data.images,
            }
        });
        this.setState({isSignedIn: true})
    };

    loadTrialUser = ( ) => {
        this.setState({
            user: {
                id: "test",
                name: "test",
                email: "test",
                joined: "test",
                images: [],
            }
        });
    };

    onRouteChange = (route) => {
        if (route === 'init') {
            this.setState(initialState)
        } else {
            this.setState({route: route});
        }
    };

    render() {
        const {isSignedIn, route, user} = this.state;

        return (
            <div className="App">
                <Particles className='particles'
                           params={particlesOptions}
                />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>

                {(route === "signin") &&
                <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                }
                {(route === "register") &&
                <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                }
                {(route === "home") &&
                <ImageView user={user}/>
                }
                {(route === "init") &&
                <Banner loadTrialUser={this.loadTrialUser} onRouteChange={this.onRouteChange}/>
                }
            </div>
        )
    }
}

export default App;
