import React from 'react';
import './App.css';
import SignUp from './components/SignUp';
import './index.css';
import LogIn from './components/LogIn';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'; 
import Home from './components/Home'
import { AppState } from './reducers/index'
import {connect} from 'react-redux';
import { currentUser} from './reducers/AppReducer'
import Help from './components/Help'
import {getUserStatus } from "./components/NavBar"
import PersonDetails from './homeStuff/PersonDetails'
 




const PrivateRoute = ({component : Component,auth, ...rest}: any) => (
  <Route {...rest} render={(props) => (
     auth? <Component {...props} />:
    <Redirect to='/'/> 
  )} />
)


interface LogInProps{
  currentState:currentUser,
}



class App extends React.Component<LogInProps> {
  

  render(){
    
    return (
        <BrowserRouter>
        <Switch>
          <div className="App">
            <Route exact path='/' component={LogIn} />
            <Route exact path='/SignUp' component={SignUp}/>
            <PrivateRoute exact path='/Home/page/:pageNum' component={Home} auth={getUserStatus()? true : false} />
            <PrivateRoute exact path='/Home/:id' component={PersonDetails} auth={getUserStatus()? true : false} />
            <Route exact path='/Help' component={Help}/>
          </div>
        </Switch>
      </BrowserRouter>
      
     
    );
  }
}

const mapStateToProps = (state: AppState)  => ({
  currentState: state.AppReducer,
})


export default connect(mapStateToProps)(App);