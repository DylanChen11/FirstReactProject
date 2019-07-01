import React from 'react'

interface SearchBarProps{
    update: (user: string ) => void
}

interface SearchBarState{
    current: string 
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState>{

    constructor(props: SearchBarProps){
        super(props)
        this.state = {
            current: ''
        }
    }

    handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        this.props.update(this.state.current)
    }

    handleChange = (e :React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        this.setState({current: e.target.value})
    }


    render(){
        return(
            <form className='my-4'>
                <label>Enter name to search : </label>
                <input type='text' name='search' placeholder='Rick' onChange={this.handleChange}/>
                <button onClick={this.handleClick}>Search</button>        
            </form>
        )
    }
}

export default SearchBar;