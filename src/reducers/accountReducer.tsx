import {LOGIN_INFO, LogInActions} from '../Actions/Types'


export interface UserCredentials{
    userName: string,
    password: string,
  }


const initialState: UserCredentials = {
      userName: "",
      password:"",
}




export default function accountReducer (state = initialState, action: LogInActions){
    switch(action.type){

        case LOGIN_INFO:
                return{
                    ...state,
                    [action.payload.name]: action.payload.value
                }
        
            
        default :
            return state
    }

}