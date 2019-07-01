import React from 'react';
import NavBar from './NavBar'
import Card from '../homeStuff/Card'
import PageNum from './PageNum'
import SearchBar from './SearchBar'


interface HomeState{
    searchBar: string
    currentPage:number
    clicked: boolean
}

interface HomeProps{
    history: {
        push(url: string): void;
    };

}


class Home extends React.Component<HomeProps, HomeState>{
    constructor(props: HomeProps){
        super(props)
        this.state = {
            searchBar: '',
            currentPage: 1,
            clicked: false
           
        }
    }

    setBarStatus = (updated: string) => {
        this.setState({searchBar: updated, clicked: true})
    }

    urlChange = (link:number) => {
        this.props.history.push(`/Home/page/${link}`);
        this.setState({currentPage: link})
    }



    render(){
        return(
            <div className="homePage">
                <NavBar page={this.constructor.name}/>
                <h1>This is the home page</h1>
                <SearchBar update={(a: string) => this.setBarStatus(a)}/>
                 <Card userParam={this.state.searchBar} pageNum={this.state.currentPage}
                        clicked={this.state.clicked} changeClicked={()=> this.setState({clicked: false})}/>
               
                <PageNum changePage={(x: number) => this.urlChange(x)}/>
            </div>

        )
            
    }
}


  export default Home;