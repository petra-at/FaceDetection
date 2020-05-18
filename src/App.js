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

const initialState = {
    input:'',
    imageURL:'',
    box:{},
    route:'signin',
    signedIn:false,
    user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:''

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
        signedIn:false,
        user:{
            id:'',
            name:'',
            email:'',
            entries:0,
            joined:''

        }
      }
    }

    loadUser=(data)=>{
        this.setState({
            user:{
                id:data.id,
                name:data.username,
                email:data.email,
                entries:data.entries,
                joined:data.joined
            }
        })
     }

    calculateFaceLocation=(data)=>{
        const face = data.outputs[0].data.regions[0].region_info.bounding_box;    
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);

        return {
          topRow: face.top_row * height,
          leftCol: face.left_col * width,
          bottomRow: height - (face.bottom_row * height),
          rightCol: width - (face.right_col * width)
        }
      }
    
    displayFaceBox =(box)=>{
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
            fetch('https://face-detectionclarifai.herokuapp.com/imageurl',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    input:this.state.input
                })
            }).then(response=>response.json())
            .then(response => {
                if(response)
                {
                    fetch('https://face-detectionclarifai.herokuapp.com/image',{
                        method:'PUT',
                        headers:{'Content-Type':'application/json'},
                        body:JSON.stringify({
                            id:this.state.user.id
                        })
                    })
                    .then(response=>response.json())
                    .then(count=>{
                        this.setState(Object.assign(this.state.user,{entries:count}))
                    })
                    .catch(err=>console.log(err)); 
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err=>console.log("Error: ",err));
          }
      }
    
    
    onRouteChange = (route)=>{
          if(route==='signin'){
            this.setState(initialState); // when back out sign out clear state
          }
          else if(route==='home')
          {
            this.setState({signedIn:true}); 
          }
          this.setState({route:route}); 
      }
    
      render(){
       
      return (
        <div className="App">
          <Particles className='particles' params={particleOptions}/>
          <Navigation onRouteChange={this.onRouteChange} signIn={this.state.signedIn}/>
      {
        
        this.state.route ==='home' ?
        <div>
              <Logo  /> 
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm 
                onInputChange = {(this.onInputChange)} 
                onButtonSubmit={this.onSubmit}
              /> 
              <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/> 
        </div>
        :(
          this.state.route === 'signin'
          ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
        }  
      
        </div>
      );
    }
    }
    
    export default App;
