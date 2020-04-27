import React from 'react'; 
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange,onButtonSubmit})=>{
return(
    <div>
        <p className='f3'>
            {`My brain will detect the faces in your pictures. Give it a try.`}
        </p>
        <div >
            <div className=' form center pa4 br3 shadow-5'>
                <form action ="#" className='center'>
                    <input className='fa4 pa2 w-70 center'
                        placeholder="Public image URL..."
                        type='tex' 
                        onChange={onInputChange}
                        required
                    />
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                        onClick={onButtonSubmit} 
                    >
                        Detect
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}

export default ImageLinkForm; 