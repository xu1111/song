import {get}from "./index";
let url='http://localhost:3000';
export const getAlllists=()=>{
    return get(url+'/search');
};