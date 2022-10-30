const ADD = 'cart/ADD';
const EXTRACT = 'cart/EXTRACT';
const REMOVE = 'cart/REMOVE';
const PURCHASE = 'cart/PURCHASE';

export const addCart = (id) => { 
    return {
        type: ADD,
        id
    }
};

export const extractCart = (id) => {
   return {
      type: EXTRACT,
      id
   }
}

export const removeCart = (id) => {
   return {
      type: REMOVE,
      id
   }
}

export const purchaseCart = () => {
   console.log('Cart action: PURCHASE');
   return {
      type: PURCHASE
   }
}


export default function cartReducer(state = {}, action) {
console.log('I am cart reducer');
const stateNew = {...state};


 switch (action.type) {

   case ADD:
       if (stateNew[action.id]) {
          stateNew[action.id].count++;
       } else {
          stateNew[action.id] = {
            id: action.id,
            count: 1
           };
       }
       return stateNew;

    case EXTRACT:
      stateNew[action.id].count--;
      return stateNew;

    case REMOVE:
      delete stateNew[action.id];
      return stateNew;  

    case PURCHASE: 
      return {};

    default:
       return state;  
  };


};



