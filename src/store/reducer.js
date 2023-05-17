import {
    CREATE_CONTACT,
    GET_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
  
  } from '../store/constant'

  const intialState = {
    userlist: [],
    contact: null,
  }
  export const reducer = (state = intialState, action) => {
    switch (action.type) {
      case  CREATE_CONTACT:
        return {
            ...state,
            userlist: [ action.payload, ...state.userlist],
          };
          case  GET_CONTACT:
            const updateData = state.userlist.map((item)=>{return (item.id === action.payload.id ? action.payload : item)})
            return{
                ...state,
                userlist:updateData
            }
            case 'DELETE_CONTACT':
              const list = state.userlist.filter(item => item.id !== action.payload)

              return {
                  ...state,
                  userlist:list
              }
        default:
            return state;
        
  
    }
    
  }