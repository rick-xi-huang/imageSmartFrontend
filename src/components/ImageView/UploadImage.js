import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faImages, faImage} from '@fortawesome/free-solid-svg-icons'

const UploadImage = ({uploadImage}) => {
    return (
        <div className='buttons fadein'>
            <div className='button'>
                <label htmlFor='single'>
                    <FontAwesomeIcon icon={faImage} color='#3B5998' size='10x'/>
                </label>
                <input type='file' id='single' onChange={uploadImage}/>
            </div>

            <div className='button'>
                <label htmlFor='multi'>
                    <FontAwesomeIcon icon={faImages} color='#6d84b4' size='10x'/>
                </label>
                <input type='file' id='multi' onChange={uploadImage} multiple/>
            </div>
        </div>
    )
};

export default UploadImage;
