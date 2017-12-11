
import * as Types from '../actions-types';

let initState={
    rankInfo:[],

};

export default function(state=initState,action){
    switch(action.type){
        case Types.GET_SONG_INFO:
            return {...state,rankInfo:action.rankInfo};
    }
    return state;
}