
import {get} from './index';

let url='http://localhost:3000';

export const getRanks=()=>{
    return get(url+'/rank');
};

