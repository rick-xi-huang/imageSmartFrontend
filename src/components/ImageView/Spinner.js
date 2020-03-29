import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Spinner = () => {
    return(
    <div className='spinner'>
        <FontAwesomeIcon icon={faSpinner} size='10x' color='#3B5998' className='fa-spin pv5'/>
    </div>
    )
};

export default Spinner;