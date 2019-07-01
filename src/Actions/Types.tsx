export const SUBMIT = 'SUBMIT'
export const LOGIN_INFO = 'LOGIN_INFO'


interface userLoginInfo{
    type: typeof LOGIN_INFO,
    payload: {
        name : string,
        value: string
    }
}

interface currentUser{
    type: typeof SUBMIT,
    payload: string 
}

export type LogInActions = userLoginInfo | currentUser