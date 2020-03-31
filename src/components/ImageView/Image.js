import React from 'react'
import './Image.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {faSmileBeam} from '@fortawesome/free-solid-svg-icons'
import {faCameraRetro} from '@fortawesome/free-solid-svg-icons'
import {faLandmark} from '@fortawesome/free-solid-svg-icons'

const Image = ({image, removeImage, detectFace, detectObject, detectLandmark, transformation}) => {

    let textCard, objectBoxes, display = [];

    if (transformation[image.public_id]) {
        transformation[image.public_id].forEach((object, i) => {
            if (object.name) {
                display.push(
                    <p key={i}>{
                        " Object " + (i + 1) + "\n" +
                        object.name + "   " + object.score.toFixed(2)
                    }
                    </p>);
            } else if (object.joyLikelihood) {
                display.push(
                    <p key={i}> {" Face " + (i + 1) + "\n" +
                    " Joy: " + object.joyLikelihood +
                    " Anger: " + object.angerLikelihood +
                    " Sorrow: " + object.sorrowLikelihood +
                    " Surprise: " + object.surpriseLikelihood
                    }
                    </p>
                )
            } else if (object.description) {
                display.push(<p key={i}> {object.description + "    " + object.score.toFixed(2)} </p>)
            }
        });
        textCard = <article className="center mw5 mw6-ns hidden ba mv4">
            <h1 className="f4 bg-near-black white mv0 pv2 ph3">From your AI friend</h1>
            <div className="pa3 bt">
                <div className="f6 f5-ns lh-copy measure mv0">
                    {/*{JSON.stringify(display)}*/}
                    {display}
                </div>
            </div>
        </article>;
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
                     }}></div>
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
                     }}></div>
            )
        });
        objectBoxes = boxes;
    } else {
        textCard = <div/>;
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
            {textCard}
        </div>
    )
};

export default Image;