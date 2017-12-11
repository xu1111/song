
import * as Types from '../actions-types';

let initState={
    sliders:[],
    hots:[],
    hotsongs:[],
    hotId:null,
};

export default function(state=initState,action){
    switch(action.type){
        case Types.GET_SLIDERS:
            return {...state,sliders:action.sliders};
        case Types.GET_HOTS:
            return {...state,hots:action.hots};
        case Types.SEND_HOTID:
            return {...state,hotId:action.hotId};
        case Types.GET_HOTSONGS:
            return {...state,hotsongs:action.hotsongs};
        case Types.CLEAR_HOTSONGS:
            return {...state,hotsongs:[]};
    }
    return state;
}