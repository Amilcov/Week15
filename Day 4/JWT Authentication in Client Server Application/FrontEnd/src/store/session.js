import { useParams } from "react-router-dom";
import { csrfFetch } from "./csrf";

const LOGIN = 'session/LOGIN';
const LOGOUT = 'session/LOGOUT';

const loginAction = (user) => {
    return{
        type: LOGIN, 
        user
    }
};

const logoutAction = { type: LOGOUT };

export const loginActionThunk = (user) => async (dispatch) => {
   const { credential, password } = user;

   const response = await fetch('/api/session', {
        method: 'POST',
     
        headers: {
            "Content-Type" : "application/json",
            //"XSRF-Token":  `fE1vyAt4-cBfq_HpDbyemykCLZMuD-en1UnA`
             "XSRF-TOKEN":  csrfFetch('/api/session')
        },
       
        
        body: JSON.stringify({credential, password})
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(loginAction(data.user));
        return response;
    } else {
       alert('Error on login ', response);
    };  


};

const initialstate = {user: null};

const sessionReducer = (state = initialstate, action)  =>{
   let newState;

  switch(action.type) {

    case LOGIN:
        newState = Object.assign({}, state);
        newState.user = action.user;
        return newState;

    case LOGOUT:   
        newState = Object.assign({}, state);
        newState.user = null;
       return newState;

    default:
        return state;   
  }

 
}
export default sessionReducer;

