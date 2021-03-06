import React from 'react'
import Image from "./Image";
import {faBoxOpen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ImageList = ({images, removeImage, detectImage, transformations}) => {

    if(images.length > 0) {
        return (
            images.map((image, i) => {
                return (<Image
                        key={i}
                        detectImage={detectImage}
                        removeImage={removeImage}
                        image={image}
                        transformation={transformations[image.public_id]}
                    />
                );
            })

        )
    }else{
        return (<div>
                <FontAwesomeIcon icon={faBoxOpen} size='10x' className='pv5 dark-gray'/>
                <h1 className="mw7 center ph3 ph5-ns tc br2 bg-transparent dark-gray mb5">
                    You don't have any image, upload your image to begin
                </h1>
        </div>
        )
    }
};

export default ImageList;