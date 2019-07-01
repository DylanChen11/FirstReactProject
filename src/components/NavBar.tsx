import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

interface Props{
    page:string,
}

interface Details {
    email: string,
    name: string,
    password: string, 
    loggedIn: boolean
}



  interface LogProps{
      removeUser: () => void
  }


  export const  getUserStatus = () => {
    const x = JSON.parse(window.localStorage.getItem(`signedIn`)||'{}');
    const user = JSON.parse(window.localStorage.getItem(x.name)||'{}');
    return(user.loggedIn)
  }


  class LogOff extends React.Component<LogProps>{
   
    handleClick = () => {
        this.props.removeUser()
    }

      render(){
          return(
              <Nav.Link href='/'>
                  <button onClick={this.handleClick}>LogOff</button>
              </Nav.Link>
          )
      }
  }
  


export default class NavBar extends Component<Props> {


    update = ()=>{
        const current =JSON.parse(window.localStorage.getItem('signedIn')|| '{}');
        const user: Details = JSON.parse(window.localStorage.getItem(current.name)|| '{}');
        user.loggedIn = false;
        window.localStorage.setItem(current.name, JSON.stringify(user))
    }

    navLinks = () => {
        if (this.props.page === "Home"){
            return (<Nav className="mr-auto"><Nav.Link href="/Home/page/1">Home </Nav.Link>    
            <Nav.Link href="/Help">Help </Nav.Link></Nav>)
        }
        else if (this.props.page === "SignUp"){
            return (<Nav className="mr-auto"><Nav.Link herf="/Home/page/1">Home</Nav.Link>
            <Nav.Link href="/">Login</Nav.Link>
            <Nav.Link href="/Help">Help</Nav.Link></Nav>)
        }

        else if (this.props.page === "Help"){
            return (<Nav className="mr-auto"><Nav.Link href="/Home/page/1">Home </Nav.Link>
            <Nav.Link href="/">Login </Nav.Link>
            <Nav.Link href="/SignUp">Sign Up </Nav.Link></Nav>)
        }

        else if (this.props.page === "LogIn"){
            return (<Nav className="mr-auto"><Nav.Link href="/Home/page/1">Home </Nav.Link>
            <Nav.Link href="/SignUp">Sign Up </Nav.Link>
            <Nav.Link href="/Help">Help </Nav.Link></Nav>)
        }
    }


    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand >Shop Demo</Navbar.Brand>

                    {this.navLinks()}

                    {getUserStatus()? <LogOff removeUser={this.update}/> : null }

                </Navbar>  
            </div>
        )
    }
}
