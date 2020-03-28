import React from 'react'
import './Image.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {faSmileBeam} from '@fortawesome/free-solid-svg-icons'
import {faCameraRetro} from '@fortawesome/free-solid-svg-icons'

const Image = ({key, image, removeImage, detectFace, detectObject, transformation}) => {

    let textCard, objectBoxes, display = [];

    if(transformation[image.public_id]){
        transformation[image.public_id].forEach((object, i) => {
            if(object.name){
               display.push({
                   Object: i + 1,
                   [object.name]: object.score,
               });
            }
            else if(object.joyLikelihood){
               display.push({
                   Face: i + 1,
                   Joy: object.joyLikelihood,
                   Anger: object.angerLikelihood,
                   Sorrow: object.sorrowLikelihood,
                   Surprise: object.surpriseLikelihood,
               })
            }
        });
        textCard =  <article className="center mw5 mw6-ns hidden ba mv4">
            <h1 className="f4 bg-near-black white mv0 pv2 ph3">AI Detection</h1>
            <div className="pa3 bt">
                <p className="f6 f5-ns lh-copy measure mv0">
                    {JSON.stringify(display)}
                </p>
            </div>
        </article>;
        let vertices = []; let verticesNomalized = []
        transformation[image.public_id].forEach(object => {
            if (object.boundingPoly.normalizedVertices.length > 0) {
                verticesNomalized.push(object.boundingPoly.normalizedVertices);
            }else if(object.boundingPoly.vertices.length > 0) {
                vertices.push(object.boundingPoly.vertices);
            }
        });
        let boxes = [];
        let w = image.width; let h = image.height;
        for (const vertice of verticesNomalized) {
            boxes.push(
            <div className='bounding-box'
                 style={{top: (vertice[1].y) * 100 + "%",
                         right: (1 - vertice[1].x) * 100 + "%",
                         bottom: (1 - vertice[3].y) * 100 + "%",
                         left: (vertice[3].x) * 100 + "%",
                 }}></div>
            )
        }
        for (const vertice of vertices) {
            boxes.push(
                <div className='bounding-box'
                     style={{top: (vertice[1].y / h) * 100 + "%",
                         right: (1 - vertice[1].x / w) * 100 + "%",
                         bottom: (1 - vertice[3].y / h) * 100 + "%",
                         left: (vertice[3].x / w) * 100 + "%",
                     }}></div>
            )
        }
        objectBoxes = boxes;
    }else{
        textCard = <div/>
        objectBoxes = <div/>
    }



    return (
            <div key={key} className='fadein'>
                <div
                    onClick={() => removeImage(image.public_id)}
                    className='delete'
                >
                    <FontAwesomeIcon icon={faTimesCircle} size='2x'/>
                </div>
                <div className='container center'>
                <img className='image' src={image.secure_url} alt=''/>
                {objectBoxes}
                </div>
                <div
                    onClick={() => detectFace(image)}
                    className='ai'
                >
                    <FontAwesomeIcon icon={faSmileBeam} size='2x'/>
                </div>
                <div
                    onClick={() => detectObject(image)}
                    className='ai'
                >
                    <FontAwesomeIcon icon={faCameraRetro} size='2x'/>
                </div>
                {textCard}
            </div>
        )
};

export default Image;