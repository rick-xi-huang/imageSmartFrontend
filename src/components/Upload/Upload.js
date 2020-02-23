import React, { Component } from 'react';
import Spinner from "./Spinner";
import Images from "./Images";
import Buttons from "./Buttons";

class Upload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploading: false,
            images: []
        }
    }

    onChange = e => {
        const files = Array.from(e.target.files);
        this.setState({ uploading: true });

        const formData = new FormData();

        files.forEach((file, i) => {
            formData.append(i, file)
        });

        this.setState({
            uploading: false,
            images: files
        });

        fetch("http://localhost:3000/image-upload", {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(images => {
                this.setState({
                    uploading: false,
                    images: images,
                })
            })
    };

    removeImage = id => {
        this.setState({
            images: this.state.images.filter(image => image.public_id !== id)
        })
    };

    render() {
        const { uploading, images } = this.state;
        const content = () => {
            switch(true) {
                case uploading:
                    return <Spinner />;
                case images.length > 0:
                    return <Images images={images} removeImage={this.removeImage} />;
                default:
                    return <Buttons onChange={this.onChange} />
            }
        };

        return (
            <div>
                <div className='buttons'>
                    {content()}
                </div>
            </div>
        )
    }
}

export default Upload;