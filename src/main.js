import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Home from "./containers/Home/index";

import $ from "jQuery";
import jPlayer from 'jplayer';
import './common/index.less';
import Rank from "./containers/Rank/index";
import Search from "./containers/Search/index";
import Singer from "./containers/Singer/index";
import App from "./containers/App";

import store from './redux/store';
window._store=store;
import {Provider} from 'react-redux';
import HomeDetail from "./containers/Home/Detail/index";
import User from "./containers/User/index";
import RankContent from './containers/Rank/Detail/index';
import AddToList from './containers/AddToList';



ReactDOM.render(<Provider store={store}>
    <Router>
        <App>
        <Switch>
            <Route exact path={'/'} component={Home}/>
            <Route path={'/home/detail/:id'} component={HomeDetail}/>
            <Route path={'/rank'} component={Rank}/>
            <Route path={'/rankdetail/:id'} component={RankContent}/>
            <Route path={'/search'} component={Search}/>
            <Route path={'/singer'} component={Singer}/>
            <Route path={'/user'} component={User}/>
            <Route path="/history" component={AddToList}/>

        </Switch>
    </App>
    </Router>
</Provider>, document.querySelector('#app'));
