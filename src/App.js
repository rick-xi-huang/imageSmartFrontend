import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Upload from "./components/Upload/Upload";
import './App.css';


const initialState = {
    route: 'init',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        joined:'',
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
        this.setState({user: {
                id: data.id,
                name: data.name,
                email: data.email,
                joined: data.joined,
                images: data.images,
            }})
    };

    onRouteChange = (route) => {
        if (route === 'init') {
            this.setState(initialState)
        } else if (route === 'home') {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    };

    render() {
        const {isSignedIn, route, user} = this.state;

        if(route === "signin"){
           return (
               <div className="App">
                   <Particles className='particles'
                              params={particlesOptions}
                   />
                   <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange} />
                   <Signin loadUser={this.loadUser} onRouteChange = {this.onRouteChange} />
               </div>
           )
        }
        else if(route === "register"){
            return (
                <div className="App">
                    <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange} />
                    <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange} />
                </div>
            )
        }
        else if(route === "home"){
            return (
            <div className="App">
                <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange} />
                <Upload user = {user} />
            </div>
            )
        }
        else{
            return (
                <div className="App">
                    <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange} />
                </div>
            )
        }
    }
}

export default App;
