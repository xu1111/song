
import * as Types from '../actions-types';

import {getSliders,getHots,getSongs} from '../../api/home';

import {getAlllists}from'../../api/search';





//轮播图
export const getSlider=()=>(dispatch)=>{
    getSliders().then(sliders=>{
        dispatch({
            type:Types.GET_SLIDERS,
            sliders
        });
    })
};

//热播歌曲
export const getHot=()=>(dispatch)=>{
    getHots().then(hots=>{
        dispatch({
            type:Types.GET_HOTS,
            hots
        })
    })
};

//detail
export const getSong=(hotId)=>(dispatch)=>{
    getSongs(hotId).then(hotsongs=>{
        dispatch({
            type:Types.GET_HOTSONGS,
            hotsongs
        });
    })
};


//父组件传递子组件ID
export const sendId=(hotId)=>{
    return {
        type:Types.SEND_HOTID,
        hotId
    }

};

//清空hotsongs
export const clearHotSong=()=>(dispatch)=>{
    dispatch({
        type:Types.CLEAR_HOTSONGS,
    });
};

//播放
export const playChange=()=> {
    return {type:Types.PLAY_CHANGE}
};
export const getDuration=(duration)=>{
    return{type:Types.GET_DURATION,duration}
};
export const getProgress=(progress)=>{
    return{type:Types.GET_PROGRESS,progress}
};
export const getCurrentTime=(currentTime)=>{
    return{type:Types.GET_CURRENT,currentTime}
};
export const getElement=(element)=>{
    return{type:Types.CHANGE_PROGRESS,element}
};
export const getTotal=(total)=>{
    return{type:Types.GET_TOTAL,total}
};
export  const changePlay=()=>({type:Types.CHANGE_PLAY});

//搜索
export  const getAllList=()=>(dispatch)=>{
    getAlllists().then(getList=>{
        dispatch({
            type:Types.GET_ALLLIST,
            getList
        })
    })
};
//获取播放列表
export  const getList=()=>({
    type:Types.GET_PLAYLIST
});










