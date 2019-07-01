import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom'
import {handleChange, setCurrentUser} from '../Actions/LogInActions'
import {bindActionCreators} from 'redux'
import { AppState } from '../reducers/index'
import NavBar from './NavBar'
import { UserCredentials } from '../reducers/accountReducer';
import {Button} from '@sebgroup/react-components/dist/Button'

interface LogInProps{
  credentials:UserCredentials,
  handleChange : (e: React.ChangeEvent<HTMLInputElement>) => void,
  setCurrentUser: (user: string) => void
}


interface LogInState{
  userName: string,
  password: string,
  missing : {
    userName: boolean,
    password: boolean
  },
  submitted: boolean
}


const LogInButton = withRouter(({ history, valid, submit} : any ) => (
  <Button label="Log In" theme="primary" onClick={() => {
    submit();
    if(valid()){
      history.push('/Home/page/1')
    }
      }}/>
))




class LogIn extends React.Component<LogInProps, LogInState>{

  constructor(props: LogInProps){
    super(props)
    this.state = {
      userName: "",
      password: "",
      missing: {
        userName: true,
        password: true
      },
      submitted: false

    }
  }


  setUserStatus = () => {
  
    const user = JSON.parse(window.localStorage.getItem(`${this.state.userName}`)||'{}'); 
    if(user.email){
      user.loggedIn = true;
      window.localStorage.setItem(`${user.email}` ,JSON.stringify(user));
    }
    
 }

 validateUser = () => {
  const user = JSON.parse(window.localStorage.getItem(`${this.state.userName}`)||'{}');
  if(this.state.password === user.password){
    return true
  }
  return false
}

  handleSubmit = () => {

    const newState: LogInState = this.state;


    const passwordcheck = () => ((this.state.password && this.state.password !== "") ?  newState.missing.password = false :
                                                                                        newState.missing.password = true)

    const usernameCheck = () => ((this.state.userName && this.state.userName!== "") ? newState.missing.userName = false : 
                                                                                      newState.missing.userName = true)

    passwordcheck()
    usernameCheck()
    newState.submitted = true;
    this.setState(newState)

    if(this.validateUser()){
      this.setUserStatus();
      this.props.setCurrentUser(this.props.credentials.userName);
      const lastSignedIn = {name: this.props.credentials.userName}
      window.localStorage.setItem('signedIn', JSON.stringify(lastSignedIn))

    }
  }






  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.props.handleChange(e);
    const {name, value} = e.target;
    if(name === 'userName'){
      this.setState({userName: value})
    }
    else if(name === 'password'){
      this.setState({password: value})
    }

  }



  render(){
    return(
      <div className="loginPage">
        <NavBar page={this.constructor.name}/>
            <h1> Welcome </h1>

        <form>

        <div>
          <label>Username: </label>
          <input onChange={this.handleChange}
          type='text'
          placeholder='Username'
          name='userName'/>
        </div>

        {this.state.missing.userName && this.state.submitted? <div>Missing username</div> : null}


        <div>
          <label>Password: </label>
          <input onChange={this.handleChange}
          type='password'
          placeholder='password'
          name='password'/>
        </div>

        {this.state.missing.password && this.state.submitted? <div>Missing password</div> : null}


        <div>
          <LogInButton valid={this.validateUser} submit={this.handleSubmit}/>          
        </div>

        <div>Don't have an account? <Link to='/SignUp'>Sign Up</Link></div>


        </form>

        


      </div>
    )
  }
}

const mapStateToProps = (state: AppState)  => ({
  credentials: state.accountReducer,
})

const mapActionToProps = (dispatch: any) => {
  return bindActionCreators({
    handleChange,
    setCurrentUser,
  }, dispatch)
}


export default connect(mapStateToProps ,mapActionToProps)(LogIn);