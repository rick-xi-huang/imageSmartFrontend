import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Signin from "./components/Signin/signin";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Upload from "./components/Upload/Upload";
import './App.css';


const initialState = {
    input: '',
    imageUrl: '',
    route: 'init',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
    }
};


class App extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    onInputChange = (event) => {
        console.log(event["target"]["value"]);
        this.setState({input: event["target"]["value"]});
    };

    onButtonSubmit = () => {
        console.log("submitted");
        this.setState({imageUrl: this.state.input});
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
        const {isSignedIn, route} = this.state;
        if(route === "init" ){
            return (
                <div className="App">
                <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange} />
                </div>
            )
        }else if(route === "signin"){
           return (
               <div className="App">
                   <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange} />
                   <Signin onRouteChange = {this.onRouteChange} />
               </div>
           )
        }else if(route === "register"){
            return (
                <div className="App">
                    <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange} />
                    <Register onRouteChange = {this.onRouteChange} />
                </div>
            )
        }else if(route === "home"){
            return (
            <div className="App">
                <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange} />
                <Upload />
            </div>
            )
        }
    }
}

export default App;
