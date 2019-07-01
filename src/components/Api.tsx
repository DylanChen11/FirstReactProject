import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ImagePlaceholder from './ImagePlaceholder'

interface Props{
}

interface T{
    name:string,
    status:string,
    image:string,
    species:string
}
interface Data{
    loading:boolean,
    character:Array<T>,
    error:boolean
}




export default class Api extends Component<Props, Data> {
    constructor(props:Props){
        super(props)
        this.state={
            loading: true,
            character:[],
            error:false
        }
    }

    componentDidMount(){
        this.setState({
            loading:true
        } , () => {
            fetch("https://rickandmortyapi.com/api/character/?page=1")
            .then(response => {
                if (response.status !==200){
                    this.setState({
                        error:true
                    })
                    return
                }
                response.json().then(data =>{
                    this.setState({
                        loading:false,
                        character:data.results,
                        error:false
                    })
                })
            })
        })
        
    }

    render() {
        // const text = this.state.loading? "" : this.state.character[0].name
        // const image= this.state.loading? "":this.state.character[0].image
        // const status=this.state.loading? "":this.state.character[0].status
        // const species=this.state.loading? "":this.state.character[0].species
        const char1=this.state.loading?{name:"", status:"", image:"", species:""}:this.state.character[0]
        const char2=this.state.loading?{name:"", status:"", image:"", species:""}:this.state.character[1]
        const char3=this.state.loading?{name:"", status:"", image:"", species:""}:this.state.character[2]
        return (
            <div>
            <Container>
                <Row>
                    <Col xs={6} md={4}>
                        <ImagePlaceholder character={char1} loading={this.state.loading}/>
                    </Col>
                    <Col xs={6} md={4}>
                        <ImagePlaceholder character={char2} loading={this.state.loading}/>
                    </Col>
                    <Col xs={6} md={4}>
                        <ImagePlaceholder character={char3} loading={this.state.loading}/>
                    </Col>
                </Row>
            </Container>
            </div>
        )
    }
}

/*<div className="container">
                <div className="row">
                <div className="col-lg-4" style={{maxWidth: "200px", maxHeight:"200px"}} > 
                    <MediaCard character={char1} loading={this.state.loading}/>
                </div>
                <div className="col-lg-4" style={{maxWidth: "200px"}} >
                    <MediaCard character={char2} loading={this.state.loading}/>
                </div>
                <div className="col-lg-4" style={{maxWidth: "200px"}} >
                    <MediaCard character={char3} loading={this.state.loading}/>
                </div>
               
               </div>
            </div>*/

/*<p>{text}</p>
<Image
src={this.state.loading? "loading image" :this.state.character[0].image}
width="300px"
height="300px"
/>*/