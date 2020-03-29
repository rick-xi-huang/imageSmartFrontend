import React, { Component } from 'react';
import ImageList from "./ImageList";
import UploadImage from "./UploadImage";

class ImageView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploading: false,
            images: this.props.user.images,
            transformation: {}
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

        fetch("http://localhost:3001/image-upload", {
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
        fetch("http://localhost:3001/image-delete?id=" + id, {
            method: 'DELETE',
        })
            .then(() =>
                this.setState({
                    images: this.state.images.filter(image => image.public_id !== id)
                })
            )
    };

    detectFace = image => {
        fetch("http://localhost:3001/face-detection?url=" + image.url, {
            method: 'GET',
        })
            .then((response) => {
                    return response.json();
                })
            .then((response) => {
                  this.setState({transformation: {
                          ...this.state.transformation,
                          [image.public_id]: response
                      }});
            })
            .catch((err) => {
            console.log(err);
        })
    };

    detectObject = image => {
        fetch("http://localhost:3001/object-detection?url=" + image.url, {
            method: 'GET',
        })
            .then((response) => {
                    return response.json()
                })
            .then((response) => {
                this.setState({transformation: {
                        ...this.state.transformation,
                        [image.public_id]: response
                    }});
            })
            .catch((err) => {
                console.log(err);
            })
    };

    detectLandmark = image => {
        fetch("http://localhost:3001/landmark-detection?url=" + image.url, {
            method: 'GET',
        })
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({transformation: {
                        ...this.state.transformation,
                        [image.public_id]: response
                    }});
            })
            .catch((err) => {
                console.log(err);
            })
    };

    render() {
        const { uploading, images, transformation } = this.state;

        return (
            <div>
                <div>
                    <ImageList
                        images={images}
                        removeImage={this.removeImage}
                        detectFace={this.detectFace}
                        detectObject={this.detectObject}
                        detectLandmark={this.detectLandmark}
                        transformation={transformation}
                    />
                    <UploadImage uploadImage={this.uploadImage} uploading={uploading} />
                </div>
            </div>
        )
    }
}

export default ImageView;