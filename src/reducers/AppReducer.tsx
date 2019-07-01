import {SUBMIT, LogInActions} from '../Actions/Types'


export interface currentUser{
    userName: string,
    allowed: boolean
  }


const initialState: currentUser = {
      userName: "",
      allowed: false
}




export default function accountReducer (state = initialState, action: LogInActions){
    switch(action.type){

        case SUBMIT:
                return{
                    ...state,
                    userName: action.payload
                }
        
            
        default :
            return state
    }

}