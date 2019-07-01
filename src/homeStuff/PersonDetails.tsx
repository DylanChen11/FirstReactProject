import React from 'react';
import {Individual} from './Card'
import NavBar from '../components/NavBar';
import {Loader} from '@sebgroup/react-components/dist/Loader'

interface PersonDetailsState {
    item:Individual,
    done: boolean
}


interface PersonDetailsProps{
    match: {
        params: {
            id: string
        }
    }
}



class PersonDetails extends React.Component<PersonDetailsProps,PersonDetailsState> {

    constructor(props: PersonDetailsProps){
        super(props)
        this.state = {
            item: {
            name: '', 
            image: '',
            status: '',
            species: '',
            gender: '', 
            location: {
                name: '' 
                }
            },
            done: false
        }

    }

    componentWillMount(){
        this.fetchItem();
    }


    fetchItem = async () => {
        const data = await fetch(`https://rickandmortyapi.com/api/character/${this.props.match.params.id}`);
        const item =  await data.json();
        this.setState({item:item, done:true})
        
      }

    


    render(){

        const {name, status, species, gender, location} = this.state.item

        return(
            <div>
                <div>   
                    <NavBar page={this.constructor.name}/> 
                    <Loader toggle={!this.state.done} fullscreen={false}></Loader>        
                    <img src={this.state.done? this.state.item.image : '' } 
                    alt={this.state.done? `${this.state.item.name}` : ''}/>    
                </div>

                <div>
                    <h4>
                    <ul>
                        <li>Name : {name}</li>
                        <li>Status : {status}</li>
                        <li>Species: {species}</li>
                        <li>Gender: {gender}</li>
                        <li>Location: {location.name}</li>                    
                    </ul>
                    </h4>
                    
                    
                </div>
            </div>
            
        )
    }
}

export default PersonDetails;