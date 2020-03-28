import React from 'react'
import Image from "./Image";

const ImageList = ({images, removeImage, detectFace, detectObject, transformation}) => {

    if(images.length > 0) {
        return (
            images.map((image, i) => {
                return (<Image
                        key={i}
                        detectFace={detectFace}
                        detectObject={detectObject}
                        removeImage={removeImage}
                        image={image}
                        transformation={transformation}
                    />
                );
            })

        )
    }else{
        return (<div />)
    }
};

export default ImageList;