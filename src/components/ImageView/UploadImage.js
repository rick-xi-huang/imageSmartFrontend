import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faImages} from '@fortawesome/free-solid-svg-icons'
import {faUpload} from '@fortawesome/free-solid-svg-icons'
import Spinner from "./Spinner";
import './UploadImage.css'

const UploadImage = ({uploadImage, uploading}) => {
    return (
            // <div className='button'>
            //     <label htmlFor='single'>
            //         <FontAwesomeIcon icon={faImage} color='#3B5998' size='10x'/>
            //     </label>
            //     <input type='file' id='single' onChange={uploadImage}/>
            // </div>
        <div>
        { uploading === true
           ? <Spinner />
           : <div>
             <input type='file' id='multi' className='inputfile' onChange={uploadImage} multiple/>
              <label htmlFor='multi' className='label'>
                  <FontAwesomeIcon icon={faImages} color='#6d84b4' size='10x' className='pv3'/>
                  <FontAwesomeIcon icon={faUpload} color='#6d84b4' size='10x' className='pv3'/>
              </label>
             </div>
        }
        </div>
    )
};

export default UploadImage;

