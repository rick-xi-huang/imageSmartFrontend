import React, { Component } from 'react';
import Spinner from "./Spinner";
import Images from "./Images";
import Buttons from "./Buttons";

class Upload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploading: false,
            images: this.props.user.images,
        }
    }

    onChange = e => {
        const files = Array.from(e.target.files);
        this.setState({ uploading: true });

        const formData = new FormData();

        files.forEach((file, i) => {
            formData.append(i, file)
        });

        formData.append("email", this.props.user.email);

        this.setState({
            uploading: false,
        });

        fetch("http://localhost:3001/image-upload", {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(images => {
                this.setState({
                    uploading: false,
                    images: this.state.images.concat(images),
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
                default:
                    return (
                    <div>
                    <Images images={images} removeImage={this.removeImage} />;
                    <Buttons onChange={this.onChange} />
                    </div>
                    )
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