import * as Types from '../actions-types';

let initState={
    isChange:false,
    duration:"",
    currentTime:"",
    progress:0,
    total:0,
    element:null,
    isPlay:true,
    getPlayList:false
};

export default function(state=initState,action){
    switch(action.type){
        case Types.PLAY_CHANGE:
            return {...state,isChange:!state.isChange};
        case Types.GET_DURATION:
            return{...state,duration:action.duration};
        case Types.GET_PROGRESS:
            return{...state,progress:action.progress};
        case Types.GET_CURRENT:
            return{...state,currentTime:action.currentTime};
        case Types.CHANGE_PROGRESS:
            return{...state,element:action.element};
        case Types.GET_TOTAL:
            return{
                ...state,total:action.total
            };
        case Types.CHANGE_PLAY:
            return{
                ...state,isPlay:!state.isPlay
            };
        case Types.GET_PLAYLIST:
            return{
                ...state,getPlayList:!state.getPlayList
            }
    }
    return state;
}