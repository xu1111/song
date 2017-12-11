import home from './home';
import {combineReducers} from 'redux';
import playList from './playList';
import rank from './rank';
import play from './player';
import search from './search';


import {routerReducer} from 'react-router-redux';


export default combineReducers({
    home,
    play,
    playList,
    search,
    rank,
    router:routerReducer

})