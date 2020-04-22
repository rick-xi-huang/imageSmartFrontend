import React, { Component } from 'react';
import ImageList from "./ImageList";
import UploadImage from "./UploadImage";

class ImageView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploading: false,
            images: this.props.user.images,
            transformations: {}
        }
    }

    uploadImage = e => {
        const files = Array.from(e.target.files);
        this.setState({ uploading: true });

        const formData = new FormData();

        files.forEach((file, i) => {
            formData.append(i, file)
        });

        formData.append("email", this.props.user.email);

        fetch("https://image-smart.herokuapp.com/image-upload", {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(images => {
                this.setState({
                    uploading: false,
                    images: this.state.images.concat(images),
                });
                this.setState({
                    uploading: false,
                });
            })
    };

    removeImage = id => {
        fetch("https://image-smart.herokuapp.com/image-delete?id=" + id, {
            method: 'DELETE',
        })
            .then(() =>
                this.setState({
                    images: this.state.images.filter(image => image.public_id !== id)
                })
            )
    };

    detectImage = (image,type) => {
        fetch(`https://image-smart.herokuapp.com/image-detection?url=${image.url}&type=${type}`, {
            method: 'GET',
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this.setState({transformations: {
                        ...this.state.transformations,
                        [image.public_id]: {content: response, type: type}
                    }});
            })
            .catch((err) => {
                console.log(err);
            })
    };

    render() {
        const { uploading, images, transformations } = this.state;

        return (
            <div>
                <div>
                    <ImageList
                        images={images}
                        removeImage={this.removeImage}
                        detectImage={this.detectImage}
                        transformations={transformations}
                    />
                    <UploadImage uploadImage={this.uploadImage} uploading={uploading} />
                </div>
            </div>
        )
    }
}

export default ImageView;