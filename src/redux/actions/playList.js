import * as Types from '../actions-types';


//发送播放列表
export const singerList=(singerList)=>({
    type:Types.POST_SINGERLIST,
    singerList
});
export const firstList = (singerList) => ({
    type:Types.ENTER_SINGS_LIST,
    singerList
})

//播放一首
export const singOne=(singOne)=>({
    type:Types.POST_SING,
        singOne
});
//改变播放顺序
export const changePlayorder=(n)=>({
    type:Types.CHANGE_PLAYORDER,
    n
});

//改变上一首下一首状态

export const nextSong=(n)=>({
    type:Types.NEXT_SONG,
    n
});




//播放当前歌曲
export const playOne = (song) => ({
    type:Types.PLAY_ONE,
    song
});




//------------ write by zsy  ------------
//删除一首歌
export const deleteOne = (singId) => ({
    type:Types.DELETE_ONE,
    singId
});

//删除所有歌曲
export const deleteAll = () => ({
    type:Types.DELETE_ALL
});
//添加一首歌到列表
export const addOne = (song) => ({
    type:Types.ADD_ONE,
    song
});