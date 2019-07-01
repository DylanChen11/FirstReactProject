import React, { Component } from 'react'
import {Pagination} from "@sebgroup/react-components/dist/Pagination"



interface Props{
    changePage: (link: number) => void

}

interface Page{
    paginationValue:number
}


class PageNum extends Component<Props, Page> {
    constructor(props:Props){
        super(props)
        this.state={
            paginationValue:1
        }
    }


    handleChange(value: number){
        this.setState({paginationValue: value})
        this.props.changePage(value)
        
    }


    render() {
        return (
            <div>
                <Pagination
                    value={this.state.paginationValue}
                    onChange={(value: number) => this.handleChange(value)}
                    size={3}
                    offset={3}
                />
            </div>
        )
    }
}

export default PageNum;
