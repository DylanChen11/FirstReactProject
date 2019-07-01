import React, { Component } from 'react'
import {Accordion} from '@sebgroup/react-components/dist/Accordion'
import NavBar from './NavBar'


class Help extends Component {

    render() {
        return (
            <div className="helpPage">
                <NavBar page={this.constructor.name}/>
                <h1>Help Center</h1>    
                <Accordion list={[{category: "FAQ",  text: {title:"Is account registration required?" ,desc:"Yes, you are required to register an account by signing up to be able to view the contents of this shop"} }]}/>
            
            
            </div>
        )
    }
}

  export default Help;
