import React, { Component } from 'react'
import {Button} from '@sebgroup/react-components/dist/Button'
import {Notification} from "@sebgroup/react-components/dist/Notification"
import {Link} from 'react-router-dom'
import NavBar from './NavBar'
import {TextBox} from "@sebgroup/react-components/dist/TextBox"

interface Props{
}

interface User{
  email: string,
  name: string,
  password: string,
  confirmPassword:string,
  samePassword:boolean,
  signUpSuccess:boolean,
  signUpError:boolean

}


export default class SignUp extends Component<Props,User>{
  constructor(props:Props){
    super(props)
    this.state={
      email:"",
      name:"",
      password:"",
      confirmPassword:"",
      samePassword:false,
      signUpSuccess:false,
      signUpError:false,
    }
  }
  
  
  handleChange= (e: React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target
    this.setState({
      ...this.state,[name]:value
    })
    if (this.state.password=== value){
      this.setState({
        samePassword:true
      })
    }
    else{
      this.setState({
        samePassword:false
      })
    }
    }

  validateSignUp= () => {
    if (this.validateEmail(this.state.email) && this.state.name && this.state.samePassword){
      this.setState({
        signUpSuccess:true
      })
      const person={
        email:this.state.email,
        name:this.state.name,
        password:this.state.password,
        loggedIn: false
      }
      window.localStorage.setItem(this.state.email, JSON.stringify(person))
      return
    }
    this.setState({
      signUpError:true
    }) 
  }

  validateEmail= (email:string) => {
    // eslint-disable-next-line
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  render() {
    return (
      <div className="signupPage">
        <NavBar page={this.constructor.name}/>   
        <div className="center">
          <h2>Sign Up</h2>
          <div>
            <TextBox
                name="email"
                placeHolder="E-mail"
                value={this.state.email}
                onChange={this.handleChange}
                error={this.validateEmail(this.state.email)?"":"Invalid Email"}
            />
          </div>
          <div>
            <TextBox
                name="name"
                placeHolder="Name"
                value={this.state.name}
                onChange={this.handleChange}
                error={this.state.name?"":"Name cannot be empty"}
            />
          </div>
          <div>
            <TextBox
                name="password"
                placeHolder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                type='password'
                error={this.state.password?"":"Password cannot be empty"}
            />
          </div>
          <div>
            <TextBox
                name="confirmPassword"
                placeHolder="Re-enter Password"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                type='password'
                error={this.state.password!==this.state.confirmPassword?"Passwords do not match":""}
            />
          </div>
          <br/>
          <div>
            <Button label="Sign up" theme="primary" onClick={this.validateSignUp}/>
          </div>
          <br/>
          <div>Already have an account? <Link to='/'>Login </Link></div>
          <Notification
            toggle={this.state.signUpSuccess}
            title="Sign Up Sucessful!"
            message="Click on Login to proceed"
            theme="success"
            dismissable={true}
            dismissTimeout={3000}
            onDismiss={()=>{this.setState({signUpSuccess:false})}}
          />
          <Notification
            toggle={this.state.signUpError}
            title="Sign Up Error"
            message="Please input correct details and try again"
            theme="danger"
            dismissable={true}
            dismissTimeout={3000}
            onDismiss={()=>{this.setState({signUpError:false})}}
          />

        </div>
      </div>
    )
  }
}
