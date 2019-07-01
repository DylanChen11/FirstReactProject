import {LOGIN_INFO, SUBMIT} from '../Actions/Types';

export const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {name, value} = e.target;

    return{
        type: LOGIN_INFO,
        payload: {name, value}
    } 
    
}


export const setCurrentUser = (user: string) => {
    return{
        type: SUBMIT,
        payload: user
    }
}
