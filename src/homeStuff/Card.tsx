import React from 'react';
import { Link } from 'react-router-dom';


interface cardState{
    character: Individual[],
    done: boolean
    error: boolean
}

interface cardProps{
    userParam: string
    pageNum: number
    clicked: boolean
    changeClicked: () => void
}

export interface Individual {
    name: string, 
    image: string,
    id?: number
    status: string,
    species: string,
    gender: string, 
    location: {
        name: string 
    }
}

interface Props{
    warn:boolean
}

function WarningBanner(props:Props) {
    if (props.warn) {
      return <div>warning!</div>;
    }
    return null
}
class Card extends React.Component<cardProps, cardState>{

    constructor(props: cardProps){
        super(props)
        this.state = {
            character: [],
            done: false,
            error: false
        }
    }

    componentDidMount(){
        this.fetchItems()  
    }

    componentWillUpdate(){ 
        

        
    }


    useCase = () => {
        if(this.props.userParam === ''){
            return('https://rickandmortyapi.com/api/character/?page=1')
        }
        return(`https://rickandmortyapi.com/api/character/?name=${this.props.userParam}`)
    }


    fetchItems = async () => {
        const chosen: string = this.useCase() 
        await fetch(chosen)
        .then(res => {
            if(res.status !== 200){
                alert("not found")
                this.setState({error: true})
                return
            }
             res.json().then(data => {
                 this.setState({
                     character: data.results,
                     done: true
                 })
             })
        })
    }


    getEnd = (a: number) => {
        let endPoint = a;
        let times = 0;
        while(times < 4) {
            if(this.state.character[endPoint]){
                endPoint += 1
            }
            times += 1
        }
        return endPoint
    }


    getContent = (start: number) => {
        const stop = this.getEnd(start);

        if(stop <= this.state.character.length){

            const content = this.state.character.slice(start, stop)

            const result = content.map((person: Individual, id: number) => {
                return(
                    <div key={id} className='col-md-4 col-lg-3 my-3'>
                        <div className='card'>
                            <img src={person.image} className='card-img-top'
                            alt={`${person.name}`}/>

                            <div className='card-body'>
                                <h3>{person.name.length > 15? person.name.slice(0,15) + "..." : person.name}</h3>
                            </div>

                            <div className='card-footer'>
                                <Link to={`/Home/${person.id}`}><button className="btn btn-primary">Details</button></Link>
                            </div>
                        </div>
                    </div>

                )

            })
            return(result);
        }
        return null
        
    }

    render(){

        if(this.props.clicked){
            console.log("fetch happens")
            this.fetchItems()
            this.props.changeClicked()
        }
        if (this.state.error){
            return <h1>Character not found</h1>
        }
        const start: number = (this.props.pageNum * 8) - 8

        return(
            <div>
                <WarningBanner warn={this.state.error}/>
                <div className='container-fluid d-flex justify-content-center'>
                    <div className='row'>
                        {this.state.done && !this.state.error? this.getContent(start) : 'loading'}
                    </div>
                </div>

                <div className='container-fluid d-flex justify-content-center'>
                    <div className='row'>
                        {this.state.done && !this.state.error? this.getContent(start+ 4) : 'Loading...'}
                    </div>
                </div>

            </div>
            
            
        )
    }
}

export default Card 