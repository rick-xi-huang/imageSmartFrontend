import React from 'react'
import './Image.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {faSmileBeam} from '@fortawesome/free-solid-svg-icons'
import {faCameraRetro} from '@fortawesome/free-solid-svg-icons'
import {faLandmark} from '@fortawesome/free-solid-svg-icons'
import Description from "./Description";

const Image = ({image, removeImage, detectFace, detectObject, detectLandmark, transformation}) => {

    let textCard, objectBoxes, display = [];

    if (transformation[image.public_id]) {
        let vertices = [];
        let verticesNomalized = [];
        transformation[image.public_id].forEach(object => {
            if (object.boundingPoly.normalizedVertices.length > 0) {
                verticesNomalized.push(object.boundingPoly.normalizedVertices);
            } else if (object.boundingPoly.vertices.length > 0) {
                vertices.push(object.boundingPoly.vertices);
            }
        });
        let boxes = [];
        let w = image.width;
        let h = image.height;
        verticesNomalized.forEach((vertice, index) => {
            boxes.push(
                <div key={index} className='bounding-box'
                     style={{
                         top: (vertice[1].y) * 100 + "%",
                         right: (1 - vertice[1].x) * 100 + "%",
                         bottom: (1 - vertice[3].y) * 100 + "%",
                         left: (vertice[3].x) * 100 + "%",
                     }}>{index + 1}</div>
            )
        });
        vertices.forEach((vertice, index) => {
            boxes.push(
                <div key={index} className='bounding-box'
                     style={{
                         top: (vertice[1].y / h) * 100 + "%",
                         right: (1 - vertice[1].x / w) * 100 + "%",
                         bottom: (1 - vertice[3].y / h) * 100 + "%",
                         left: (vertice[3].x / w) * 100 + "%",
                     }}>{index + 1}</div>
            )
        });
        objectBoxes = boxes;
    } else {
        // textCard = <div/>;
        objectBoxes = <div/>;
    }


    return (
        <div>

            <div className='container center'>
                <img className='image shadow-1' src={image.secure_url} alt=''/>

                {objectBoxes}

            </div>

                <div className="w-100 ph3 bg-transparent">

                    <div className="link bg-transparent hover-white inline-flex items-center ma2 tc br2 pa2 pointer"
                         onClick={() => detectFace(image)}
                    >
                        <FontAwesomeIcon icon={faSmileBeam} size='2x'/>
                        <span className="f6 ml3 pr2">Face</span>
                    </div>
                    <div className="link bg-transparent hover-white inline-flex items-center ma2 tc br2 pa2 pointer"
                         onClick={() => detectObject(image)}
                    >
                        <FontAwesomeIcon icon={faCameraRetro} size='2x'/>
                        <span className="f6 ml3 pr2">Object</span>
                    </div>
                    <div className="link bg-transparent hover-white inline-flex items-center ma2 tc br2 pa2 pointer"
                         onClick={() => detectLandmark(image)}
                    >
                        <FontAwesomeIcon icon={faLandmark} size='2x'/>
                        <span className="f6 ml3 pr2">Landmark</span>
                    </div>
                    <div className="link bg-transparent hover-white inline-flex items-center ma2 tc br2 pa2 pointer"
                        onClick={() => removeImage(image.public_id)}
                    >
                        <FontAwesomeIcon icon={faTrashAlt} size='2x'/>
                        <span className="f6 ml3 pr2">Delete</span>
                    </div>
                </div>
            <Description analysis={transformation[image.public_id]} />
        </div>
    )
};

export default Image;