import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Upload from "./components/Upload/Upload";
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            input: '',
            imageUrl: '',
        }
    }

    onInputChange = (event) => {
        console.log(event["target"]["value"]);
        this.setState({input: event["target"]["value"]});
    };

    onButtonSubmit = () => {
        console.log("submitted");
        this.setState({imageUrl: this.state.input});
    };

    render() {
        return (
            <div className="App">
               <Navigation />
               {/*<Logo />*/}
               <ImageLinkForm
                   onInputChange = {this.onInputChange}
                   onButtonSubmit = {this.onButtonSubmit}
               />
               <Upload />
               {/*<ImageRecognition />*/}
            </div>
        );
    }
}

export default App;
