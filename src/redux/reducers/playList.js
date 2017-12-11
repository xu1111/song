import * as Types from '../actions-types';


let initState={
    singerList:[],
    singOne:null,
    type:3,//3循环播放  //2随机播放  //1单曲循环
    nextSong:100
};

export default function(state=initState,action){
    switch(action.type){
        case Types.POST_SINGERLIST:
            return {...state,singerList:action.singerList,singOne:action.singerList[0]};
        case Types.POST_SING:   //搜索添加一首歌曲
            if(state.singerList) {
                state.singerList = state.singerList.filter(item => item.id != action.singOne.id);
            }
            state.singerList.push(action.singOne);
            return {...state,singerList:state.singerList,singOne:action.singOne};
        //改变播放顺序
        case Types.CHANGE_PLAYORDER:
            return{...state,type:action.n};
        //改变上一首下一首状态
        case Types.NEXT_SONG:
            return{...state,nextSong:state.nextSong+action.n};
        case Types.PLAY_ONE:    //点击让当前这首播放
            return {...state,singOne:action.song};
        case Types.ADD_ONE:    //从播放列表中添加一首
            if(state.singerList){
                state.singerList = state.singerList.filter(item => item.id != action.song.id);
            }
            state.singerList.push(action.song);
            return {...state,singerList:state.singerList};
        case Types.DELETE_ONE:    //删除一首歌
            state.singerList = state.singerList.filter(item => item.id != action.singId);
            return {...state,singerList:state.singerList};
        case Types.DELETE_ALL:   //删除所有
            return {...state,singerList:[],singOne:null};
        case Types.ENTER_SINGS_LIST:
            return {...state,singerList:action.singerList}

    }
    return state;
}

