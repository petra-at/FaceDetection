import React from 'react';
import defaultImage from  "../../img/placeholder-icon.png"; 
import './FaceRecognition.css'; 

const FaceRecognition = ({imageURL,box})=>{
return (
    <div className='center'>
        <img id ="inputImage" className= "center" src={imageURL||defaultImage} alt="Users inputted picture" />
        <div className='bounding-box' 
            style={
                {
                     top:box.topRow,
                     right:box.rightCol,
                     bottom:box.bottomRow,
                     left:box.leftCol
                }
            }>
        </div>
    </div>
);
}

export default FaceRecognition;