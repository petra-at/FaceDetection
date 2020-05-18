import React from 'react'
import Tilt from 'react-tilt';
import brain from './brain-64.png';
import './Logo.css'; 

const Logo=()=>{

    const wrapper = React.createRef();

    return(
        <div ref={wrapper} className = 'ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div  className="Tilt-inner"> <img style ={{paddingTop:'5px', marginTop:'20%'}} src={brain} alt="Logo"></img></div>
            </Tilt>
        </div>
    );

}

export default Logo; 