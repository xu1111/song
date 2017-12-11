import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './index.less';
import {Link} from "react-router-dom";

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="header-title">
                    <img src="" alt=""/>
                    <h2 className="name-app">M u s i c</h2>
                    <Link className="iconfont icon-weibiaoti1" to={"/user"}></Link>
                </div>
                <nav className="header-nav">
                    <NavLink exact to={'/'} activeClassName="selected">
                        <span>推荐</span>
                    </NavLink>
                    <NavLink exact to={'/singer'} activeClassName="selected">
                        <span>歌手</span>
                    </NavLink>
                    <NavLink exact to={'/rank'} activeClassName="selected">
                        <span>排行</span>
                    </NavLink>
                    <NavLink exact to={'/search'} activeClassName="selected">
                        <span>搜索</span>
                    </NavLink>
                </nav>
            </div>
        )
    }
}
