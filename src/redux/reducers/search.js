
import * as Types from '../actions-types';

let initState={
    getList:[]
};

export default function(state=initState,action){
    switch(action.type){
        case Types.GET_ALLLIST:
          /*  console.log(action.getList);*/
            return {...state,getList:action.getList}
    }
    return state;
}