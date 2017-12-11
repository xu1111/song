
import {get} from './index';

let url='http://localhost:3000';

export const getSliders=()=>{
    return get(url+'/slider');
};

export const getHots=()=>{
    return get(url+'/hot');
};

export const getSongs=(hotId)=>{
    return get(url+'/hotsongs/'+hotId);

};