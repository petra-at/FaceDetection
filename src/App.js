import React,{Component} from 'react';
import './App.css';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '8c54afad31114b6685d9c07aa6bc17e7'
 });

const particleOptions={
  particles: {
    number:{
      value:30,
    },
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
}

class App extends Component {
  constructor()
  {
    super();
    this.state ={
      input:'',
      imageURL:'',
      box:{},
      route:'signin',
      signedIn:false
    }
  }

  calculateFaceLocation=(data)=>{
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log('face = ',face);
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log('h,w =',height,width);
    
    return {
      topRow: face.top_row* height,
      leftCol: face.left_col * width,
      bottomRow: height - (face.bottom_row * height),
      rightCol: width - (face.right_col * width)
    }
  }

  displayFaceBox =(box)=>{
    console.log('adjusted face',box);
    this.setState({box:box})
  }

    onInputChange =(event)=>{
      this.setState({input:event.target.value});
    }

    onSubmit = ()=>
    {
      this.setState({imageURL: this.state.input});
   
      if(this.state.input)
      {
        app.models.predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
        .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err=>console.log("Error: ",err));
      }
    }

    onRouteChange = (route)=>{
      this.setState({route:route }); 
      if(route==='signin'){
        this.setState({signedIn:false}); 
      }
      else if(route==='home')
      {
        this.setState({signedIn:true}); 
      }
    }

  render(){
  
  return (
    <div className="App">
      <Particles className='particles' params={particleOptions}/>
      <Navigation onRouteChange={this.onRouteChange} signIn={this.state.signedIn}/>
  {
    
    this.state.route ==='home' ?
    <div>
          <Logo /> 
          <Rank/>
          <ImageLinkForm 
            onInputChange = {(this.onInputChange)} 
            onButtonSubmit={this.onSubmit}
          /> 
          <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/> 
    </div>
    :(
      this.state.route === 'signin'
      ? <SignIn onRouteChange={this.onRouteChange}/> 
      : <Register onRouteChange={this.onRouteChange}/>
    )
    }  
  
    </div>
  );
}
}

export default App;
