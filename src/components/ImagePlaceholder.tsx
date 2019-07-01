import React from 'react'
import {Loader} from '@sebgroup/react-components/dist/Loader'


interface Props{
    character:{
        name:string,
        status:string,
        image:string,
        species:string
    }
    loading:boolean
}


//In progess: move modal up to home
export default function ImagePlaceholder(props:Props) {
    return (
        <div >
             <Loader toggle={props.loading} fullscreen={false}></Loader>
             <div className="test">
                <img id={props.character.name} src={props.character.image} alt={props.character.name} height="100%" width="100%"/>
            </div>
            <div id="myModal" className="modal">
                <span className="close">×</span>
                <img className="modal-content" alt="" id={props.character.name}/>
                <div id="caption"></div>
            </div>
        </div>
    )
}
