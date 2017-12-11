
import * as Types from '../actions-types';

import {getRanks} from '../../api/rank';


export const getRank=()=>(dispatch)=>{
    getRanks().then(rankInfo=>{
        dispatch({
            type:Types.GET_SONG_INFO,
            rankInfo
        });
    })
};


