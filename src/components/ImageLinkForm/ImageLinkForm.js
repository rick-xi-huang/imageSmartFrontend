import React from "react";

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {

    return(
        <div>
            <input type="text" onChange={onInputChange} />
            <button onClick={onButtonSubmit}>Analyze</button>
        </div>
    );

};

export default ImageLinkForm;