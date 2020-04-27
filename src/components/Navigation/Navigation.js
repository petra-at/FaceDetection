import React from 'react'

const Navigation =({signIn, onRouteChange})=>{

    return (
        <nav style={{display: 'flex',justifyContent: 'flex-end'}}>
           { signIn === true ? <p onClick={()=>onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign out</p>:''}
        </nav>
    );
}

export default Navigation; 