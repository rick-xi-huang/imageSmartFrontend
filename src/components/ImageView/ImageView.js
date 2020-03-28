import React, { Component } from 'react';
import Spinner from "./Spinner";
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
        fetch("http://localhost:3001/image-delete" + "?id=" + id, {
            method: 'DELETE',
        })
            .then(() =>
                this.setState({
                    images: this.state.images.filter(image => image.public_id !== id)
                })
            )
    };

    detectFace = image => {
        fetch("http://localhost:3001/face-detection" + "?url=" + image.url, {
            method: 'GET',
        })
            .then((response) => {
                    return response.json();
                })
            .then((response) => {
                  console.log(response[0].boundingPoly.vertices);
                 console.log(response[1].boundingPoly.vertices);
                 console.log(response[2].boundingPoly.vertices);
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
        fetch("http://localhost:3001/object-detection" + "?url=" + image.url, {
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
                <div className='buttons'>
                    <ImageList
                        images={images}
                        removeImage={this.removeImage}
                        detectFace={this.detectFace}
                        detectObject={this.detectObject}
                        transformation={transformation}
                    />
                    <UploadImage uploadImage={this.uploadImage} />
                </div>
            </div>
        )
    }
}

export default ImageView;